import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

const Home = lazy(() => import("./Pages/Home"));
const AdminDashboard = lazy(() => import("./Component/AdminDashboard"));
const AdminLogin = lazy(() => import("./Component/AdminLogin"));
const RegisterPopup = lazy(() => import("./Component/RegisterPopup"));
const SocialIcons = lazy(() => import("./Component/SocialIcons"));
const InquiryPopup = lazy(() => import("./Component/InquiryPopup"));

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
  </div>
);

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
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <RegisterPopup 
                isOpen={isRegisterOpen} 
                onClose={handleRegisterClose} 
              />
              <InquiryPopup />
              <SocialIcons />
            </>
          } />
          <Route path="/admin" element={<AdminRoute />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
