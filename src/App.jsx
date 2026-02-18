import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import RegisterPopup from "./Component/RegisterPopup";
import SocialIcons from "./Component/SocialIcons";
import InquiryPopup from "./Component/InquiryPopup";
import Home from "./Pages/Home";
import AdminDashboard from "./Component/AdminDashboard";
import AdminLogin from "./Component/AdminLogin";

const AdminRoute = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLoginSuccess = () => {
    setShowLogin(false);
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminEmail");
    navigate("/");
  };

  if (isAdmin) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <AdminLogin 
        isOpen={showLogin} 
        onClose={() => navigate("/")} 
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  // AUTO OPEN REGISTER POPUP ON PAGE LOAD
  useEffect(() => {
    const isUserRegistered = localStorage.getItem("isUserRegistered");
    const isLoggedIn = localStorage.getItem("token");
    
    if (!isUserRegistered && !isLoggedIn) {
      const timer = setTimeout(() => {
        setIsRegisterOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleRegisterClose = () => {
    setIsRegisterOpen(false);
    setIsInquiryOpen(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <RegisterPopup 
              isOpen={isRegisterOpen} 
              onClose={handleRegisterClose} 
            />
            {isInquiryOpen && (
              <InquiryPopup 
                autoOpenDelay={0}
                onClose={() => setIsInquiryOpen(false)}
              />
            )}
            <SocialIcons />
          </>
        } />
        <Route path="/admin" element={<AdminRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
