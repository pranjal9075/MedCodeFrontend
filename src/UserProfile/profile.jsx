import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({ isOpen, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    mobile: "",
    countryCode: "+91",
  });
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      setUser({
        fullName: userData.fullName || "",
        email: userData.email || "",
        mobile: userData.mobile || "",
        countryCode: userData.countryCode || "+91",
      });
      setPhoto(userData.photo || null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
  "http://localhost:5000/api/profile",
  { ...user, photo },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      
      localStorage.setItem("user", JSON.stringify(response.data.user));
      window.dispatchEvent(new Event("authChanged"));
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4C34A5] to-[#7C3AED] text-white px-5 py-3 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-xl font-bold">My Profile</h2>
          <button onClick={onClose} className="text-3xl hover:text-gray-200 transition">×</button>
        </div>

        {/* Profile Content */}
        <div className="p-5">
          {/* Profile Picture */}
          <div className="flex justify-center mb-5">
            <div className="relative">
              {photo ? (
                <img src={photo} alt="Profile" className="w-20 h-20 rounded-full object-cover border-4 border-purple-200" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4C34A5] to-[#7C3AED] text-white flex items-center justify-center text-2xl font-bold border-4 border-purple-200">
                  {user.fullName.split(" ").map(n => n[0]).join("").toUpperCase() || "U"}
                </div>
              )}
              <label className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-lg border-2 border-purple-500 hover:bg-purple-50 transition cursor-pointer text-sm">
                📷
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
              </label>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-800 mb-3">Personal Information</h3>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={user.fullName}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                disabled={false}
                className="w-full px-3 py-2 text-sm border rounded-lg border-purple-300 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-3 py-2 text-sm border rounded-lg bg-gray-100 border-gray-200 cursor-not-allowed"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Mobile Number</label>
              <div className="flex gap-2">
                <select
                  value={user.countryCode}
                  onChange={(e) => setUser({ ...user, countryCode: e.target.value })}
                  disabled={false}
                  className="px-2 py-2 text-sm border rounded-lg border-purple-300 focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+61">+61</option>
                </select>
                <input
                  type="tel"
                  value={user.mobile}
                  onChange={(e) => setUser({ ...user, mobile: e.target.value })}
                  disabled={false}
                  className="flex-1 px-3 py-2 text-sm border rounded-lg border-purple-300 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-[#4C34A5] text-white px-5 py-2.5 rounded-lg hover:bg-[#3d2a85] transition flex items-center justify-center gap-2 disabled:opacity-50 font-semibold mt-4"
            >
              {loading ? "Saving..." : "💾 Save Changes"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
