import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

const RegisterPopup = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;


  

  // 🔥 REGISTER
  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!fullName || !email || !mobile || !password || !confirmPassword) {
      alert("Please fill out all fields!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/api/auth/register`,
        {
          fullName,
          email,
          countryCode,
          mobile,
          password,
        }
      );

      alert(res.data.message || "Registered Successfully!");

      localStorage.setItem("isUserRegistered", "true");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      onClose();

    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-md z-50">

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 
                      w-11/12 max-w-sm px-6 py-6 rounded-3xl">

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-2xl text-white"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Register Now
        </h2>

        <form className="text-white" onSubmit={handleSubmit}>

          {/* FULL NAME */}
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 mb-2 rounded-xl bg-white/10 border border-cyan-400/40"
            placeholder="Full Name"
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailVerified(false);
              setOtpSent(false);
            }}
            className="w-full p-2 rounded-xl bg-white/10 border border-purple-400/40"
            placeholder="example@gmail.com"
            required
          />


          {/* MOBILE */}
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full p-2 mt-3 rounded-xl bg-white/10 border border-cyan-400/40"
            placeholder="Mobile Number"
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-3 rounded-xl bg-white/10 border border-purple-400/40"
            placeholder="Password"
            required
          />

          {/* CONFIRM PASSWORD */}
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 mt-3 rounded-xl bg-white/10 border border-cyan-400/40"
            placeholder="Confirm Password"
            required
          />

          {/* REGISTER BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
          >
            {loading ? "Registering..." : "REGISTER NOW"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default RegisterPopup;