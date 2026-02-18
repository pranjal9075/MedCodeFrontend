import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { programs,program } from "../assets/assets";

const Program10in1 = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: false });
  }, []);

  return (
    <section className="bg-[#F8FAFF] py-16 md:px-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-bold text-center text-[#0B0C2A] mb-12"
          data-aos="fade-up"
        >
          You get 10-in-1 Program
        </h2>

        {/* First grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {programs.map((item, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              className={`${item.color} rounded-xl p-6 relative overflow-hidden shadow-md hover:shadow-2xl hover:scale-[1.04] transition-all duration-500 cursor-pointer`}
            >
              <p className="text-sm text-[#825F5A] mb-2 font-medium">
                {item.subtitle}
              </p>
              <h3 className="text-lg font-semibold text-[#2E1E1E] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-800">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Second section */}
        <div className="max-w-full mx-auto px-2 sm:px-4 md:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
            {program.map((item, index) => (
              <div
                key={index}
                data-aos="fade-up"
                className={`${item.color} relative rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-500 flex flex-col justify-between min-h-40 cursor-pointer`}
              >
                <div>
                  <p className="text-sm text-[#4A3C31] font-medium mb-1">
                    {item.subtitle}
                  </p>
                  <h3 className="text-lg font-semibold text-[#2E1E1E] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-800">{item.desc}</p>
                </div>

                {item.img && (
                  <div className="absolute bottom-2 right-2 bg-white/50 rounded-full p-2">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-20 h-10 object-contain"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Program10in1;
