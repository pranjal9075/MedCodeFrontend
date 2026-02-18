import React, { useEffect, useRef, useState } from "react";
import CountUp from "./CountUp";

const stats = [
  { number: 41000, text: "Trained", color: "bg-yellow-100 text-orange-600" },
  { number: 5600, text: "Reviews with 4.5/5 rating", color: "bg-red-100 text-red-600" },
  { number: 4000, text: "Live Classes Every Month", color: "bg-blue-100 text-blue-700" },
  { number: 302, text: "Corporate Partners", color: "bg-purple-100 text-purple-600" },
  { number: 180, text: "College Partners", color: "bg-green-100 text-green-600" },
  { number: 96, text: "Reported Career Benefits", color: "bg-sky-100 text-sky-700" },
];

const WhyMed = () => {
  const sectionRef = useRef();
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTrigger((prev) => prev + 1); // increase to trigger animation every time
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="bg-white py-10 px-6">
      <div className="max-w-7xl mx-auto text-center">

        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Why medcode.tech<span className="text-purple-600">®</span>?
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          medcode.tech Ranks….
        </p>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {stats.map((item, index) => (
            <div key={index} className="bg-white border p-6 rounded-xl shadow-sm flex flex-col items-center">

              <div className={`w-24 h-24 flex items-center justify-center rounded-full mb-4 ${item.color}`}>
                <span className="text-2xl font-bold">
                  <CountUp end={item.number} duration={1800} trigger={trigger} />+
                </span>
              </div>

              <p className="text-gray-700 font-medium text-center">{item.text}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default WhyMed;
