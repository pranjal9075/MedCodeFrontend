// src/Components/SocialIcons.jsx

import React from "react";
import { assets } from "../assets/assets";


const SocialIcons = () => {
  return (
    <div className="fixed left-4 bottom-12 flex flex-col gap-4 z-50">

      {/* WhatsApp Icon */}
      <a 
        href="https://wa.me/9545450788" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <img 
          src={assets.WhatsAppImg1} 
          alt="WhatsApp" 
          className="w-12 h-12 rounded-full shadow-lg border bg-white border-gray-300 hover:scale-110 transition-all cursor-pointer"
        />
      </a>

      {/* Instagram Icon */}
      <a 
        href="https://instagram.com" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <img 
          src={assets.instagramImg} 
          alt="Instagram" 
          className="w-12 h-12 rounded-full shadow-lg border border-gray-300 hover:scale-110 transition-all cursor-pointer"
        />
      </a>

    </div>
  );
};

export default SocialIcons;
