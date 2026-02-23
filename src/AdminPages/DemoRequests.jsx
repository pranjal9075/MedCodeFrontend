import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { API_URL } from "../config";

const DemoRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewModal, setViewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const itemsPerPage = 4;
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/demo-requests`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
      })
      .catch((err) => console.log("Fetch Error:", err));
  }, []);

  const filteredData = requests.filter(
    (r) =>
      r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      
      doc.setFontSize(20);
      doc.text("Demo Requests", 14, 20);
      
      autoTable(doc, {
        startY: 30,
        head: [["Email", "Mobile", "Date/Time"]],
        body: filteredData.map(r => [r.email, r.phone, r.created_at]),
        didDrawPage: (data) => {
          doc.setFontSize(10);
          doc.setTextColor(200);
          doc.text("medcode.tech", data.settings.margin.left, doc.internal.pageSize.height - 10);
        }
      });
      
      doc.save("demo-requests.pdf");
    } catch (error) {
      console.error("PDF Error:", error);
      alert("Failed to generate PDF");
    }
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // DELETE
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete?")) return;

  try {
    const res = await fetch(
      `${API_URL}/api/demo-requests/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (data.success) {
      setRequests(requests.filter((r) => r.id !== id));
    }
  } catch (error) {
    console.log("Delete Error:", error);
  }
};

// OPEN EDIT MODAL
const handleEdit = (req) => {
  setEditModal(req);
};

// SAVE EDIT
const handleSaveEdit = async () => {
  try {
    const res = await fetch(
      `${API_URL}/api/demo-requests/${editModal.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: editModal.email,
          country_code: editModal.country_code,
          phone: editModal.phone,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setRequests(
        requests.map((r) =>
          r.id === editModal.id ? editModal : r
        )
      );
      setEditModal(null);
    }
  } catch (error) {
    console.log("Update Error:", error);
  }
};


  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#4a7c6f] to-[#5a8c7f] bg-clip-text text-transparent flex items-center gap-2">
        <span className="animate-bounce">🎯</span> Demo Requests
      </h2>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="border px-3 md:px-4 py-2 rounded w-full lg:w-64 text-sm md:text-base"
        />
        <div className="flex flex-wrap gap-2 md:gap-4 items-center text-xs md:text-sm">
          <button onClick={exportToPDF} className="border px-2 md:px-4 py-2 rounded text-xs md:text-sm hover:bg-gray-100">
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm">Email</th>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm">Mobile</th>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm">Date / Time</th>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((req) => (
                <tr key={req.id} className="border-b hover:bg-gray-50 transition-all">
                  <td className="p-2 md:p-3 text-xs md:text-sm truncate max-w-[150px]">{req.email}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm">{req.phone}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm">{req.created_at}</td>
                  <td className="p-2 md:p-3 flex gap-1 md:gap-2">
                    <button onClick={() => setViewModal(req)} className="bg-blue-500 text-white px-2 md:px-3 py-1 rounded text-xs hover:bg-blue-600">👁️</button>
                    <button onClick={() => handleEdit(req)} className="bg-[#4a7c6f] text-white px-2 md:px-3 py-1 rounded text-xs hover:bg-[#3d6659]">✏️</button>
                    <button onClick={() => handleDelete(req.id)} className="bg-red-500 text-white px-2 md:px-3 py-1 rounded text-xs hover:bg-red-600">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 md:p-4 flex flex-col sm:flex-row justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-2 md:px-3 py-1 border rounded text-xs md:text-sm disabled:opacity-50"
          >
            &lt; Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-2 md:px-3 py-1 rounded text-xs md:text-sm ${
                currentPage === i + 1 ? "bg-[#4a7c6f] text-white" : "border"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-2 md:px-3 py-1 border rounded text-xs md:text-sm disabled:opacity-50"
          >
            Next &gt;
          </button>
        </div>
      </div>

      {viewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setViewModal(null)}>
          <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg md:text-xl font-bold mb-4">Demo Request Details</h3>
            <div className="space-y-3 text-sm md:text-base">
              <p><strong>Email:</strong> {viewModal.email}</p>
              <p><strong>Mobile:</strong> {viewModal.phone}</p>
              <p><strong>Date:</strong> {viewModal.created_at}</p>
            </div>
            <button onClick={() => setViewModal(null)} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded w-full">Close</button>
          </div>
        </div>
      )}

      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setEditModal(null)}>
          <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg md:text-xl font-bold mb-4">Edit Demo Request</h3>
            <div className="space-y-3">
              <input type="email" value={editModal.email} onChange={(e) => setEditModal({...editModal, email: e.target.value})} className="w-full border px-3 py-2 rounded" />
              <input type="text" value={editModal.phone} onChange={(e) => setEditModal({...editModal, phone: e.target.value})} className="w-full border px-3 py-2 rounded" />
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

export default DemoRequests;
