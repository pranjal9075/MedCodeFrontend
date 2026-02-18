import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const testimonials = [
  {
    img: assets.AditiMam,
    name: "Aditi Khade",
    text: `"I am happy to say that I am hooked when I become a successful medical coder. This course would have been helpful in reconsideration."`,
    role: "Medical Codes Developer",
    Experience:"6+ Years Experience",
  },
  {
    img: assets.VaibhavSir,
    name: "Vaibhav Jadhav",
    text: `"This course would have been helpful in reconsideration. I am happy to say that I am hooked when I become a successful medical coder."`,
    role: "Medical Codes Developer",
    Experience:"6+ Years Experience",
  },
  {
    img: assets.BhagyashreeMam,
    name: "Bhagyashree Patil",
    text: `"It really is an honor to receive my certification, once I completed the course from medcode.tech® institute."`,
    role: "Medical Coder",
    Experience:"6+ Years Experience",
  },
  {
    img: assets.lekharajSir,
    name: "Lekhraj Patil",
    text: `"This course was extraordinary for assisting me with choosing if I needed to be a medical coder. Thanks to medcode.tech"`,
    role: "Developer",
    Experience:"6+ Years Experience",
  },
];

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  const visible = [
    testimonials[index],
    testimonials[(index + 1) % testimonials.length],
    testimonials[(index + 2) % testimonials.length],
  ];

  return (
    <section className="bg-linear-to-r from-blue-50 via-white to-blue-50 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-12 text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-500 to-pink-500 drop-shadow-lg">
          Join medcode.tech® Community of 41,000+ Professionals
        </h1>

        {/* ONLY ONE CHANGE HERE ↓↓↓ */}
        <div className="flex justify-center gap-6 overflow-hidden">
        {/* ↑ flex-wrap काढले आहे */}

          {visible.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden w-80 shrink-0 
              transform hover:scale-105 transition-all duration-500 
              opacity-0 animate-fade-slide"
            >
              <div className="w-full h-56 bg-white flex justify-center items-center overflow-hidden">
                <img
                  src={t.img}
                  alt={t.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div className="bg-yellow-50 p-6 flex flex-col justify-between min-h-36">
                <p className="text-gray-700 text-sm leading-relaxed italic">
                  {t.text}
                </p>
                <p className="text-[#C94E00] font-semibold text-lg mt-2">- {t.name}</p>
                <p className="text-gray-400 text-xs leading-relaxed italic">
                  {t.Experience}
                </p>
              </div>

              <div className="bg-amber-700 text-white py-3 font-medium text-sm uppercase tracking-wide text-center">
                {t.role}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .animate-fade-slide {
            animation: fadeSlide 0.6s ease-in-out forwards;
          }
          @keyframes fadeSlide {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0px); }
          }
        `}
      </style>
    </section>
  );
};

export default TestimonialSlider;
