import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import RecentInquiry from "../pages/RecentInquiry";
import DemoRequests from "../pages/DemoRequests";
import NewRegistrations from "../pages/NewRegistrations";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/recent-inquiry" element={<RecentInquiry />} />
            <Route path="/demo-requests" element={<DemoRequests />} />
            <Route path="/new-registrations" element={<NewRegistrations />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
