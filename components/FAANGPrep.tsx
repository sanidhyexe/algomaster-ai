
import React, { useState, useRef, useEffect } from 'react';
import { FAANG_QUESTIONS } from '../constants';
import { Chat } from '@google/genai';
import { ChatMessage } from '../types';
import { createChatSession, sendMessageToGemini } from '../services/geminiService';

const CAREER_COACH_INSTRUCTION = `
You are a Senior Tech Career Coach and FAANG Interview Specialist. 
Your expertise includes:
1. Current hiring trends in Big Tech (Google, Meta, Amazon, Netflix, Apple, etc.).
2. Explaining job roles (SDE, SDET, TPM, Engineering Manager, etc.) and their requirements.
3. Emerging technologies (AI/ML, Cloud Native, Rust, etc.) and what to learn.
4. Interview strategies (Behavioral, System Design, Coding).

IMPORTANT FORMATTING RULE:
- ALWAYS structure your answers using bullet points or numbered lists. 
- Do not provide large blocks of text.
- Break down complex advice into digestible points.

Keep answers professional, actionable, and encouraging. 
If asked about specific code implementation, refer them to the 'Problem Solving' section, but you can explain high-level algorithms.
`;

const FAANGPrep: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatOpen && !chatRef.current) {
      try {
        chatRef.current = createChatSession(CAREER_COACH_INSTRUCTION);
        setMessages([
          {
            id: 'init',
            role: 'model',
            text: "Hello! I'm your AI Career Coach. Ask me about interview trends, new tech stacks, or clarify different engineering job roles!",
            timestamp: new Date()
          }
        ]);
      } catch (e) {
        console.error("Failed to init chat", e);
      }
    }
  }, [isChatOpen]);

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

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
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Sorry, I'm having trouble connecting right now.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 animate-fade-in max-w-6xl mx-auto relative min-h-screen">
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-8 mb-8 text-center shadow-lg border border-indigo-700/50">
        <h1 className="text-3xl font-bold text-white mb-2">FAANG Interview Prep</h1>
        <p className="text-indigo-200">The most frequently asked questions at top tech companies in the last 6 months.</p>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg">
        <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-900 text-slate-200 uppercase font-bold text-xs">
                <tr>
                    <th className="p-4">Company</th>
                    <th className="p-4">Problem Name</th>
                    <th className="p-4">Difficulty</th>
                    <th className="p-4">Frequency</th>
                    <th className="p-4 text-right">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
                {FAANG_QUESTIONS.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-700/50 transition-colors">
                        <td className="p-4 font-medium text-white">{item.company}</td>
                        <td className="p-4 text-indigo-300 hover:underline cursor-pointer">{item.question}</td>
                        <td className="p-4">
                             <span className={`px-2 py-1 rounded text-xs font-semibold
                                ${item.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400' : 
                                  item.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' : 
                                  'bg-red-500/10 text-red-400'}`}>
                                {item.difficulty}
                            </span>
                        </td>
                        <td className="p-4">
                             <div className="flex items-center gap-1">
                                <div className="h-2 w-16 bg-slate-700 rounded-full overflow-hidden">
                                    <div className={`h-full ${
                                        item.freq === 'Very High' ? 'w-full bg-red-500' : 
                                        item.freq === 'High' ? 'w-3/4 bg-orange-500' : 'w-1/2 bg-yellow-500'
                                    }`} />
                                </div>
                                <span className="text-xs">{item.freq}</span>
                             </div>
                        </td>
                        <td className="p-4 text-right">
                            <button className="text-indigo-400 hover:text-white font-medium">Solve</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 grid md:grid-cols-2 gap-8 mb-20">
          <div>
              <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                      <h4 className="font-bold text-slate-200 mb-2">Do I need to memorize solutions?</h4>
                      <p className="text-sm text-slate-400">No. Focus on recognizing patterns (Two Pointers, Sliding Window) rather than memorizing code.</p>
                  </div>
                   <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                      <h4 className="font-bold text-slate-200 mb-2">Which language should I use?</h4>
                      <p className="text-sm text-slate-400">Python is highly recommended for its conciseness, but Java/C++ are standard. JavaScript is great for frontend roles.</p>
                  </div>
              </div>
          </div>
           <div>
              <h2 className="text-xl font-bold text-white mb-4">Success Tips</h2>
               <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 h-full">
                  <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm">
                      <li>Always clarify constraints before coding.</li>
                      <li>Think out loud during the interview.</li>
                      <li>Test your code with edge cases.</li>
                      <li>Start with a brute force solution if stuck.</li>
                  </ul>
              </div>
          </div>
      </div>

      {/* AI Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isChatOpen && (
          <div className="bg-slate-800 border border-slate-700 w-80 md:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col mb-4 overflow-hidden animate-scale-in">
             <div className="bg-indigo-600 p-4 flex justify-between items-center shrink-0">
               <div className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                 </div>
                 <div>
                    <h3 className="font-bold text-white text-sm">AI Career Coach</h3>
                    <p className="text-xs text-indigo-200">Online • Gemini 2.5</p>
                 </div>
               </div>
               <button onClick={() => setIsChatOpen(false)} className="text-white/80 hover:text-white">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
             </div>
             
             <div className="flex-1 bg-slate-900 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                          msg.role === 'user' 
                          ? 'bg-indigo-600 text-white rounded-tr-none' 
                          : 'bg-slate-700 text-slate-200 border border-slate-600 rounded-tl-none whitespace-pre-wrap'
                      }`}>
                          {msg.text}
                      </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                      <div className="bg-slate-700 rounded-2xl rounded-tl-none px-4 py-3 border border-slate-600">
                          <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                          </div>
                      </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
             </div>

             <div className="p-3 bg-slate-800 border-t border-slate-700">
                <div className="relative">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about trends, roles..." 
                    className="w-full bg-slate-900 border border-slate-600 text-white text-sm rounded-full py-2.5 pl-4 pr-10 focus:outline-none focus:border-indigo-500"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={isLoading || !input.trim()}
                    className="absolute right-1.5 top-1.5 p-1.5 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  </button>
                </div>
             </div>
          </div>
        )}

        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="group flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full py-3 px-6 shadow-lg shadow-indigo-500/30 transition-all hover:scale-105"
        >
          {!isChatOpen ? (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              <span className="font-medium">Ask AI Coach</span>
            </>
          ) : (
             <span className="font-medium">Close Chat</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default FAANGPrep;
