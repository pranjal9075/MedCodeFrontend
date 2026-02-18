import React, { useState } from "react";

const Accordion = ({ title, children, bg }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${bg} py-4 px-15`}>
      <div
        className="bg-purple-900 text-white px-6 py-2 cursor-pointer flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <h3 className="text-sm font-medium">{title}</h3>
        <span className="text-xl">-</span>
      </div>

      {open && (
        <div className=" px-6 py-6 mt-2 text-gray-800">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
