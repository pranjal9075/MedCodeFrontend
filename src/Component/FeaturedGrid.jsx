import React from "react";
import { motion } from "framer-motion";

const features = [
  { title: "Certified & Experienced Instructors", icon: "📄", bg: "bg-indigo-100" },
  { title: "Gold Membership & Post Training Follow-ups", icon: "🏆", bg: "bg-emerald-100" },
  { title: "Tailor Made Training", icon: "🎓", bg: "bg-rose-100" },
  { title: "Flexible Schedule", icon: "⏰", bg: "bg-pink-200" },
  { title: "Access to the Recorded Sessions", icon: "💼", bg: "bg-teal-200" },
  { title: "10 in 1 Program", icon: "📣", bg: "bg-yellow-200" },
  { title: "Masterclasses By medcode.tech®", icon: "📊", bg: "bg-lime-200" },
  { title: "One-to-One Training", icon: "👤", bg: "bg-purple-200" },
];

// Parent: stagger
const container = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, duration: 0.6, ease: "easeOut" },
  },
};

// Each card animation
const itemAnim = {
  hidden: { opacity: 0, scale: 0.7, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const FeaturesGrid = () => {
  return (
    <div className="py-12 px-5 md:px-14 bg-linear-to-b from-white to-gray-50">

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        {features.map((item, i) => (
          <motion.div
            key={i}
            variants={itemAnim}
            whileHover={{
              scale: 1.08,
              rotateX: 8,
              rotateY: -8,
              boxShadow: "0px 15px 40px rgba(0,0,0,0.18)",
            }}
            whileTap={{
              scale: 0.96,
              rotateX: -5,
              boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
            }}
            transition={{ type: "spring", stiffness: 180, damping: 12 }}
            className={`flex flex-col items-center rounded-2xl p-4 md:p-7 
              cursor-pointer shadow-sm ${item.bg}
              hover:shadow-purple-300/40
              transform-gpu relative`}
          >
            {/* Soft glow (only on hover) */}
            <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-20 transition-all duration-300 bg-white"></div>

            {/* Floating Icon */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-4xl md:text-5xl mb-3"
            >
              {item.icon}
            </motion.div>

            <h3 className="text-sm md:text-lg font-semibold text-gray-800 text-center leading-tight drop-shadow-sm">
              {item.title}
            </h3>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
};

export default FeaturesGrid;
