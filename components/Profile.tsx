
import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';
import { USER_DASHBOARD_DATA } from '../constants';

type TimeRange = 'last7Days' | 'last30Days' | 'allTime';

interface ProfileProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ isAuthenticated, onLogin, onLogout }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('last7Days');
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const currentStats = USER_DASHBOARD_DATA[timeRange];

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
          <div className="w-full max-w-6xl">
            {/* Hero Section */}
            <div className="text-center mb-16 animate-fade-in">
              <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
                Learn from industry experts, solve 500+ problems, and join thousands of engineers preparing for FAANG interviews.
              </p>
              
              {/* Taglines */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                <div className="group bg-slate-800/50 border border-slate-700 p-6 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20 hover:bg-white/8 hover:border-white/50 cursor-pointer">
                  <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:text-white">🚀</div>
                  <h3 className="text-lg font-bold text-white mb-2 transition-colors duration-300 group-hover:text-white">Learn Faster</h3>
                  <p className="text-slate-400 transition-colors duration-300 group-hover:text-slate-200">Structured curriculum designed for rapid skill development</p>
                </div>
                <div className="group bg-slate-800/50 border border-slate-700 p-6 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20 hover:bg-white/8 hover:border-white/50 cursor-pointer">
                  <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:text-white">📈</div>
                  <h3 className="text-lg font-bold text-white mb-2 transition-colors duration-300 group-hover:text-white">Track Progress</h3>
                  <p className="text-slate-400 transition-colors duration-300 group-hover:text-slate-200">Real-time analytics and insights into your learning journey</p>
                </div>
                <div className="group bg-slate-800/50 border border-slate-700 p-6 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20 hover:bg-white/8 hover:border-white/50 cursor-pointer">
                  <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:text-white">🎯</div>
                  <h3 className="text-lg font-bold text-white mb-2 transition-colors duration-300 group-hover:text-white">Get Results</h3>
                  <p className="text-slate-400 transition-colors duration-300 group-hover:text-slate-200">Proven strategies to land interviews at FAANG companies</p>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-indigo-400">✓</span> 500+ Problems
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-cyan-400">✓</span> Expert Solutions
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-purple-400">✓</span> Video Tutorials
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-pink-400">✓</span> Live Community
                </div>
              </div>

              {/* Main Tagline */}
              <div className="mb-16 max-w-4xl mx-auto group cursor-pointer">
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-12 leading-tight transition-all duration-300 group-hover:text-red-400/80">
                  Master <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 group-hover:from-red-400 group-hover:to-red-500">Data Structures</span> and <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 group-hover:from-red-400 group-hover:to-red-500">Algorithms</span> Today
                </h2>
              </div>

              {/* Stats Section */}
              <div className="mb-16 max-w-4xl mx-auto">
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 border border-indigo-500/20 p-6 rounded-lg">
                    <p className="text-4xl font-bold text-indigo-400 mb-2">10K+</p>
                    <p className="text-slate-400">Active Learners</p>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 p-6 rounded-lg">
                    <p className="text-4xl font-bold text-cyan-400 mb-2">500+</p>
                    <p className="text-slate-400">Problems</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 p-6 rounded-lg">
                    <p className="text-4xl font-bold text-purple-400 mb-2">95%</p>
                    <p className="text-slate-400">Success Rate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Auth Card */}
            <div className="max-w-md mx-auto bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden animate-fade-in">
              {/* Auth Header */}
              <div className="bg-slate-900 p-6 text-center border-b border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-2">Welcome to DSTECH</h2>
                <p className="text-slate-400 text-sm">Master DSA and ace your interviews</p>
              </div>

              {/* Auth Tabs */}
              <div className="flex border-b border-slate-700">
                <button 
                  onClick={() => setIsLoginMode(true)}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${isLoginMode ? 'bg-slate-800 text-indigo-400 border-b-2 border-indigo-500' : 'bg-slate-900/50 text-slate-400 hover:text-slate-200'}`}
                >
                  Login
                </button>
                <button 
                  onClick={() => setIsLoginMode(false)}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${!isLoginMode ? 'bg-slate-800 text-indigo-400 border-b-2 border-indigo-500' : 'bg-slate-900/50 text-slate-400 hover:text-slate-200'}`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form */}
              <div className="p-8 space-y-5">
                {!isLoginMode && (
                  <div className="animate-fade-in">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                {isLoginMode && (
                  <div className="flex justify-end">
                    <button className="text-xs text-indigo-400 hover:text-indigo-300">Forgot Password?</button>
                  </div>
                )}

                <button 
                  onClick={onLogin}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02]"
                >
                  {isLoginMode ? 'Sign In' : 'Create Account'}
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-slate-800 text-slate-500">Or continue with</span>
                  </div>
                </div>

                <button onClick={onLogin} className="w-full bg-slate-900 border border-slate-600 hover:bg-slate-700 text-slate-300 font-medium py-3 rounded-lg flex items-center justify-center gap-3 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
                  Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col md:flex-row items-center gap-6 shadow-lg">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-3xl font-bold text-white shadow-inner border-4 border-slate-900">
          JS
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white">John Smith</h2>
          <div className="flex items-center gap-2 justify-center md:justify-start mt-1">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-0.5 rounded border border-indigo-500/30">Pro Member</span>
            <span className="text-slate-400 text-sm">Member since Jan 2024</span>
          </div>
          <p className="text-slate-400 text-sm mt-2 max-w-md">
            Aspiring Software Engineer focused on mastering Algorithms and System Design.
          </p>
        </div>
        <div className="md:ml-auto flex gap-3">
            <button className="px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm font-medium">
            Edit Profile
            </button>
            <button 
            onClick={onLogout}
            className="px-4 py-2 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors text-sm font-medium"
            >
            Logout
            </button>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
           <h3 className="text-xl font-bold text-white">Performance Dashboard</h3>
           <select 
             value={timeRange}
             onChange={(e) => setTimeRange(e.target.value as TimeRange)}
             className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded px-3 py-1 outline-none focus:border-indigo-500 transition-colors cursor-pointer"
           >
             <option value="last7Days">Last 7 Days</option>
             <option value="last30Days">Last 30 Days</option>
             <option value="allTime">All Time</option>
           </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat Cards */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider relative z-10">Global Rank</h3>
            <p className="text-4xl font-bold text-white mt-2 relative z-10">#{currentStats.rank.toLocaleString()}</p>
            <p className="text-green-400 text-sm mt-1 relative z-10">Top 15%</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider relative z-10">Problems Solved</h3>
            <p className="text-4xl font-bold text-white mt-2 relative z-10">{currentStats.problemsSolved}</p>
            <p className="text-slate-400 text-sm mt-1 relative z-10">
              {timeRange === 'last7Days' ? 'This week' : timeRange === 'last30Days' ? 'This month' : 'Total'}
            </p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider relative z-10">Current Streak</h3>
            <p className="text-4xl font-bold text-indigo-400 mt-2 relative z-10">{currentStats.streak}</p>
            <p className="text-slate-400 text-sm mt-1 relative z-10">Days</p>
          </div>
        </div>
      </div>

      {/* Activity Line Chart */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg h-96 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-4">
          Activity ({timeRange === 'last7Days' ? 'Daily' : timeRange === 'last30Days' ? 'Weekly' : 'Monthly'})
        </h3>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentStats.activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="day" stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9', borderRadius: '8px' }}
              />
              <Line 
                type="monotone" 
                dataKey="solved" 
                stroke="#22d3ee" 
                strokeWidth={3}
                activeDot={{ r: 8, strokeWidth: 0 }}
                dot={{ r: 4, strokeWidth: 0, fill: '#22d3ee' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Time Spent Chart */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg h-96 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-4">Time Investment by Topic (Hours)</h3>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentStats.topicTimeDistribution} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
              <XAxis type="number" stroke="#94a3b8" />
              <YAxis dataKey="topic" type="category" stroke="#94a3b8" width={100} tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9', borderRadius: '8px' }}
                cursor={{fill: '#334155', opacity: 0.4}}
              />
              <Bar dataKey="time" fill="#a78bfa" radius={[0, 4, 4, 0]} barSize={24} name="Hours" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* History / Completed Section */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg overflow-hidden">
         <div className="p-6 border-b border-slate-700 flex justify-between items-center">
             <h3 className="text-xl font-bold text-white">Recent History</h3>
             <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">View All</button>
         </div>
         <div className="divide-y divide-slate-700">
             {currentStats.history.map((item) => (
                 <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors animate-fade-in">
                     <div className="flex items-center gap-4">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                             item.type === 'problem' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                         }`}>
                             {item.type === 'problem' ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                             ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                             )}
                         </div>
                         <div>
                             <p className="text-white font-medium">{item.title}</p>
                             <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                                 <span>{item.action}</span>
                                 <span>•</span>
                                 <span>{item.meta}</span>
                             </div>
                         </div>
                     </div>
                     <div className="text-right">
                         <p className="text-slate-400 text-sm">{item.date}</p>
                         <span className="inline-flex items-center gap-1 text-xs text-green-400 mt-1">
                             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                             Completed
                         </span>
                     </div>
                 </div>
             ))}
         </div>
      </div>
    </div>
  );
};

export default Profile;
