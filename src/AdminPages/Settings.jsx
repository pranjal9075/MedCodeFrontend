import React, { useState, useEffect } from "react";

const Settings = ({ adminProfile, setAdminProfile }) => {

  const API = "http://localhost:5000/api/admin-profile";

  const [profile, setProfile] = useState({
    name: adminProfile?.name || "Admin User",
    email: "admin@medcode.com",
    phone: "+1 234 567 8900",
    password: "admin123",
    avatar:
      adminProfile?.avatar ||
      "https://ui-avatars.com/api/?name=Admin+User&background=4a7c6f&color=fff&size=200",
  });

  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile });
  const [avatarFile, setAvatarFile] = useState(null);

  /*
  ==============================
        LOAD ADMIN PROFILE
  ==============================
  */

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setProfile(data.data);
          setTempProfile(data.data);

          if (setAdminProfile) {
            setAdminProfile({
              name: data.data.name,
              avatar: data.data.avatar,
            });
          }
        }
      })
      .catch((err) => console.log("Profile Load Error:", err));
  }, []);

  /*
  ==============================
            EDIT
  ==============================
  */

  const handleEdit = () => {
    setTempProfile({ ...profile });
    setEditMode(true);
  };

  /*
  ==============================
            SAVE (API)
  ==============================
  */

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("name", tempProfile.name);
      formData.append("email", tempProfile.email);
      formData.append("phone", tempProfile.phone);
      formData.append("password", tempProfile.password);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const res = await fetch(`${API}/1`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        // If new image uploaded → backend returns URL
        const updatedAvatar =(data.avatar || tempProfile.avatar) + "?t=" + Date.now();

        const updatedProfile = {
          ...tempProfile,
          avatar: updatedAvatar,
        };

        setProfile(updatedProfile);
        setTempProfile(updatedProfile);

        if (setAdminProfile) {
          setAdminProfile({
            name: updatedProfile.name,
            avatar: updatedProfile.avatar,
          });
        }

        setEditMode(false);
        alert("Profile updated successfully!");
      }
    } catch (err) {
      console.log("Update Error:", err);
      alert("Update failed!");
    }
  };

  /*
  ==============================
            CANCEL
  ==============================
  */

  const handleCancel = () => {
    setTempProfile({ ...profile });
    setEditMode(false);
  };

  /*
  ==============================
        IMAGE UPLOAD
  ==============================
  */

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setAvatarFile(file);

      // preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfile((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#4a7c6f] to-[#5a8c7f] bg-clip-text text-transparent flex items-center gap-2">
        <span className="animate-spin" style={{ animationDuration: "3s" }}>
          ⚙️
        </span>{" "}
        Admin Settings
      </h2>

      <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 max-w-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <h3 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-[#4a7c6f] to-[#5a8c7f] bg-clip-text text-transparent">
            Profile Information
          </h3>
          {!editMode && (
            <button
              onClick={handleEdit}
              className="bg-gradient-to-r from-[#4a7c6f] to-[#5a8c7f] text-white px-3 md:px-4 py-2 rounded-xl text-sm md:text-base hover:shadow-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              ✏️ Edit Profile
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mb-6 pb-6 border-b">
          <div className="relative group">
            <img
              src={editMode ? tempProfile.avatar : profile.avatar}
              alt="Profile"
              className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-[#4a7c6f] shadow-lg group-hover:scale-110 transition-transform duration-300"
            />
            {editMode && (
              <label className="absolute bottom-0 right-0 bg-gradient-to-r from-[#4a7c6f] to-[#5a8c7f] text-white p-1.5 md:p-2 rounded-full cursor-pointer hover:scale-110 transition-all duration-300 text-sm md:text-base shadow-lg">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                📷
              </label>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-[#4a7c6f] to-[#5a8c7f] bg-clip-text text-transparent">
              {profile.name}
            </h4>
          </div>
        </div>

        <div className="space-y-4">
          {["name", "email", "phone", "password"].map((field) => (
            <div key={field}>
              <label className="block text-xs md:text-sm font-medium mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>

              {editMode ? (
                <input
                  type={field === "password" ? "password" : "text"}
                  value={tempProfile[field]}
                  onChange={(e) =>
                    setTempProfile({
                      ...tempProfile,
                      [field]: e.target.value,
                    })
                  }
                  className="w-full border-2 border-gray-200 px-3 py-2 rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#4a7c6f] focus:border-transparent transition-all"
                />
              ) : (
                <p className="text-gray-700 bg-gradient-to-r from-gray-50 to-blue-50 px-3 py-2 rounded-xl text-sm md:text-base">
                  {field === "password"
                    ? "••••••••"
                    : profile[field]}
                </p>
              )}
            </div>
          ))}
        </div>

        {editMode && (
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-[#4a7c6f] to-[#5a8c7f] text-white px-4 py-2 rounded-xl text-sm md:text-base hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              ✔️ Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-xl text-sm md:text-base hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              ❌ Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
