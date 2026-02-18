// PopupForm.jsx
import React from "react";
import { assets } from "../assets/assets";

const PopupForm = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/30">
      {/* Form container */}
      <div className="relative w-11/12 max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-linear-to-r from-[#4C34A5] to-[#6C63FF] p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white text-2xl font-bold hover:text-gray-200 transition cursor-pointer"
          >
            ×
          </button>
          <div className="flex justify-center mb-2">
            <img src={assets.logo} alt="logo" className="h-12" />
          </div>
          <p className="text-center text-white text-sm font-medium">
            <span className="text-2xl">👋</span> Get 10-Min Counselling worth <del>$25</del> FREE!
          </p>
        </div>

        {/* Form */}
        <form className="p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="email"
              required
              placeholder="Email"
              className="peer w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#4C34A5] transition"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-[#4C34A5] peer-focus:text-sm bg-white px-1 transition"
            >
              Email
            </label>
          </div>

          {/* Phone */}
          <div className="flex gap-2">
            <select className="w-1/3 px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4C34A5] outline-none">
              <option value="+91">India +91</option>
              <option value="+1">USA +1</option>
              <option value="+44">UK +44</option>
              <option value="+92">Pakistan +92</option>
              <option value="+61">Australia +61</option>
              <option value="+81">Japan +81</option>
              <option value="+49">Germany +49</option>
            </select>
            <div className="relative w-2/3">
              <input
                type="text"
                id="phone"
                required
                placeholder="Phone"
                className="peer w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#4C34A5] transition"
              />
              <label
                htmlFor="phone"
                className="absolute left-4 top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-[#4C34A5] peer-focus:text-sm bg-white px-1 transition"
              >
                Phone
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white text-lg font-semibold bg-linear-to-r from-[#4C34A5] to-[#6C63FF] hover:scale-105 transform transition cursor-pointer"
          >
            SUBMIT
          </button>

          <p className="text-center text-gray-500 text-xs mt-2">
            Our Career Advisor will call you shortly
          </p>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
