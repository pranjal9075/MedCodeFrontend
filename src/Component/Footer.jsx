import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  const handleScroll = () => {
    const section = document.getElementById("targetdiv");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-white text-gray-800">

      {/* =============== TOP OFFICE SECTION =============== */}
      <div className="max-w-[1200px] mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Pimple Saudagar */}
        <div>
          <h3 className="font-semibold text-sm flex items-center gap-2">
            MedCode.tech Head Office, Pimple Saudagar:
          </h3>
          <p className="text-sm mt-2 leading-relaxed flex items-start gap-2">
            <img src={assets.mapIcon} alt="Location Icon" className="w-5 h-5 mt-1"/>
            Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/18-21/24, BRTS Road, Pune-411027
          </p>
          <p className="text-sm mt-1 flex items-center gap-2 text-blue-600 font-medium">
            <img src={assets.phoneIcon} alt="Phone Icon" className="w-5 h-5"/>
            <span>
              <a href="tel:+919545450788">+91 9545450788</a> <span className="text-black">/</span> 
              <a href="tel:+9195450677">+91 9545450677</a>
            </span>
          </p>
        </div>

        {/* Akola */}
        <div>
          <h3 className="font-semibold text-sm flex items-center gap-2">
            MedCode.tech Office Akola:
          </h3>
          <p className="text-sm mt-2 leading-relaxed flex items-start gap-2">
            <img src={assets.mapIcon} alt="Location Icon" className="w-5 h-5 mt-1"/>
            A-45, Collector colony, Near ST stand, ITI Road, Akola
          </p>
          <p className="text-sm mt-1 flex items-center gap-2 text-blue-600 font-medium">
            <img src={assets.phoneIcon} alt="Phone Icon" className="w-5 h-5"/>
            <span>
              <a href="tel:+919545450788">+91 954545450788</a> <span className="text-black">/</span> 
              <a href="tel:+9195450677">+91 9545450677</a>
            </span>
          </p>
        </div>

        {/* Wagholi */}
        <div>
          <h3 className="font-semibold text-sm flex items-center gap-2">
            MedCode.tech Office Wagholi:
          </h3>
          <p className="text-sm mt-2 leading-relaxed flex items-start gap-2">
            <img src={assets.mapIcon} alt="Location Icon" className="w-5 h-5 mt-1"/>
            502 Radheeshwari Nagar, Bakori Road, Wagholi
          </p>
          <p className="text-sm mt-1 flex items-center gap-2 text-blue-600 font-medium">
            <img src={assets.phoneIcon} alt="Phone Icon" className="w-5 h-5"/>
            <span>
              <a href="tel:+919545450788">+91 9545450788</a> <span className="text-black">/</span> 
              <a href="tel:+9195450677">+91 9545450677</a>
            </span>
          </p>
        </div>

        {/* Manchar */}
        <div>
          <h3 className="font-semibold text-sm flex items-center gap-2">
            MedCode.tech Office Manchar:
          </h3>
          <p className="text-sm mt-2 leading-relaxed flex items-start gap-2">
            <img src={assets.mapIcon} alt="Location Icon" className="w-5 h-5 mt-1"/>
            Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/18-21/24, BRTS Road, Pune-411027
          </p>
          <p className="text-sm mt-1 flex items-center gap-2 text-blue-600 font-medium">
            <img src={assets.phoneIcon} alt="Phone Icon" className="w-5 h-5"/>
            <span>
              <a href="tel:+919545450788">+91 9545450788</a> <span className="text-black">/</span> 
              <a href="tel:+9195450677">+91 9545450677</a>
            </span>
          </p>
        </div>

      </div>

      {/* =============== ISO BUTTONS =============== */}
      <div className="flex flex-wrap justify-center gap-6 pb-8">
        <button className="bg-[#5A1BBF] text-white px-8 py-3 rounded-full font-semibold cursor-text">
          ISO 9001:2015
        </button>

        <button className="bg-[#5A1BBF] text-white px-8 py-3 rounded-full font-semibold cursor-text">
          ISO/IEC 27001:2013
        </button>
      </div>

      {/* =============== COPYRIGHT =============== */}
      <div className="text-center text-sm text-gray-700 pb-16">
        © 2013–2025 – medcode.tech® Education. All Rights Reserved.
      </div>

      {/* =============== BOTTOM STICKY BAR =============== */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <div className="flex flex-row w-full">

          {/* Left (Green Section) */}
          <a
            href="tel:+919545450788"
            className="bg-green-600 text-white flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border border-black cursor-pointer"
          >
            <img src={assets.phoneIcon} alt="abc" className="w-5 h-5" /> +91 9545450788
          </a>


          {/* Right (Yellow Section) */}
          <div
            className="bg-yellow-400 text-black flex-1 flex items-center justify-center py-3 text-sm font-semibold border border-black cursor-pointer"
            onClick={handleScroll}
          >
            📘 Free 1st Class
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
