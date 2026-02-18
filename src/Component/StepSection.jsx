import React from "react";

const steps = [
  {
    num: "1",
    title: "Counselling and Registration",
    desc: "Consult with our counselors to check your eligibility in the right batch, and then Register for the Medical Coding Training Course",
  },
  {
    num: "2",
    title: "Complete the Medical Coding Course",
    desc: "Attend 90 hours sessions and gain 90 credits to get course completion certification from medcode.tech® Medical Academy",
  },
  {
    num: "3",
    title: "Deliver Projects Assigned",
    desc: "Gather experience with real-world assignments and practical projects to upgrade your existing skills. Deliver these mini-projects to be eligible for medcode.tech® Medical Coding Course",
  },
  {
    num: "4",
    title: "Earn Certification",
    desc: "Post-successful completion of the course, earn medcode.tech® Medical Coding Training Certification. Post it on social media, get it framed, and increase your value in the industry",
  },
];

const StepsSection = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 relative">

        {/* YELLOW LINE BEHIND CIRCLES */}
        <div className="absolute top-6 left-0 right-0">
          <div className="h-0.5 bg-[#F1B90B] w-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 text-center gap-10 relative z-10">

          {steps.map((item, i) => (
            <div key={i} className="relative pt-10">

              {/* CIRCLE NUMBER FIXED ON LINE */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 
                              w-12 h-12 flex items-center justify-center 
                              bg-white border-[3px] border-[#F1B90B] rounded-full
                              text-[#2b2b2b] font-bold text-xl">
                {item.num}
              </div>

              <h3 className="text-xl font-semibold text-[#1a1a1a] mt-6">
                {item.title}
              </h3>

              <p className="text-gray-700 text-sm leading-relaxed mt-4 px-2">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default StepsSection;
