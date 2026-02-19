
import React, { useState } from 'react';
import { ViewState, Problem, Topic } from './types';
import { TOPICS } from './constants';
import Curriculum from './components/Curriculum';
import ProblemSolver from './components/ProblemSolver';
import Profile from './components/Profile';
import Community from './components/Community';
import FAANGPrep from './components/FAANGPrep';
import About from './components/About';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [activeProblem, setActiveProblem] = useState<Problem | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSelectProblem = (problemId: string, topicId: string) => {
    const topic = TOPICS.find(t => t.id === topicId);
    const problem = topic?.problems.find(p => p.id === problemId);
    if (problem) {
      setActiveProblem(problem);
      setView('SOLVE');
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setView('DASHBOARD');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('HOME');
  };

  const NavItem = ({ label, targetView, icon }: { label: string, targetView: ViewState, icon: React.ReactNode }) => {
    // Allow access to the `HOME` view even when not authenticated
    const isLocked = !isAuthenticated && targetView !== 'HOME';
    
    return (
      <button
        onClick={() => {
          if (isLocked) return;
          setView(targetView);
          setActiveProblem(null);
        }}
        disabled={isLocked}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 font-medium group text-sm whitespace-nowrap ${
          view === targetView 
            ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' 
            : isLocked 
              ? 'text-slate-600 cursor-not-allowed bg-transparent' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
        }`}
      >
        <div className={`transition-all duration-300 ${!isLocked ? 'group-hover:text-red-500 group-hover:drop-shadow-[0_0_10px_rgba(220,38,38,0.9)]' : ''}`}>
          {icon}
        </div>
        <span className="hidden lg:inline">{label}</span>
        {isLocked && (
           <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        )}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-200 font-sans overflow-hidden">
      {/* Static Top Navigation Bar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-50">
        {/* Logo on Left */}
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          DSTECH
        </h1>
        
        {/* Navigation Links and User Profile on Right */}
        <div className="flex items-center gap-4">
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            <NavItem 
              targetView="HOME" 
              label="Home" 
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9.75L12 4l9 5.75V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.75z" /></svg>}
            />
            <NavItem
              targetView="DASHBOARD"
              label="Profile"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1118.879 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            />
            <NavItem 
              targetView="CURRICULUM" 
              label="Curriculum" 
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
            />
            <NavItem 
              targetView="FAANG" 
              label="FAANG Prep" 
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
            />
            <NavItem 
              targetView="COMMUNITY" 
              label="Community" 
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
            />
            <NavItem 
              targetView="ABOUT"
              label="About"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20 10 10 0 010-20z" /></svg>}
            />
          </nav>

          {/* User Profile in Navbar */}
          <div 
            onClick={() => setView('PROFILE')}
            className="hidden sm:flex items-center gap-3 bg-slate-800 px-3 py-2 rounded-lg border border-slate-700 cursor-pointer hover:bg-slate-700 transition-colors group"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white transition-all text-sm ${isAuthenticated ? 'bg-gradient-to-tr from-indigo-500 to-purple-500' : 'bg-slate-700 text-slate-400'}`}>
              {isAuthenticated ? 'JS' : '?'}
            </div>
            <div className="hidden lg:block">
              <p className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                {isAuthenticated ? 'John Smith' : 'Guest'}
              </p>
              <p className="text-xs text-slate-400">
                {isAuthenticated ? 'Pro' : 'Login'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Content Render */}
        <div className="flex-1 overflow-auto bg-slate-900 scroll-smooth">
            {view === 'ABOUT' ? (
              <About />
            ) : view === 'HOME' ? (
              <Profile 
                isAuthenticated={false}
                onLogin={handleLogin}
                onLogout={handleLogout}
              />
            ) : !isAuthenticated ? (
               <Profile 
                 isAuthenticated={isAuthenticated} 
                 onLogin={handleLogin} 
                 onLogout={handleLogout} 
               />
            ) : view === 'SOLVE' && activeProblem ? (
              <ProblemSolver 
                problem={activeProblem} 
                onBack={() => setView('CURRICULUM')}
              />
            ) : view === 'CURRICULUM' ? (
              <Curriculum topics={TOPICS} onSelectProblem={handleSelectProblem} />
            ) : view === 'COMMUNITY' ? (
              <Community />
            ) : view === 'FAANG' ? (
              <FAANGPrep />
            ) : (
               <Profile 
                 isAuthenticated={isAuthenticated} 
                 onLogin={handleLogin} 
                 onLogout={handleLogout} 
               />
            )}
        </div>
      </main>

      {/* Footer */}
      <footer className="h-16 bg-gradient-to-r from-slate-950/95 via-slate-900/95 to-slate-950/95 border-t border-slate-800 flex items-center justify-between px-6 shrink-0 backdrop-blur-sm">
        <div className="flex items-center gap-6">
          <p className="text-sm text-slate-300 transition-colors duration-200">
            © 2025 DSTECH. All rights reserved.
          </p>
          <div className="hidden sm:flex items-center gap-4 text-sm">
            <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Privacy Policy</a>
            <span className="text-slate-600">•</span>
            <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Terms of Service</a>
            <span className="text-slate-600">•</span>
            <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Contact</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 transform hover:-translate-y-0.5 hover:scale-105">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" /></svg>
          </a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 transform hover:-translate-y-0.5 hover:scale-105">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
          </a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 transform hover:-translate-y-0.5 hover:scale-105">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
