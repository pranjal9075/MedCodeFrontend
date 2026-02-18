import React from "react";
import { assets } from "../assets/assets";

const learners = [
  { img: assets.deloitte, company: "Deloitte" },
  { img: assets.deloitte, company: "Koo App" },
  { img: assets.cutFit, company: "Cult.fit" },
  { img: assets.excel , company: "Excel" },
  { img: assets.Barclays, company: "Barclays" },
  { img: assets.wipro, company: "Wipro" },
  { img: assets.concentrax, company: "Concentrix" },
  { img: assets.schneider, company: "Schneider" },
  { img: assets.xerox, company: "Xerox" },
];

// Duplicate the list so it loops seamlessly
const doubledLearners = [...learners, ...learners];

const PlacedLearners = () => {
  return (
    <div className="bg-gray-50 py-10 md:px-20 px-6 overflow-hidden">
      <h2 className="text-center text-3xl font-bold text-purple-800 mb-10">
        Placed Learners
      </h2>

      <div className="relative w-full overflow-hidden">
        {/* Slider container */}
        <div className="flex animate-slide gap-9">
          {doubledLearners.map((learner, index) => (
            <div
              key={index}
              className=" p-4  shrink-0 flex flex-col items-center  "
            >
              <img
                src={learner.img}
                alt={learner.company}
                className="w-24 h-35 object-cover rounded-lg mb-2"
              />
              
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default PlacedLearners;
