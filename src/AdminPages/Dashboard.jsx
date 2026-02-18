import React, { useState, useEffect } from "react";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState("week");
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    newToday: 0,
    totalInquiries: 0,
    pendingApprovals: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/stats/count");
        const result = await res.json();
        const data = result.data;

        animateValue('totalRegistrations', 0, data.totalRegistrations, 1500);
        animateValue('newToday', 0, data.newToday, 1200);
        animateValue('totalInquiries', 0, data.totalInquiries, 1500);
        animateValue('pendingApprovals', 0, data.pendingApprovals, 1000);
      } catch (error) {
        console.error("Dashboard API Error:", error);
      }
    };

    const animateValue = (key, start, end, duration) => {
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        setStats(prev => ({ ...prev, [key]: current }));
        if (progress === 1) clearInterval(timer);
      }, 20);
    };

    fetchStats();
  }, []);

  const lineData = {
    week: [
      { name: "Mon", registrations: 45, inquiries: 30 },
      { name: "Tue", registrations: 52, inquiries: 38 },
      { name: "Wed", registrations: 48, inquiries: 35 },
      { name: "Thu", registrations: 61, inquiries: 42 },
      { name: "Fri", registrations: 55, inquiries: 40 },
      { name: "Sat", registrations: 38, inquiries: 28 },
      { name: "Sun", registrations: 42, inquiries: 32 },
    ],
    month: [
      { name: "Week 1", registrations: 245, inquiries: 180 },
      { name: "Week 2", registrations: 280, inquiries: 210 },
      { name: "Week 3", registrations: 265, inquiries: 195 },
      { name: "Week 4", registrations: 310, inquiries: 230 },
    ],
    year: [
      { name: "Jan", registrations: 980, inquiries: 720 },
      { name: "Feb", registrations: 1050, inquiries: 780 },
      { name: "Mar", registrations: 1120, inquiries: 850 },
      { name: "Apr", registrations: 1200, inquiries: 920 },
      { name: "May", registrations: 1150, inquiries: 880 },
      { name: "Jun", registrations: 1280, inquiries: 950 },
    ],
  };

  const pieData = [
    { name: "Students", value: 650, color: "#4a7c6f" },
    { name: "Teachers", value: 280, color: "#f59e0b" },
    { name: "Professionals", value: 318, color: "#3b82f6" },
  ];

  return (
    <div className="p-4 md:p-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#4a7c6f] to-[#5a8c7f] bg-clip-text text-transparent animate-slideInLeft">Dashboard Overview</h2>
        <div className="flex gap-2 w-full md:w-auto animate-slideInRight">
          <button onClick={() => setTimeFilter("week")} className={`flex-1 md:flex-none px-3 md:px-4 py-2 rounded-xl text-sm md:text-base transition-all duration-300 ${timeFilter === "week" ? "bg-gradient-to-r from-[#4a7c6f] to-[#5a8c7f] text-white shadow-xl scale-105" : "bg-white hover:bg-gray-50 shadow-md hover:shadow-lg hover:scale-105"}`}>Week</button>
          <button onClick={() => setTimeFilter("month")} className={`flex-1 md:flex-none px-3 md:px-4 py-2 rounded-xl text-sm md:text-base transition-all duration-300 ${timeFilter === "month" ? "bg-gradient-to-r from-[#4a7c6f] to-[#5a8c7f] text-white shadow-xl scale-105" : "bg-white hover:bg-gray-50 shadow-md hover:shadow-lg hover:scale-105"}`}>Month</button>
          <button onClick={() => setTimeFilter("year")} className={`flex-1 md:flex-none px-3 md:px-4 py-2 rounded-xl text-sm md:text-base transition-all duration-300 ${timeFilter === "year" ? "bg-gradient-to-r from-[#4a7c6f] to-[#5a8c7f] text-white shadow-xl scale-105" : "bg-white hover:bg-gray-50 shadow-md hover:shadow-lg hover:scale-105"}`}>Year</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="relative bg-gradient-to-br from-white via-blue-50 to-indigo-100 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 hover:scale-105 border-2 border-blue-200 group animate-slideUp overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full -mr-10 -mt-10 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex justify-between items-start mb-3 relative z-10">
            <p className="text-xs md:text-sm text-gray-700 font-semibold">Total Registrations</p>
            <span className="text-3xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">👥</span>
          </div>
          <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#4a7c6f] via-blue-600 to-purple-600 bg-clip-text text-transparent relative z-10">{stats.totalRegistrations.toLocaleString()}</p>
          <div className="mt-3 h-2 bg-gradient-to-r from-[#4a7c6f] via-blue-500 to-purple-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 shadow-lg"></div>
        </div>
        <div className="relative bg-gradient-to-br from-white via-green-50 to-emerald-100 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 hover:scale-105 border-2 border-green-200 group animate-slideUp overflow-hidden" style={{animationDelay: '0.1s'}}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full -mr-10 -mt-10 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex justify-between items-start mb-3 relative z-10">
            <p className="text-xs md:text-sm text-gray-700 font-semibold">New Today</p>
            <span className="text-3xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">🎉</span>
          </div>
          <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent relative z-10">{stats.newToday} ↑</p>
          <div className="mt-3 h-2 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 shadow-lg"></div>
        </div>
        <div className="relative bg-gradient-to-br from-white via-orange-50 to-red-100 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 hover:scale-105 border-2 border-orange-200 group animate-slideUp overflow-hidden" style={{animationDelay: '0.2s'}}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full -mr-10 -mt-10 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex justify-between items-start mb-3 relative z-10">
            <p className="text-xs md:text-sm text-gray-700 font-semibold">Total Inquiries</p>
            <span className="text-3xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">💬</span>
          </div>
          <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent relative z-10">{stats.totalInquiries >= 1000 ? (stats.totalInquiries / 1000).toFixed(1) + 'k' : stats.totalInquiries}</p>
          <div className="mt-3 h-2 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 shadow-lg"></div>
        </div>
        <div className="relative bg-gradient-to-br from-white via-purple-50 to-pink-100 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 hover:scale-105 border-2 border-purple-200 group animate-slideUp overflow-hidden" style={{animationDelay: '0.3s'}}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full -mr-10 -mt-10 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex justify-between items-start mb-3 relative z-10">
            <p className="text-xs md:text-sm text-gray-700 font-semibold">Pending Approvals</p>
            <span className="text-3xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">⚠️</span>
          </div>
          <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent relative z-10">{stats.pendingApprovals}</p>
          <div className="mt-3 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 shadow-lg"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
        <div className="relative bg-white p-4 md:p-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-gray-200 hover:border-[#4a7c6f] group animate-fadeIn overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4a7c6f] via-blue-500 to-purple-500"></div>
          <h3 className="text-base md:text-lg font-bold mb-4 bg-gradient-to-r from-[#4a7c6f] via-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">📈</span>
            Registrations & Inquiries Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData[timeFilter]}>
              <defs>
                <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4a7c6f" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4a7c6f" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorInq" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#6b7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', padding: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px', fontWeight: '600' }} />
              <Line type="monotone" dataKey="registrations" stroke="#4a7c6f" strokeWidth={4} dot={{ fill: '#4a7c6f', r: 6, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 10, strokeWidth: 3 }} fill="url(#colorReg)" />
              <Line type="monotone" dataKey="inquiries" stroke="#f59e0b" strokeWidth={4} dot={{ fill: '#f59e0b', r: 6, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 10, strokeWidth: 3 }} fill="url(#colorInq)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="relative bg-white p-4 md:p-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-gray-200 hover:border-[#4a7c6f] group animate-fadeIn overflow-hidden" style={{animationDelay: '0.2s'}}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500"></div>
          <h3 className="text-base md:text-lg font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">🧩</span>
            User Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={90} fill="#8884d8" dataKey="value" animationBegin={0} animationDuration={1000} stroke="#fff" strokeWidth={3}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', padding: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s ease-out; }
      `}</style>
    </div>
  );
};

export default Dashboard;
