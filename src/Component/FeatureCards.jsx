import React, { useEffect, useState } from "react";

const features = [
  {
    title: "Become specialized in important aspects",
    desc: "Become specialized in important aspects of Medical Coding such as ICD-10_CM, CPT, and HCPCS",
    color: "from-red-300 to-pink-300",
  },
  {
    title: "In-depth knowledge of ICD-10 CM",
    desc: "In-depth knowledge of ICD-10 CM, coding system, and V codes, E codes",
    color: "from-gray-300 to-gray-200",
  },
  {
    title: "AAPC curriculum",
    desc: "AAPC curriculum with 15 essential learning modules.",
    color: "from-sky-300 to-indigo-300",
  },
  {
    title: "Access T.P.I.C.P.E.B.H.M feature",
    desc: "Access the T.P.I.C.P.E.B.H.M feature of Medical Coder",
    color: "from-lime-300 to-green-300",
  },
  {
    title: "1-Year Gold Membership",
    desc: "Get a 1-Year Gold Membership of Medical Academy",
    color: "from-purple-300 to-fuchsia-300",
  },
  {
    title: "100% Money-back Guarantee",
    desc: "100% Money-back Guarantee program*",
    color: "from-cyan-300 to-blue-300",
  },
];

const FeatureCards = () => {
  const [activeCard, setActiveCard] = useState(null);

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-show");
          } else {
            entry.target.classList.remove("animate-show");
          }
        });
      },
      { threshold: 0.3 }
    );

    const cards = document.querySelectorAll(".feature-card");
    cards.forEach((card) => observer.observe(card));
  }, []);

  // Click toggle for mobile
  const toggleCard = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-200 flex flex-col items-center py-16">
      <h1 className="text-3xl font-extrabold mb-12 text-gray-800 tracking-wide px-6">
        MedCode Exclusive Course Offering
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full px-6 cursor-pointer">
        {features.map((item, index) => (
          <div
            key={index}
            style={{ transitionDelay: `${index * 150}ms` }}
            className="feature-card opacity-0 translate-y-6"
          >
            <div
              className={`
                relative w-full h-[230px]
                transform transition-transform duration-700
                transform-style-preserve-3d

                /* Desktop hover */
                lg:hover:rotate-y-180

                /* Mobile click (manual flip) */
                ${activeCard === index ? "rotate-y-180" : ""}
              `}
            >
              {/* FRONT SIDE */}
              <div
                className={`
                  absolute inset-0 
                  bg-white/40 backdrop-blur-xl border border-white/60 
                  rounded-3xl p-7 shadow-lg 
                  bg-linear-to-br ${item.color}
                  flex flex-col justify-center items-center
                  backface-hidden
                `}
                onClick={() => toggleCard(index)}
              >
                <h2 className="text-xl font-bold text-gray-900 text-center">
                  {item.title}
                </h2>

                {/* MOBILE ONLY: Click Me Button */}
                <button className="mt-4 lg:hidden text-sm px-4 py-1 bg-black/70 text-white rounded-full">
                  Click Me
                </button>
              </div>

              {/* BACK SIDE */}
              <div
                className="
                  absolute inset-0 
                  bg-white/90 backdrop-blur-xl border border-white/60 
                  rounded-3xl p-7 shadow-lg 
                  flex flex-col justify-center items-center text-center
                  rotate-y-180
                  backface-hidden
                "
                onClick={() => toggleCard(index)}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Details
                </h2>
                <p className="text-gray-700">{item.desc}</p>

                {/* MOBILE ONLY: Go Back Button */}
                <button className="mt-4 lg:hidden text-sm px-4 py-1 bg-black/70 text-white rounded-full">
                  Back
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Extra CSS */}
      <style>
        {`
          .animate-show {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }
        `}
      </style>
    </div>
  );
};

export default FeatureCards;
