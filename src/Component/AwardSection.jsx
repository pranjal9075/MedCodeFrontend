import React, { useEffect, useRef, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { assets } from "../assets/assets";

const awards = [
  { img: assets.award1 },
  { img: assets.award2 },
  { img: assets.award3 },
  { img: assets.award4 },
];

const AwardsSection = () => {
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);
  const [hoverExplosion, setHoverExplosion] = useState(null);

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll("[data-award]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-award");
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...prev, id]);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-12 px-6">
      <div
        ref={containerRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center"
      >
        {awards.map((award, index) => {
          const isVisible = visibleItems.includes(String(index));

          return (
            <div
              key={index}
              data-award={index}
              className={`relative bg-white p-4 w-full md:w-64 flex flex-col items-center rounded-2xl 
                shadow-lg transition-all duration-700 ease-out transform select-none
                ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-75"}
                hover:shadow-2xl hover:-translate-y-2 hover:brightness-110
              `}
              style={{ perspective: "800px" }}
              onMouseEnter={() => setHoverExplosion(index)}
              onMouseLeave={(e) => {
                setHoverExplosion(null);
                e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = (y - rect.height / 2) / 18;
                const rotateY = (rect.width / 2 - x) / 18;
                e.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
              }}
            >
              {/* Confetti Blast */}
              {hoverExplosion === index && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-50">
                  <ConfettiExplosion
                    force={0.6}
                    duration={2200}
                    particleCount={80}
                    width={400}
                  />
                </div>
              )}

              <img
                src={award.img}
                alt={`award-${index}`}
                className="w-full h-40 object-contain mb-4 drop-shadow-xl"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AwardsSection;
