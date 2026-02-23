// import React, { useState } from "react";

// const LoginPopup = ({ isOpen, onClose, onSwitchToRegister }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   if (!isOpen) return null;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       alert("Please fill out all fields!");
//       return;
//     }
//     localStorage.setItem("isLoggedIn", "true");
//     localStorage.setItem("user", email);
//     window.dispatchEvent(new Event("authChanged"));
//     alert(`Login Successful!\nEmail: ${email}`);
//     setEmail("");
//     setPassword("");
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-md z-50 overflow-hidden">
//       <div className="absolute inset-0 -z-10 overflow-hidden">
//         <div className="absolute w-[450px] h-[450px] bg-purple-600/40 blur-[150px] rounded-full animate-pulse -top-32 -left-20"></div>
//         <div className="absolute w-[500px] h-[500px] bg-blue-500/40 blur-[160px] rounded-full animate-ping top-40 -right-32"></div>
//         <div className="absolute w-[350px] h-[350px] bg-cyan-400/30 blur-[120px] rounded-full animate-pulse bottom-10 left-1/3"></div>
//       </div>

//       <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(0,200,255,0.4)] w-11/12 max-w-md px-8 py-10 rounded-3xl rounded-bl-[60px] animate-[popupShow_0.6s_ease]">
//         <button onClick={onClose} className="absolute top-3 right-4 text-3xl font-bold text-white hover:text-pink-400 transition cursor-pointer">
//           ×
//         </button>

//         <h2 className="text-3xl font-extrabold text-center mb-7 bg-linear-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
//           Login
//         </h2>

//         <form className="text-white" onSubmit={handleSubmit}>
//           <label className="block mt-3 text-sm font-semibold neon-label">EMAIL</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-xl bg-white/10 border border-purple-400/40 text-white outline-none mt-1 neon-input" placeholder="example@gmail.com" required />

//           <label className="block mt-5 text-sm font-semibold neon-label">PASSWORD</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded-xl bg-white/10 border border-cyan-400/40 text-white outline-none mt-1 neon-input" placeholder="Enter password" required />

//           <button type="submit" className="w-full mt-6 py-3 rounded-full font-semibold bg-linear-to-r from-purple-500 to-cyan-500 shadow-[0_0_15px_rgba(170,50,255,0.8)] hover:shadow-[0_0_25px_rgba(0,200,255,0.9)] transition-all neon-button cursor-pointer">
//             LOGIN
//           </button>

//           <p className="text-center text-white text-sm mt-4">
//             Don't have an account?{" "}
//             <span onClick={onSwitchToRegister} className="text-cyan-400 cursor-pointer underline">
//               Register here
//             </span>
//           </p>
//         </form>
//       </div>

//       <style>{`
//         @keyframes popupShow {
//           0% { transform: scale(0.7); opacity: 0; }
//           100% { transform: scale(1); opacity: 1; }
//         }
//         .neon-input:hover { box-shadow: 0 0 12px rgba(0, 200, 255,0.5); }
//         .neon-label { text-shadow: 0 0 6px rgba(0, 200, 255,0.6); }
//         .neon-button:hover { transform: translateY(-2px); }
//       `}</style>
//     </div>
//   );
// };

// export default LoginPopup;
import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

const LoginPopup = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill out all fields!");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      // ✅ Save token
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      window.dispatchEvent(new Event("authChanged"));

      alert(response.data.message);

      setEmail("");
      setPassword("");
      onClose();

    } catch (error) {
      alert(
        error.response?.data?.message || "Server not responding"
      );
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-md z-50 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[450px] h-[450px] bg-purple-600/40 blur-[150px] rounded-full animate-pulse -top-32 -left-20"></div>
        <div className="absolute w-[500px] h-[500px] bg-blue-500/40 blur-[160px] rounded-full animate-ping top-40 -right-32"></div>
        <div className="absolute w-[350px] h-[350px] bg-cyan-400/30 blur-[120px] rounded-full animate-pulse bottom-10 left-1/3"></div>
      </div>

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(0,200,255,0.4)] w-11/12 max-w-md px-8 py-10 rounded-3xl rounded-bl-[60px] animate-[popupShow_0.6s_ease]">
        <button onClick={onClose} className="absolute top-3 right-4 text-3xl font-bold text-white hover:text-pink-400 transition cursor-pointer">
          ×
        </button>

        <h2 className="text-3xl font-extrabold text-center mb-7 bg-linear-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          Login
        </h2>

        <form className="text-white" onSubmit={handleSubmit}>
          <label className="block mt-3 text-sm font-semibold neon-label">EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/10 border border-purple-400/40 text-white outline-none mt-1 neon-input"
            placeholder="example@gmail.com"
            required
          />

          <label className="block mt-5 text-sm font-semibold neon-label">PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/10 border border-cyan-400/40 text-white outline-none mt-1 neon-input"
            placeholder="Enter password"
            required
          />

          <button
            type="submit"
            className="w-full mt-6 py-3 rounded-full font-semibold bg-linear-to-r from-purple-500 to-cyan-500 shadow-[0_0_15px_rgba(170,50,255,0.8)] hover:shadow-[0_0_25px_rgba(0,200,255,0.9)] transition-all neon-button cursor-pointer"
          >
            LOGIN
          </button>

          <p className="text-center text-white text-sm mt-4">
            Don't have an account?{" "}
            <span onClick={onSwitchToRegister} className="text-cyan-400 cursor-pointer underline">
              Register here
            </span>
          </p>
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

export default LoginPopup;

