
import React, { useState } from 'react';
import { COMMUNITY_POSTS } from '../constants';

const Community: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = COMMUNITY_POSTS.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="p-6 md:p-8 animate-fade-in max-w-4xl mx-auto relative">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-white">Community</h1>
            <p className="text-slate-400">Discuss solutions, share interview experiences, and grow together.</p>
        </div>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 w-full md:w-auto justify-center"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            New Post
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8 group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts by keyword or tag..."
          className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg leading-5 bg-slate-800 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-900 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors shadow-sm"
        />
      </div>

      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                    <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full border-2 border-slate-600" />
                    <div>
                        <h4 className="text-sm font-bold text-white">{post.author}</h4>
                        <span className="text-xs text-slate-500">{post.timeAgo}</span>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">{post.title}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{post.content}</p>
                
                {post.projectImage && (
                    <div className="mb-4 rounded-lg overflow-hidden border border-slate-700/50 bg-black/20">
                        <img 
                            src={post.projectImage} 
                            alt="Post attachment" 
                            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" 
                        />
                    </div>
                )}

                <div className="flex items-center justify-between border-t border-slate-700 pt-4">
                    <div className="flex gap-2 flex-wrap">
                        {post.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs font-medium">#{tag}</span>
                        ))}
                    </div>
                    <div className="flex gap-4 text-slate-400 text-sm shrink-0">
                        <button className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                             {post.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                             {post.comments}
                        </button>
                    </div>
                </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
            <svg className="w-12 h-12 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h3 className="text-lg font-medium text-slate-300">No posts found</h3>
            <p className="text-slate-500 text-sm mt-1">Try searching for different keywords or tags.</p>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm p-4">
             <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in flex flex-col">
                 {/* Modal Header */}
                 <div className="border-b border-slate-700 p-4 flex justify-between items-center bg-slate-800">
                     <h3 className="font-bold text-white text-lg text-center flex-1">Create new post</h3>
                     <button 
                        onClick={() => setIsModalOpen(false)} 
                        className="bg-slate-700 hover:bg-slate-600 rounded-full p-1 text-slate-300 transition-colors"
                     >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                     </button>
                 </div>

                 {/* Modal Body */}
                 <div className="p-4 flex-1 overflow-y-auto">
                    <div className="flex gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shrink-0 shadow-lg border border-slate-600">JS</div>
                        <div className="flex-1">
                             <p className="font-bold text-sm text-white">John Smith</p>
                             <div className="flex items-center gap-2 mt-0.5">
                                 <span className="bg-slate-700 text-slate-300 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Public
                                 </span>
                             </div>
                        </div>
                    </div>
                    
                    <textarea
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder="What's on your mind, John?"
                        className="w-full bg-transparent text-slate-200 placeholder-slate-500 text-lg mt-2 focus:outline-none resize-none min-h-[150px]"
                    />

                    {/* Add to Post Toolbar */}
                    <div className="border border-slate-700 rounded-lg p-3 flex justify-between items-center bg-slate-900/50 mt-4 shadow-inner">
                        <span className="text-sm text-slate-300 font-medium">Add to your post</span>
                        <div className="flex gap-2">
                             {/* Photo/Video */}
                             <button className="text-green-500 hover:bg-slate-700 p-2 rounded-full transition-colors relative group" title="Photo/Video">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                             </button>
                             {/* Tag People */}
                             <button className="text-blue-500 hover:bg-slate-700 p-2 rounded-full transition-colors group" title="Tag People">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                             </button>
                             {/* Feeling/Activity */}
                             <button className="text-yellow-500 hover:bg-slate-700 p-2 rounded-full transition-colors group" title="Feeling/Activity">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                             </button>
                             {/* Location */}
                             <button className="text-red-500 hover:bg-slate-700 p-2 rounded-full transition-colors group" title="Check in">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                             </button>
                             {/* Code Snippet */}
                             <button className="text-indigo-400 hover:bg-slate-700 p-2 rounded-full transition-colors group" title="Code Snippet">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                             </button>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-bold mt-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-indigo-500/25"
                        disabled={!postContent.trim()}
                    >
                        Post
                    </button>
                 </div>
             </div>
        </div>
      )}
    </div>
  );
};

export default Community;
