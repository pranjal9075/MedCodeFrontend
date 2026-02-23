import React, { useEffect, useState, useRef } from "react";
import { assets } from "../assets/assets";
import RegisterPopup from "./RegisterPopup";
import LoginPopup from "./Login";
import PopupForm from "./PopupForm";
import Profile from "../UserProfile/profile";
import Settings from "../UserProfile/setting";

const TopBar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ CHECK LOGIN STATUS
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      setIsLoggedIn(!!token);
      
      if (userData && userData !== "undefined" && userData !== "null") {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    checkLogin();
    window.addEventListener("authChanged", checkLogin);
    return () => window.removeEventListener("authChanged", checkLogin);
  }, []);

  // Auto logout on window close
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // ✅ SWITCHING LOGIC (Implement kiya gaya hai)
  const handleSwitchToRegister = () => {
    setIsLoginOpen(false);
    setTimeout(() => setIsRegisterOpen(true), 100);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterOpen(false);
    setTimeout(() => setIsLoginOpen(true), 100);
  };

  const handleScroll = () => {
    const section = document.getElementById("targetdiv");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setShowDropdown(false);
    window.dispatchEvent(new Event("authChanged"));
  };

  const getInitials = () => {
    if (!user) return "U";
    const name = user.fullName || user.name || "";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
    }
    return parts[0]?.charAt(0).toUpperCase() || "U";
  };

  return (
    <>
      {/* POPUPS - Props yahan implement kiye gaye hain */}
      <PopupForm isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      
      <RegisterPopup
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={handleSwitchToLogin} // Pass kiya gaya prop
      />
      
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={handleSwitchToRegister} // Pass kiya gaya prop
      />

      <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* TOP BAR UI */}
      <div className="w-full bg-white border-b fixed top-0 left-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between md:grid items-center px-2 md:px-4 py-2 md:grid-cols-[auto_1fr_auto] gap-2 md:gap-3">
          
          {/* LEFT */}
          <div className="flex items-center gap-6 md:gap-3 shrink-0 cursor-pointer" onClick={handleScroll}>
            <img src={assets.logo} alt="Logo" className="h-15 w-auto" />
            <div className="w-0.5 h-10 bg-[#4C34A5]" />
            <div className="leading-tight text-center">
              <p className="text-xl md:text-3xl font-semibold text-[#4C34A5]">12</p>
              <p className="text-[10px] md:text-[11px] text-[#4C34A5]">Years</p>
            </div>
          </div>

          {/* CENTER */}
          <div className="hidden md:flex flex-col items-center text-center font-medium">
            <div className="flex gap-3 text-[13px] text-gray-700">
              <span>41,000+ Trained</span> | <span>5,600+ Reviews</span> | <span>4,000+ Live Classes</span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 justify-end">
            <button className="bg-[#4C34A5] text-white px-3 py-2 rounded-md cursor-pointer" onClick={handleScroll}>
              Book Free Demo
            </button>

            <button className="hidden md:block bg-[#4C34A5] text-white px-4 py-2 rounded-md cursor-pointer" onClick={() => setIsPopupOpen(true)}>
              Get Quick Call Back
            </button>

            {!isLoggedIn ? (
              <>
                <button className="bg-[#4C34A5] text-white px-3 py-2 rounded-md cursor-pointer" onClick={() => setIsRegisterOpen(true)}>
                  Register Now
                </button>
                <button className="bg-[#4C34A5] text-white px-3 py-2 rounded-md cursor-pointer" onClick={() => setIsLoginOpen(true)}>
                  Login
                </button>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4C34A5] to-[#7C3AED] text-white flex items-center justify-center font-bold text-sm cursor-pointer hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 border-2 border-white/20"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {getInitials()}
                </div>
                {showDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 py-1 z-50 animate-[slideDown_0.2s_ease]"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
                      <p className="font-bold text-gray-800 text-sm">{user?.fullName || user?.name || "User"}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{user?.email || ""}</p>
                    </div>
                    <button className="w-full text-left px-4 py-2.5 hover:bg-purple-50 text-gray-700 text-sm flex items-center gap-2 transition-colors" onClick={() => { setShowDropdown(false); setIsProfileOpen(true); }}>
                      <span>👤</span> Profile
                    </button>
                    <button className="w-full text-left px-4 py-2.5 hover:bg-purple-50 text-gray-700 text-sm flex items-center gap-2 transition-colors" onClick={() => setShowDropdown(false)}>
                      <span>📚</span> My Courses
                    </button>
                    <button className="w-full text-left px-4 py-2.5 hover:bg-purple-50 text-gray-700 text-sm flex items-center gap-2 transition-colors" onClick={() => { setShowDropdown(false); setIsSettingsOpen(true); }}>
                      <span>⚙️</span> Settings
                    </button>
                    <div className="border-t border-gray-100 mt-1">
                      <button className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-600 text-sm font-medium flex items-center gap-2 transition-colors" onClick={handleLogout}>
                        <span>🚪</span> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default TopBar;