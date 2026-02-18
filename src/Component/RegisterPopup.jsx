import React, { useState } from "react";
import axios from "axios";


const RegisterPopup = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // NEW

  if (!isOpen) return null;

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
        "http://localhost:5000/api/auth/register",
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

      // Reset form
      setFullName("");
      setEmail("");
      setMobile("");
      setPassword("");
      setConfirmPassword("");

      onClose();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center 
                    bg-black/60 backdrop-blur-md z-50 overflow-hidden">

      {/* CYBERPUNK NEON BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[450px] h-[450px] bg-purple-600/40 blur-[150px] rounded-full animate-pulse -top-32 -left-20"></div>
        <div className="absolute w-[500px] h-[500px] bg-blue-500/40 blur-[160px] rounded-full animate-ping top-40 -right-32"></div>
        <div className="absolute w-[350px] h-[350px] bg-cyan-400/30 blur-[120px] rounded-full animate-pulse bottom-10 left-1/3"></div>
      </div>

      {/* MAIN CARD */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 
                      shadow-[0_0_40px_rgba(0,200,255,0.4)] 
                      w-11/12 max-w-sm px-6 py-6 rounded-3xl rounded-bl-[60px]
                      animate-[popupShow_0.6s_ease]">

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-2xl font-bold text-white hover:text-pink-400 transition cursor-pointer"
        >
          ×
        </button>

        <h2 className="text-2xl font-extrabold text-center mb-4 
                       bg-linear-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          Register Now
        </h2>

        <form className="text-white" onSubmit={handleSubmit}>

          <label className="block mt-2 text-xs font-semibold neon-label">FULL NAME</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 text-sm rounded-xl bg-white/10 border border-cyan-400/40 text-white outline-none mt-1 neon-input"
            placeholder="Enter full name"
            required
          />

          <label className="block mt-3 text-xs font-semibold neon-label">EMAIL (GMAIL)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 text-sm rounded-xl bg-white/10 border border-purple-400/40 text-white outline-none mt-1 neon-input"
            placeholder="example@gmail.com"
            required
          />

          <label className="block mt-3 text-xs font-semibold neon-label">MOBILE NUMBER</label>
          <div className="flex gap-2 mt-1">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="p-2 text-sm rounded-xl bg-white/10 border border-cyan-400/40 text-white outline-none neon-input"
            >
              <option className="bg-amber-950" value="+91">+91</option>
              <option className="bg-amber-950" value="+1">+1</option>
              <option className="bg-amber-950" value="+44">+44</option>
              <option className="bg-amber-950" value="+61">+61</option>
            </select>

            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="flex-1 p-2 text-sm rounded-xl bg-white/10 border border-cyan-400/40 text-white outline-none neon-input"
              placeholder="1234567890"
              required
            />
          </div>

          <label className="block mt-3 text-xs font-semibold neon-label">CREATE PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 text-sm rounded-xl bg-white/10 border border-purple-400/40 text-white outline-none mt-1 neon-input"
            placeholder="Enter password"
            required
          />

          <label className="block mt-3 text-xs font-semibold neon-label">RE-ENTER PASSWORD</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 text-sm rounded-xl bg-white/10 border border-cyan-400/40 text-white outline-none mt-1 neon-input"
            placeholder="Re-enter password"
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-2 text-sm rounded-full font-semibold
                       bg-linear-to-r from-purple-500 to-cyan-500
                       shadow-[0_0_15px_rgba(170,50,255,0.8)]
                       hover:shadow-[0_0_25px_rgba(0,200,255,0.9)]
                       transition-all neon-button cursor-pointer"
          >
            {loading ? "Registering..." : "REGISTER NOW"}
          </button>

        </form>
      </div>

      <style>{`
        @keyframes popupShow {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .neon-input:hover { box-shadow: 0 0 12px rgba(0, 200, 255,0.5); }
        .neon-label { text-shadow: 0 0 6px rgba(0, 200, 255,0.6); }
        .neon-button:hover { transform: translateY(-2px); }
      `}</style>
    </div>
  );
};

export default RegisterPopup;
