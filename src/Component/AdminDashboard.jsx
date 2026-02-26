import React, { useState } from "react";
import Dashboard from "../AdminPages/Dashboard";
import NewRegistrations from "../AdminPages/NewRegistrations";
import RecentInquiry from "../AdminPages/RecentInquiry";
import DemoRequests from "../AdminPages/DemoRequests";
import BrochureDownloads from "../AdminPages/BrochureDownloads";
import Settings from "../AdminPages/Settings";
import Navbar from "../AdminComponent/Navbar";
import Sidebar from "../AdminComponent/Sidebar";

const AdminDashboard = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [adminProfile, setAdminProfile] = useState({
    name: "Admin User",
    avatar: "https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff&size=200"
  });

  // Load admin profile from API on mount
  React.useEffect(() => {
    fetch("http://localhost:5000/api/admin-profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setAdminProfile({
            name: data.data.name,
            avatar: data.data.avatar + "?t=" + Date.now(),
          });
        }
      })
      .catch((err) => console.log("Profile Load Error:", err));
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'} transition-all duration-500 relative overflow-hidden`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <Navbar 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        adminProfile={adminProfile}
        setActiveSection={setActiveSection}
        onLogout={onLogout}
      />

      <div className="flex pt-16">
        <Sidebar 
          darkMode={darkMode}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <main className="flex-1 lg:ml-64 p-4 md:p-6 relative z-10">
          {activeSection === "registrations" ? (
            <NewRegistrations />
          ) : activeSection === "requests" ? (
            <DemoRequests />
          ) : activeSection === "downloads" ? (
            <BrochureDownloads />
          ) : activeSection === "inquiry" ? (
            <RecentInquiry />
          ) : activeSection === "settings" ? (
            <Settings adminProfile={adminProfile} setAdminProfile={setAdminProfile} />
          ) : (
            <Dashboard />
          )}
        </main>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
