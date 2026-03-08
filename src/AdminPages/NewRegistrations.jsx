import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { API_URL } from "../config";

const NewRegistrations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewModal, setViewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const itemsPerPage = 5;
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users`);
        setRegistrations(res.data);
      } catch (err) {
        console.error("Error fetching registrations:", err);
      }
    };
    fetchRegistrations();
  }, []);

  const filteredData = registrations.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      
      doc.setFontSize(20);
      doc.text("New Registrations", 14, 20);
      
      autoTable(doc, {
        startY: 30,
        head: [["Name", "Email","Mobile", "Joined"]],
        body: filteredData.map(r => [r.name, r.email,r.mobile, r.joined]),
        didDrawPage: (data) => {
          doc.setFontSize(10);
          doc.setTextColor(200);
          doc.text("medcode.tech", data.settings.margin.left, doc.internal.pageSize.height - 10);
        }
      });
      
      doc.save("new-registrations.pdf");
    } catch (error) {
      console.error("PDF Error:", error);
      alert("Failed to generate PDF");
    }
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // -------------------- DELETE USER --------------------
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  try {
    const res = await axios.delete(
      `${API_URL}/api/users/${id}`
    );

    if (res.data.success) {
      setRegistrations(
        registrations.filter((r) => r.id !== id)
      );
    }
  } catch (error) {
    console.error("Delete Error:", error);
  }
};



  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#4a7c6f] to-[#5a8c7f] bg-clip-text text-transparent flex items-center gap-2">
        <span className="animate-bounce">👥</span> New Registrations
      </h2>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
        <div className="p-3 md:p-4 border-b bg-gradient-to-r from-gray-50 to-blue-50 flex flex-col md:flex-row gap-2 md:gap-4">
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="🔍 Search registrants..." className="border-2 border-gray-200 px-3 py-2 rounded-xl flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7c6f] focus:border-transparent transition-all hover:border-[#4a7c6f]" />
          <button onClick={exportToPDF} className="border px-2 md:px-4 py-2 rounded-xl text-xs md:text-sm hover:bg-gray-100">Export</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm">Name</th>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm">Email</th>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm">Mobile</th>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm">Joined</th>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((reg) => (
                <tr key={reg.id} className="border-b hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group">
                  
                  <td className="p-2 md:p-3 flex items-center gap-2 text-xs md:text-sm"><div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-[#4a7c6f] to-[#5a8c7f] rounded-full flex-shrink-0 group-hover:scale-110 transition-transform duration-300"></div> <span className="truncate font-medium">{reg.name}</span></td>
                  <td className="p-2 md:p-3 text-xs md:text-sm truncate">{reg.email}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm">{reg.mobile}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm">{reg.joined}</td>
                  <td className="p-2 md:p-3 flex gap-1 md:gap-2">
                    <button onClick={() => setViewModal(reg)} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 md:px-3 py-1 rounded-lg text-xs hover:shadow-lg transition-all duration-300 hover:scale-110">👁️</button>
                    <button onClick={() => handleDelete(reg.id)} className="bg-gradient-to-r from-red-500 to-red-600 text-white px-2 md:px-3 py-1 rounded-lg text-xs hover:shadow-lg transition-all duration-300 hover:scale-110">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 md:p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs md:text-sm text-gray-600">{filteredData.length} of {registrations.length} registrations</p>
          <div className="flex gap-1 md:gap-2 flex-wrap justify-center">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-2 md:px-3 py-1 border rounded text-xs md:text-sm hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed">Prev</button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`px-2 md:px-3 py-1 rounded text-xs md:text-sm transition-all ${currentPage === i + 1 ? "bg-[#4a7c6f] text-white" : "border hover:bg-gray-100"}`}>{i + 1}</button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-2 md:px-3 py-1 border rounded text-xs md:text-sm hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
          </div>
        </div>
      </div>

      {viewModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={() => setViewModal(null)}>
          <div className="bg-white rounded-2xl p-4 md:p-6 w-full max-w-md shadow-2xl transform scale-95 animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg md:text-xl font-bold mb-4 bg-gradient-to-r from-[#4a7c6f] to-[#5a8c7f] bg-clip-text text-transparent">📝 Registration Details</h3>
            <div className="space-y-3 text-sm md:text-base">
              <p className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"><strong>Name:</strong> {viewModal.name}</p>
              <p className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"><strong>Email:</strong> {viewModal.email}</p>
              <p className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"><strong>Mobile:</strong> {viewModal.mobile}</p>
              <p className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"><strong>Joined:</strong> {viewModal.joined}</p>
            </div>
            <button onClick={() => setViewModal(null)} className="mt-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 w-full hover:scale-105 text-sm md:text-base">Close</button>
          </div>
        </div>
      )}


      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default NewRegistrations;
