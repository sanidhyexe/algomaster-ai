
import React from 'react';
import { Topic, Difficulty } from '../types';

interface CurriculumProps {
  topics: Topic[];
  onSelectProblem: (problemId: string, topicId: string) => void;
}

const Curriculum: React.FC<CurriculumProps> = ({ topics, onSelectProblem }) => {
  return (
    <div className="p-6 md:p-8 animate-fade-in max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Curriculum</h1>
      <p className="text-slate-400 mb-8">Master Data Structures and Algorithms step by step.</p>

      <div className="space-y-8">
        {topics.map((topic) => {
          const isCompleted = topic.progress === 100;
          return (
            <div key={topic.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-xl hover:border-slate-600 transition-all">
              <div className="md:flex">
                {/* Video Thumbnail */}
                <div className="md:w-64 h-48 md:h-auto bg-black relative shrink-0 group cursor-pointer">
                  <img src={topic.videoLectureUrl} alt={topic.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-indigo-600 group-hover:scale-110 transition-all">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-mono">1:24:00</div>
                  {isCompleted && (
                     <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">
                        DONE
                     </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-bold text-white">{topic.title}</h2>
                      {isCompleted ? (
                          <div className="flex gap-2">
                             <span className="text-xs text-green-400 border border-green-500/30 bg-green-500/10 px-3 py-1 rounded-full flex items-center gap-1 font-medium">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                Completed
                             </span>
                             <button className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-full flex items-center gap-1 transition-colors font-medium shadow-lg shadow-indigo-500/20">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                Revise
                             </button>
                          </div>
                      ) : (
                          <span className="text-xs text-slate-400 border border-slate-600 px-2 py-1 rounded-full">{topic.progress}% Complete</span>
                      )}
                  </div>
                  <p className="text-slate-400 text-sm mb-6">{topic.description}</p>

                  {/* Problems List */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Practice Problems</h3>
                    {topic.problems.map((prob) => (
                      <div 
                        key={prob.id} 
                        onClick={() => onSelectProblem(prob.id, topic.id)}
                        className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 cursor-pointer group transition-colors"
                      >
                        <div className="flex items-center gap-3">
                           <div className={`w-2 h-2 rounded-full ${
                               prob.difficulty === 'Easy' ? 'bg-green-500' : 
                               prob.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                           }`} />
                           <span className="text-sm font-medium text-slate-200 group-hover:text-indigo-300 transition-colors">{prob.title}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-slate-500">Acc: {prob.acceptanceRate}%</span>
                          <svg className="w-5 h-5 text-slate-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Curriculum;
