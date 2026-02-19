import React, { useState } from "react";

const AdminLogin = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/admin-profile/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ Store admin data
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("adminData", JSON.stringify(data.admin));

      alert("Admin Login Successful!");

      if (onLoginSuccess) onLoginSuccess();
      onClose();

    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-md z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#4C34A5]">
            Admin Login
          </h2>
          <button
            onClick={onClose}
            className="text-3xl text-gray-500 hover:text-red-500"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded mb-3"
            placeholder="admin@gmail.com"
            required
          />

          <label className="block text-sm font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded mb-4"
            placeholder="Enter password"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4C34A5] text-white py-2 rounded hover:bg-[#3a268a]"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
