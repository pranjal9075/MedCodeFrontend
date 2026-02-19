import React, { useState } from "react";
import axios from "axios";

const Settings = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handlePasswordChange = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      "http://localhost:5000/api/change-password",
      {
        currentPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // VERY IMPORTANT
        },
      }
    );

    alert(response.data.message);
  } catch (error) {
    alert(error.response?.data?.message || "Error");
  }
};


  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4C34A5] to-[#7C3AED] text-white px-5 py-3 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-xl font-bold">Change Password</h2>
          <button onClick={onClose} className="text-3xl hover:text-gray-200 transition">×</button>
        </div>

        {/* Password Change Content */}
        <div className="p-5">
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg border-purple-300 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg border-purple-300 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg border-purple-300 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <button
              onClick={handlePasswordChange}
              disabled={loading}
              className="w-full bg-[#4C34A5] text-white px-4 py-2.5 rounded-lg hover:bg-[#3d2a85] transition disabled:opacity-50 font-semibold mt-2"
            >
              {loading ? "Changing..." : "🔒 Change Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
