import React, { useState } from "react";

const Curriculum = () => {
  const [openModule, setOpenModule] = useState(null);

  const toggleModule = (i) => {
    setOpenModule(openModule === i ? null : i);
  };

  const modules = [
    {
      title: "Module 1: The World of Health Care",
      topics: [
        "Daily activities in US medical facilities",
        "Responsibilities of Medical coders and Billers",
        "Career opportunities available to medical coding and billing specialists",
      ],
    },
    {
      title: "Module 2: Medical Terminology",
      topics: [
        "Introduction to Medical Terminology",
        "Medical Terminology: Dividing and Combining Terms",
        "Introduction to Medical Words",
        "Abbreviations, Symbols, and Special Terms",
        "Documentation of Medical Records",
      ],
    },
    {
      title: "Module 3: Human Anatomy and Physiology",
      topics: [
        "Introduction to the Human Body, Integumentary System, Skeletal System",
        "Muscular System",
        "Nervous System",
        "Endocrine System",
        "Cardiovascular System",
        "ICD-10-CM & Human Anatomy",
        "Blood and Blood-Forming Organs",
        "Lymphatic System",
        "Respiratory System",
        "Digestive System",
        "Urinary System",
        "Reproductive Systems",
      ],
    },
    {
      title: "Module 4: Medical Ethics",
      topics: [
        "Ethics, Compliance, Frauds in Healthcare",
        "Confidentiality with Medical Records",
        "Insurance Audits",
        "Legal Concepts",
      ],
    },
    {
      title: "Module 5: Diagnostic Coding",
      topics: [
        "Introduction to Diagnostic Coding",
        "ICD-10 CM Coding Manual Introduction",
      ],
    },
    {
      title: "Module 6: ICD-10 CM Diagnosis Coding",
      topics: [
        "Guidelines and Rules",
        "Diagnosis Coding Procedures",
        "Basic Coding Exercises",
      ],
    },
    {
      title: "Module 7: ICD-10-CM Coding (Infections to Blood Diseases)",
      topics: [
        "Coding infections, parasitic diseases, neoplasms",
        "Coding endocrine, nutritional, metabolic & blood diseases",
      ],
    },
    {
      title: "Module 8: ICD-10-CM Coding (Mental to Respiratory System)",
      topics: [
        "Coding mental disorders",
        "Coding nervous system",
        "Coding circulatory system",
        "Coding respiratory system",
      ],
    },
    {
      title: "Module 9: ICD-10-CM Coding (Digestive to Pregnancy)",
      topics: [
        "Coding digestive system",
        "Coding genitourinary system",
        "Coding childbirth & pregnancy complications",
      ],
    },
    {
      title: "Module 10: ICD-10-CM Coding (Skin to Perinatal Conditions)",
      topics: [
        "Coding skin & subcutaneous tissue",
        "Coding musculoskeletal system",
        "Coding congenital abnormalities",
        "How to code related diagnoses",
      ],
    },
    {
      title: "Module 11: ICD-10-CM Coding (Symptoms to Complications)",
      topics: [
        "Coding symptoms, signs & ill-defined conditions",
        "Coding injuries",
        "Coding poisoning",
      ],
    },
    {
      title: "Module 12: Z Codes, S Codes, and ICD-10-CM Coding Practicum",
      topics: [
        "This module helps the learner to understand new coding skills ande diagnosis coding knowledge in real-world scenarios",
        "Apply V-codes and",
        "E-codes in coding situations",
      ],
    },
    {
      title: "Module 13: CPT Coding",
      topics: [
        "This module will help the candidate to Learn the History of procedural coding",
        "Differentiate between CPT and HCPCS codes",
        "Format of the CPT coding manual &",
        "Basic steps of CPT coding."
      ],
    },
    {
      title: "Module 14: CPT Coding from the integumentary system",
      topics: [
        "This module helps the learner to understand codes related to the integumentary system Coding Biopsies,skin lesions,excisions, burns, breast procedures and skin grafts."
      ],
    },
    {
      title: "Module 15: CPT Coding from the Reproductive Systems to the Operating Microscope",
      topics: [
        "This module will help the candidate to Learn the skills of Coding from the Reproductive Systems to the Operating Microscope like Code maternity and childbirth procedures",
        "Procedures related to the endocrine, nervous,",
        "Visual, and auditory systems",
        "Coding for microscopic procedures"
      ],
    },
    {
      title: "Module 16: CPT Coding for Radiology, Pathology, Medicine, and Anesthesia",
      topics: [
        "This module will help the candidate to Learn the skills of Coding for Radiology, Pathology, Medicine, and Anesthesia like Radiology terms, subsections, guidelines",
        "Coding radiology procedures",
        "Guidelines and coding information for pathology and anesthesia",
      ],
    },
    {
      title: "Module 17: CPT Coding Evaluation and Management Services",
      topics: [
        "This module helps the learner to understand Coding Evaluation and Management Codes",
        "Documentation guidelines and evaluation",
        "Management level sections and modifiers.",
      ],
    },
    {
      title: "Module 18: Comprehensive CPT Evaluation and Management",
      topics: [
        "This module will help the candidate to Learn the skills of Evaluation and management coding,",
        "Coding auditing process &",
        "Encounter forms usage in Coding specialist's work.",
      ],
    },
    {
      title: "Module 19: Comprehensive Surgery Coding",
      topics: [
        "This module will help to understand the concept of Practice procedure coding ",
        "CPT codes specific to surgery.",
      ],
    },
    {
      title: "Module 20: Musculoskeletal Coding.",
      topics: [
        "This module helps the learner to understand the Comprehensive Musculoskeletal Coding.",
      ],
    },
    {
      title: "Module 21: Digestive System Coding.",
      topics: [
        "This module will help to understand the concept of Comprehensive Digestive System Coding.",
      ],
    },
    {
      title: "Module 22: Urology and Reproductive system coding",
      topics: [
        "This module will contribute to understanding of your concept on Comprehensive Urology and Reproductive system coding.",
      ],
    },
    {
      title: "Module 23: Pulmonology and Cardiovascular coding.",
      topics: [
        "This module will help to understand the concept of Comprehensive Pulmonology and Cardiovascular coding.",
      ],
    },
    {
      title: "Module 24: CPT Coding for Radiology, Pathology",
      topics: [
        "This module will help the candidate to Learn the skills of Comprehensive Digestive System Coding.",
      ],
    },
    {
      title: "Module 25: Anesthesia Coding",
      topics: [
        "This module will help to understand the concept of Comprehensive Anesthesia coding.",
      ],
    },
    {
      title: "Module 26: HCPCS Coding",
      topics: [
        "This module will help the candidate to Learn the skills of use coding resources available to them throughout their medical coding careers",
        "Associations, websites, continuing education, and certification options",
        "Importance of Coding Charges and Research"
      ],
    },
    {
      title: "Complimentary Module 1: Soft Skills Development",
      topics: [
        "Business Communication",
        "Preparation for the Interview",
        "Presentation Skills"
      ],
    },
    {
      title: "Complimentary Module 2: Resume Writing",
      topics: [
        "Resume Building Technique"
      ],
    },
  ];

  return (
    <div className="space-y-6 mt-4">
      {modules.map((module, index) => (
        <div key={index} className="border-b pb-3">

          {/* Module Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              {module.title}
            </h3>

            <button
              onClick={() => toggleModule(index)}
              className="px-4 py-1 text-sm font-medium bg-purple-900 text-white rounded-md cursor-pointer"
            >
              {openModule === index ? "Preview" : "Preview"}
            </button>
          </div>

          {/* Topics */}
          {openModule === index && (
            <ul className="mt-3 list-disc ml-6 space-y-1 text-gray-700 text-[15px]">
              {module.topics.map((topic, i) => (
                <li key={i}>{topic}</li>
              ))}
            </ul>
          )}

        </div>
      ))}
    </div>
  );
};

export default Curriculum;
