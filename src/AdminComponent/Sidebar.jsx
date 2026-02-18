import React from "react";
const Sidebar = ({ darkMode, sidebarOpen, setSidebarOpen, activeSection, setActiveSection }) => {
  return (
    <>
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] ${darkMode ? 'bg-gray-900/80 border-gray-700/50' : 'bg-white/80 border-gray-200/50'} backdrop-blur-xl border-r shadow-2xl transition-all duration-500 z-40 overflow-y-auto`}>
        <nav className="p-4 space-y-1">
          {[
            { id: "dashboard", icon: "📊", label: "Dashboard" },
            { id: "registrations", icon: "👥", label: "Registrations" },
            { id: "inquiry", icon: "💬", label: "Inquiry" },
            { id: "downloads", icon: "📧", label: "Brochures" },
            { id: "requests", icon: "🎯", label: "Demo Requests" },
            { id: "settings", icon: "⚙️", label: "Settings" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl shadow-purple-500/50 scale-105'
                  : darkMode 
                    ? 'text-gray-300 hover:bg-gray-700/50 hover:translate-x-1' 
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-purple-50 hover:translate-x-1'
              }`}
            >
              {activeSection === item.id && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></span>
              )}
              <span className="text-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 relative z-10">{item.icon}</span>
              <span className="font-medium relative z-10">{item.label}</span>
              {activeSection === item.id && (
                <span className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse relative z-10"></span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
        />
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 2s infinite; }
      `}</style>
    </>
  );
};

export default Sidebar;