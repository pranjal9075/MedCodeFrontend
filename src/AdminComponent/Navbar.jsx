import React from "react";

const Navbar = ({ darkMode, setDarkMode, sidebarOpen, setSidebarOpen, adminProfile, setActiveSection, onLogout }) => {
  return (
    <nav className={`fixed top-0 left-0 right-0 ${darkMode ? 'bg-gray-900/80 border-gray-700/50' : 'bg-white/80 border-gray-200/50'} backdrop-blur-xl border-b shadow-2xl z-50 transition-all duration-500`}>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className={`lg:hidden p-2 rounded-xl ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100'} transition-all duration-300 hover:rotate-180`}
          >
            <svg className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50 animate-pulse-slow">
                <span className="text-white text-xl font-bold">M</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-ping"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">MedCode</span>
              <p className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Admin Portal</p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          {/* <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Search..." 
              className={`w-full pl-10 pr-4 py-2 rounded-xl ${darkMode ? 'bg-gray-800/50 text-gray-200 placeholder-gray-400 border-gray-700' : 'bg-white/50 text-gray-800 placeholder-gray-500 border-gray-200'} border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
            />
            <svg className={`absolute left-3 top-2.5 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div> */}
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-xl ${darkMode ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'} hover:scale-110 hover:rotate-180 transition-all duration-500 shadow-lg`}
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          <button className={`relative p-2 rounded-xl ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100'} transition-all duration-300 group`}>
            <svg className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'} group-hover:scale-110 transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          </button>

          <div className="relative group">
            <button className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
              <img src={adminProfile.avatar} alt="Profile" className="w-9 h-9 rounded-full border-2 border-indigo-500 shadow-lg shadow-indigo-500/50 group-hover:scale-110 transition-transform" />
              <svg className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'} hidden sm:block`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`absolute right-0 mt-2 w-48 ${darkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-xl rounded-2xl shadow-2xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100`}>
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{adminProfile.name}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Administrator</p>
              </div>
              <button onClick={() => setActiveSection("settings")} className={`w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}>Settings</button>
              <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-b-2xl">Logout</button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      `}</style>
    </nav>
  );
};

export default Navbar;
