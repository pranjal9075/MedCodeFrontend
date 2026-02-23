import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { API_URL } from "../config";

const RecentInquiry = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewModal, setViewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const itemsPerPage = 4;
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/inquiry`);
      const formatted = res.data.map((item) => ({
        ...item,
        type: item.inquiry,
        date: new Date(item.created_at).toLocaleString(),
      }));
      setInquiries(formatted);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const filteredData = inquiries.filter(i => 
    i.name?.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      
      doc.setFontSize(20);
      doc.text("Recent Inquiries", 14, 20);
      
      autoTable(doc, {
        startY: 30,
        head: [["Name", "Phone", "Type", "Date"]],
        body: filteredData.map(i => [i.name, i.phone, i.type, i.date]),
        didDrawPage: (data) => {
          doc.setFontSize(10);
          doc.setTextColor(200);
          doc.text("medcode.tech", data.settings.margin.left, doc.internal.pageSize.height - 10);
        }
      });
      
      doc.save("recent-inquiries.pdf");
    } catch (error) {
      console.error("PDF Error:", error);
      alert("Failed to generate PDF");
    }
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  // ------------------ DELETE ------------------
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this inquiry?")) return;

  try {
    const res = await axios.delete(
      `${API_URL}/api/inquiry/${id}`
    );

    if (res.data.success) {
      setInquiries(inquiries.filter((i) => i.id !== id));
    }
  } catch (error) {
    console.error("Delete Error:", error);
  }
};

// ------------------ OPEN EDIT ------------------
const handleEdit = (inq) => {
  setEditModal({
    ...inq,
    inquiryType: inq.type,   // map type → inquiryType
  });
};

// ------------------ SAVE EDIT ------------------
const handleSaveEdit = async () => {
  try {
    const res = await axios.put(
      `${API_URL}/api/inquiry/${editModal.id}`,
      {
        name: editModal.name,
        phone: editModal.phone,
        inquiryType: editModal.type,   // IMPORTANT
        message: editModal.message || "Updated from admin",
      }
    );

    if (res.data.success) {
      setInquiries(
        inquiries.map((i) =>
          i.id === editModal.id
            ? { ...i, name: editModal.name, phone: editModal.phone, type: editModal.type }
            : i
        )
      );
      setEditModal(null);
    }
  } catch (error) {
    console.error("Update Error:", error);
  }
};


  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#4a7c6f] to-[#5a8c7f] bg-clip-text text-transparent flex items-center gap-2">
        <span className="animate-bounce">💬</span> Recent Inquiry
      </h2>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-3">
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className="border px-3 md:px-4 py-2 rounded w-full lg:w-64 text-sm md:text-base" />
        <div className="flex flex-wrap gap-2 md:gap-4 items-center text-xs md:text-sm">
          <button onClick={exportToPDF} className="border px-2 md:px-4 py-2 rounded text-xs md:text-sm hover:bg-gray-100">Export</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm">Name</th>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm">phone</th>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm">Inquiry Type</th>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm">Date / Time</th>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((inq) => (
                <tr key={inq.id} className="border-b hover:bg-gray-50 transition-all">
                  <td className="p-2 md:p-3 text-xs md:text-sm">{inq.name}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm">{inq.phone}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm">{inq.type}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm">{inq.date}</td>
                  <td className="p-2 md:p-3 flex gap-1 md:gap-2">
                    <button onClick={() => setViewModal(inq)} className="bg-blue-500 text-white px-2 md:px-3 py-1 rounded text-xs hover:bg-blue-600 transition-all">👁️</button>
                    <button onClick={() => handleEdit(inq)} className="bg-[#4a7c6f] text-white px-2 md:px-3 py-1 rounded text-xs hover:bg-[#3d6659] transition-all">✏️</button>
                    <button onClick={() => handleDelete(inq.id)} className="bg-red-500 text-white px-2 md:px-3 py-1 rounded text-xs hover:bg-red-600 transition-all">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        <div className="p-3 md:p-4 flex flex-col sm:flex-row justify-center items-center gap-2">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-2 md:px-3 py-1 border rounded text-xs md:text-sm hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed">&lt; Prev</button>

          {[...Array(totalPages)].map((_, i) => (
            <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`px-2 md:px-3 py-1 rounded text-xs md:text-sm transition-all ${currentPage === i + 1 ? "bg-[#4a7c6f] text-white" : "border hover:bg-gray-100"}`}>{i + 1}</button>
          ))}

          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-2 md:px-3 py-1 border rounded text-xs md:text-sm hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed">Next &gt;</button>
        </div>
      </div>

      {viewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setViewModal(null)}>
          <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg md:text-xl font-bold mb-4">Inquiry Details</h3>
            <div className="space-y-3 text-sm md:text-base">
              <p><strong>Name:</strong> {viewModal.name}</p>
              <p><strong>Email:</strong> {viewModal.email}</p>
              <p><strong>phone:</strong> {viewModal.phone}</p>
              <p><strong>Type:</strong> {viewModal.type}</p>
              <p><strong>Date:</strong> {viewModal.date}</p>
            </div>
            <button onClick={() => setViewModal(null)} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all w-full text-sm md:text-base">Close</button>
          </div>
        </div>
      )}

      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setEditModal(null)}>
          <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg md:text-xl font-bold mb-4">Edit Inquiry</h3>

            <div className="space-y-3">
              <input type="text" value={editModal.name} onChange={(e) => setEditModal({...editModal, name: e.target.value})} className="w-full border px-3 py-2 rounded"/>
              <input type="text" value={editModal.phone} onChange={(e) => setEditModal({...editModal, phone: e.target.value})} className="w-full border px-3 py-2 rounded"/>
              <input type="text" value={editModal.type} onChange={(e) => setEditModal({...editModal, type: e.target.value})} className="w-full border px-3 py-2 rounded"/>
            </div>

            <div className="flex gap-2 mt-4">
              <button onClick={handleSaveEdit} className="flex-1 bg-[#4a7c6f] text-white px-4 py-2 rounded">Save</button>
              <button onClick={() => setEditModal(null)} className="flex-1 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default RecentInquiry;
