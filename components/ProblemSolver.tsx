import React, { useState, useEffect, useRef } from 'react';
import { Problem, ChatMessage } from '../types';
import { createChatSession, sendMessageToGemini } from '../services/geminiService';
import Editor from '@monaco-editor/react';
import { Chat } from '@google/genai';

interface ProblemSolverProps {
  problem: Problem;
  onBack: () => void;
}

const ProblemSolver: React.FC<ProblemSolverProps> = ({ problem, onBack }) => {
  const [code, setCode] = useState(problem.starterCode);
  // language state and per-language code storage
  const languages = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'];
  const [language, setLanguage] = useState<string>('JavaScript');
  const [codeByLang, setCodeByLang] = useState<Record<string, string>>(() => ({}));
  const [output, setOutput] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const pyodideRef = useRef<any | null>(null);
  const [pyodideLoading, setPyodideLoading] = useState(false);
  const [pyodideLoading2, setPyodideLoading2] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // build simple comment-only templates per language
    const templates: Record<string, string> = {
      JavaScript: `// ${problem.title}\n// ${problem.description.split('\n')[0] ?? ''}\n// Write your JavaScript solution below\n`,
      TypeScript: `// ${problem.title}\n// ${problem.description.split('\n')[0] ?? ''}\n// Write your TypeScript solution below\n`,
      Python: `# ${problem.title}\n# ${problem.description.split('\n')[0] ?? ''}\n# Write your Python solution below\n`,
      Java: `// ${problem.title}\n// ${problem.description.split('\n')[0] ?? ''}\n// Write your Java solution below\n`,
      'C++': `// ${problem.title}\n// ${problem.description.split('\n')[0] ?? ''}\n// Write your C++ solution below\n`,
    };

    // load per-problem saved code from localStorage
    try {
      const key = `codeByLang:${problem.id}`;
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, string>;
        setCodeByLang(parsed);
        const initial = parsed[language] ?? parsed['JavaScript'] ?? templates[language] ?? templates['JavaScript'];
        setCode(initial);
      } else {
        // initialize with comment-only templates
        setCodeByLang(templates);
        setCode(templates[language] ?? templates['JavaScript']);
      }
    } catch (e) {
      // ignore localStorage errors
      setCode(templates[language] ?? templates['JavaScript']);
    }
    // Initialize Gemini Chat Session on mount
    try {
      chatRef.current = createChatSession();
      // Add initial system context about the current problem
      const initContext = `The user is solving the problem: "${problem.title}". Description: "${problem.description}". Code template: "${problem.starterCode}".`;
      chatRef.current.sendMessage({ message: initContext }).catch(e => console.error(e));
      
      setMessages([{
        id: 'init',
        role: 'model',
        text: `Hi! I'm here to help you solve "${problem.title}". Feel free to ask for a hint or clarification!`,
        timestamp: new Date()
      }]);
    } catch (e) {
      console.error("Failed to init chat", e);
    }
  }, [problem]);

  // persist when codeByLang or problem changes
  useEffect(() => {
    try {
      const key = `codeByLang:${problem.id}`;
      localStorage.setItem(key, JSON.stringify(codeByLang));
    } catch (e) {
      // ignore
    }
  }, [codeByLang, problem.id]);

  useEffect(() => {
    return () => {
      // cleanup iframe if any
      if (iframeRef.current) {
        document.body.removeChild(iframeRef.current);
        iframeRef.current = null;
      }
    };
  }, []);

  const runCode = () => {
    setOutput('');
    if (language === 'JavaScript') {
      // remove existing iframe
      if (iframeRef.current) {
        try { document.body.removeChild(iframeRef.current); } catch (e) {}
        iframeRef.current = null;
      }
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.sandbox.add('allow-scripts');
      const wrapped = `<!doctype html><html><head><meta charset="utf-8"></head><body><script>\n(function(){\n  const send=(t,m)=>parent.postMessage({type:t,msg:m},'*');\n  console.log=function(){ try{ send('log', Array.from(arguments).map(a=>{try{return typeof a==='object'?JSON.stringify(a):String(a)}catch(e){return String(a)}}).join(' ')) }catch(e){} };\n  console.error=function(){ try{ send('error', Array.from(arguments).map(a=>String(a)).join(' ')) }catch(e){} };\n  try{\n    ${code}\n  }catch(e){ console.error(e && e.stack ? e.stack : String(e)); }\n})();<\/script></body></html>`;
      iframe.srcdoc = wrapped;
      iframeRef.current = iframe;
      const handler = (ev: MessageEvent) => {
        const data = ev.data;
        if (!data || typeof data.type !== 'string') return;
        // accept log/error messages from iframe regardless of exact source
        if (data.type === 'log') {
          setOutput(prev => prev + data.msg + '\n');
        } else if (data.type === 'error') {
          setOutput(prev => prev + 'ERROR: ' + data.msg + '\n');
        }
      };
      window.addEventListener('message', handler);
      // cleanup listener when iframe removed
      const cleanup = () => {
        try { window.removeEventListener('message', handler); } catch (e) {}
        if (iframeRef.current) {
          try { document.body.removeChild(iframeRef.current); } catch (e) {}
          iframeRef.current = null;
        }
      };
      // append and set timeout to remove after some time
      document.body.appendChild(iframe);
      setTimeout(() => {
        cleanup();
      }, 10 * 1000);
    } else {
      if (language === 'Python') {
        (async () => {
          try {
            setPyodideLoading(true);
            if (!pyodideRef.current) {
              // load pyodide from CDN
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              await import('https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js');
              // @ts-ignore
              pyodideRef.current = await (window as any).loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/' });
            }
            const pyodide = pyodideRef.current;
            // build a wrapper that captures stdout/stderr and returns them
            const userCode = code;
            const wrapper = `\nimport sys, io, traceback\n\ndef __run_user_code():\n    out = io.StringIO()\n    err = io.StringIO()\n    oldout, olderr = sys.stdout, sys.stderr\n    sys.stdout, sys.stderr = out, err\n    try:\n${userCode.split('\n').map(l => '        ' + l).join('\n')}\n    except Exception:\n        traceback.print_exc()\n    finally:\n        sys.stdout, sys.stderr = oldout, olderr\n    return out.getvalue(), err.getvalue()\n\n__run_user_code()\n`;
            const res = await pyodide.runPythonAsync(wrapper);
            // res is a PyProxy to a tuple (out, err). Convert to JS.
            let out = '';
            let err = '';
            try {
              const js = res.toJs ? res.toJs() : res;
              if (Array.isArray(js) || Array.isArray(js)) {
                out = js[0] ?? '';
                err = js[1] ?? '';
              } else if (js && typeof js === 'object') {
                out = js[0] ?? '';
                err = js[1] ?? '';
              } else {
                out = String(js ?? '');
              }
            } catch (e) {
              out = String(res ?? '')
            }
            const combined = (out ? out + '\n' : '') + (err ? 'ERROR:\n' + err : '');
            setOutput(combined || '(no output)');
          } catch (e: any) {
            setOutput('Python runner error: ' + (e && e.message ? e.message : String(e)));
          } finally {
            setPyodideLoading(false);
          }
        })();
      } else {
        setOutput(`Run not supported in-browser for ${language}. Switch to JavaScript or Python, or run ${language} locally.`);
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || !chatRef.current) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(chatRef.current, input);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-slate-900 text-white overflow-hidden">
      {/* Left Panel: Problem & Code */}
      <div className="flex-1 flex flex-col border-r border-slate-700 min-w-0">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800">
          <button onClick={onBack} className="text-slate-400 hover:text-white flex items-center gap-2">
            ← Back to List
          </button>
          <div className="flex gap-3">
             <button 
              onClick={() => setShowSolution(!showSolution)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-sm font-medium transition-colors"
            >
              {showSolution ? 'Hide Solution' : 'Video Solution'}
            </button>
            <button onClick={runCode} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium transition-colors">
              Run Code
            </button>
          </div>
        </div>

        {showSolution && (
          <div className="p-4 bg-slate-900 border-b border-slate-700 animate-fade-in">
             <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer border border-slate-700">
                 {/* Placeholder for video player */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                 <img src="https://picsum.photos/800/450?grayscale" alt="Solution Thumbnail" className="w-full h-full object-cover opacity-60" />
                 <div className="z-20 flex flex-col items-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-indigo-600 transition-all duration-300">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <p className="mt-2 font-medium text-slate-200">Watch Walkthrough</p>
                 </div>
             </div>
          </div>
        )}

        <div className="flex-1 flex flex-col md:flex-row min-h-0">
            {/* Description */}
            <div className="w-full md:w-1/3 p-6 overflow-y-auto border-b md:border-b-0 md:border-r border-slate-700">
                <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>
                <div className="flex gap-2 mb-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold
                        ${problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' : 
                          problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 
                          'bg-red-500/20 text-red-400'}`}>
                        {problem.difficulty}
                    </span>
                    <span className="text-slate-500 text-xs flex items-center">
                        Acc: {problem.acceptanceRate}%
                    </span>
                </div>
                <div className="prose prose-invert prose-sm max-w-none">
                    <p>{problem.description}</p>
                    <h3 className="text-slate-200 mt-4 font-bold">Example 1:</h3>
                    <div className="bg-slate-950 p-3 rounded-md font-mono text-xs mt-1 border border-slate-800">
                        Input: nums = [2,7,11,15], target = 9<br/>
                        Output: [0,1]
                    </div>
                </div>
            </div>

            {/* Code Editor Placeholder */}
            <div className="w-full md:w-2/3 bg-[#1e1e1e] flex flex-col">
                <div className="bg-[#252526] text-slate-400 text-xs px-4 py-2 border-b border-black flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-300 text-sm font-medium">Language</span>
                      <select
                        value={language}
                        onChange={(e) => {
                          const newLang = e.target.value;
                          // persist current code for current language
                          setCodeByLang(prev => ({ ...prev, [language]: code }));
                          setLanguage(newLang);
                          // load saved code for new language or a comment-only template
                          setCode(prev => {
                            if (codeByLang[newLang]) return codeByLang[newLang];
                            const templates: Record<string, string> = {
                              JavaScript: `// ${problem.title}\n// ${problem.description.split('\n')[0] ?? ''}\n// Write your JavaScript solution below\n`,
                              TypeScript: `// ${problem.title}\n// ${problem.description.split('\n')[0] ?? ''}\n// Write your TypeScript solution below\n`,
                              Python: `# ${problem.title}\n# ${problem.description.split('\n')[0] ?? ''}\n# Write your Python solution below\n`,
                              Java: `// ${problem.title}\n// ${problem.description.split('\n')[0] ?? ''}\n// Write your Java solution below\n`,
                              'C++': `// ${problem.title}\n// ${problem.description.split('\n')[0] ?? ''}\n// Write your C++ solution below\n`,
                            };
                            const tmpl = templates[newLang] ?? '';
                            // also store new language default
                            setCodeByLang(p => ({ ...p, [newLang]: tmpl }));
                            return tmpl;
                          });
                        }}
                        className="bg-slate-800 text-slate-200 px-2 py-1 rounded-md text-sm border border-slate-700"
                      >
                        {languages.map((lang) => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    </div>
                    <div className="text-slate-400 text-xs">{language}</div>
                </div>
                <div className="flex-1 w-full" style={{ minHeight: 200 }}>
                  <Editor
                    loaderUrl="https://cdn.jsdelivr.net/npm/monaco-editor@0.39.0/min/vs/loader.js"
                    height="100%"
                    theme="vs-dark"
                    defaultLanguage="javascript"
                    language={(() => {
                      switch (language) {
                        case 'JavaScript': return 'javascript';
                        case 'TypeScript': return 'typescript';
                        case 'Python': return 'python';
                        case 'Java': return 'java';
                        case 'C++': return 'cpp';
                        default: return 'javascript';
                      }
                    })()}
                    value={code}
                    onChange={(value) => {
                      const v = value ?? '';
                      setCode(v);
                      setCodeByLang(prev => ({ ...prev, [language]: v }));
                    }}
                    options={{
                      automaticLayout: true,
                      minimap: { enabled: false },
                      fontSize: 13,
                      tabSize: 2,
                      insertSpaces: true,
                      automaticClosingBrackets: 'always',
                      autoIndent: 'advanced',
                      formatOnType: true,
                      formatOnPaste: true,
                    }}
                  />
                </div>
                <div className="border-t border-slate-800 p-3 bg-[#0f1720] text-slate-300 text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Output</span>
                    <button onClick={() => setOutput('')} className="text-xs text-slate-400 hover:text-white">Clear</button>
                  </div>
                  <pre className="whitespace-pre-wrap text-xs max-h-40 overflow-y-auto font-mono">{output || <span className="text-slate-500">(no output)</span>}</pre>
                </div>
            </div>
        </div>
      </div>

      {/* Right Panel: AI Assistant */}
      <div className="w-full md:w-96 bg-slate-800 border-l border-slate-700 flex flex-col">
        <div className="p-3 border-b border-slate-700 bg-slate-800 flex items-center justify-between">
            <h2 className="font-bold text-indigo-400 flex items-center gap-2">
                ✨ AI Assistant
            </h2>
             <span className="text-xs text-slate-500">Gemini 2.5 Flash</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-lg p-3 text-sm ${
                        msg.role === 'user' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-slate-700 text-slate-200 border border-slate-600'
                    }`}>
                        {msg.text}
                    </div>
                </div>
            ))}
            {isLoading && (
                 <div className="flex justify-start">
                    <div className="bg-slate-700 rounded-lg p-3 border border-slate-600">
                        <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        <div className="p-3 border-t border-slate-700 bg-slate-800">
            <div className="relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask for a hint..."
                    className="w-full bg-slate-900 border border-slate-600 rounded-md py-2 pl-3 pr-10 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
                <button 
                    onClick={handleSendMessage}
                    disabled={isLoading}
                    className="absolute right-2 top-1.5 text-indigo-400 hover:text-white disabled:opacity-50"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolver;
