import React from "react";
import Accordion from "./Accordion";
import Curriculum from "./Curriculum";
import ModulePreview from "./Curriculum";
import StepsSection from "./StepSection";
import AccordionHH from "./AccordionHH";

const AccordionSection = () => {
  return (
    <div>
      <Accordion title="About the Course" bg="bg-[#faf7db]">
        <h2 className="text-3xl font-semibold mb-3">
          Medical Coding (CPC) Training
        </h2>

        <p className="mb-4">
          Medical Training Course covers all aspects of Medical Coding and 
          Medical Terminology including Anatomy, diseases, procedures, 
          diagnostic tests, treatments and more.
        </p>

        <h3 className="text-xl font-semibold mb-2">9 in 1 Course</h3>

        <ul className="list-disc ml-6 space-y-2 mb-5">
          <li><strong>Training:</strong> 90 Hours of Two-way Live Interactive Sessions</li>
          <li><strong>Projects:</strong> HCPCS, ICD-10 CM, CPT & more practical tasks</li>
          <li><strong>Internship:</strong> Complete internship assistance provided</li>
          <li><strong>Certification: </strong>Get Course Completion Certification of Medical Coding Training from medcode.tech® Govt of India recognized & Award-Winning Institute, and showcase expertise</li>
          <li><strong>Placement: </strong>100% Placement Guarantee Support for 1-Year post successful completion</li>
          <li><strong>E-Learning: </strong>Access to Abundant Tools and Techniques, video content, assessments, and more</li>
          <li><strong>Masterclass: </strong>Access to 52+ Masterclass Sessions for essential soft skill development</li>
          <li><strong>Hackathons: </strong>Free Access to #Askmedcode.tech Hackathons and Competitions</li>
          <li><strong>Membership:</strong> Get 1-Year Gold Membership of medcode.tech® Writing Academy for the Medical Coding Course</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Trainers at medcode.tech®</h3>

        <ul className="list-disc ml-6 space-y-2 mb-5">
            <li>Most respected industry experts with <strong>15+ years of working experience</strong></li>
            <li>Carefully selected by our training partners and<strong>recognized by numerous organizations</strong>over the years for their work</li>
            <li>Have been invited for <strong>150+ keynote</strong> classes for Medical Coding Course</li>
            <li>Have delivered <strong>350+ lectures </strong>and are currently empaneled as domain experts with medcode.tech® Medical Academy</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Alumni Status</h3>
        <p className="mb-5 space-y-2">Become a part of the Elite Medical Academy of medcode.tech® join the 4,60,000+ strong Alumni Network Worldwide</p>

        <h3 className="text-xl font-semibold mb-2">Gold Membership Benefits</h3>

        <ul className="list-disc ml-6 space-y-2">
            <li>Avail 1-Year Gold Membership of medcode.tech®️ Medical Academy that includes E-Learning Access through recorded Videos, Games, Projects, CPDSPe Studies</li>
            <li>Access to Masterclass Sessions</li>
            <li>Earn the Prestigious medcode.tech®️ Alumni Status and become one of the reputed 4,60,000+ Alumni across the globe</li>
            <li>Guaranteed Internship with medcode.tech®️ or partner firms</li>
            <li>Weekly 10+ job opportunities offered</li>
            <li>Experience Industry Projects during the training</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Learning Benefits</h3>

        <ul className="list-disc ml-6 space-y-2">
            <li>Gain extensive knowledge about Medical Terminologies and their usage</li>
            <li>Learn to divide & combine difficult Medical Words and special terms such as eponyms, acronyms, homophones, and antonyms</li>
            <li>Recognize Common Medical Abbreviation, Symbols, and Plural Words</li>
            <li>Explore the importance of Documentation in Medical Records and various types of dictation formats</li>
            <li>Learn about Confidentiality when dealing with Medical Records</li>
            <li>Get introduced to the actual Coding Process and history of the ICD-10-CM Coding System</li>
            <li>Learn about various infections, parasitic diseases,& neoplasms, and how to code them</li>
            <li>Gain extensive knowledge of V-codes, E Codes, and ICD-10-CM Coding Practicum</li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-2">Recognitions of medcode.tech® Education</h3>

        <ul className="list-disc ml-6 space-y-2 mb-5">
            <li>Winner of Top Corporate Training Award, Game-Based Learning Company of the under 40 Business World Award</li>
            <li>Affiliated with American Association of EFL, Ministry of Corporate Affairs, MSME, UKAF, UKCert, Project Management Institute (PMI), and ISO 29990:2010 certified</li>
            <li>Reviews: 3425+ Google Reviews, 1100+ Youtube Testimonials with 4.5+ Rating Rated on Goabroad, GoOverseas & more</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Career Benefits</h3>

        <ul className="list-disc ml-6 space-y-2"> 
          <li>Exposure to Millions of Jobs Globally in the Arena of Medical Coding</li>
          <li>Get Hired by International Brands like Google, Amazon, JP Morgan, and other top brands in the industry</li>
          <li>Be Highly Paid as a Freelancer or as a full-time Professional after the Successful completion of Medical Coding Training Course</li>
          <li>Improve your CV & LinkedIn Profile with Technical &  Professional development</li>
          <li>Distinguish your Profile from peers and get Promoted in Current Profile with most  in-demand Skills</li>
          <li>Distinguish your profile with the Course Completion Certification of Medical Coding Training Course and showcase expertise</li>
          <li>Better Job Security with exceptional growth opportunities</li>
        </ul>

      </Accordion>

      <Accordion title="Course Curriculum" bg="bg-[#e6e7ee]">
       <ModulePreview />
      </Accordion>

      <Accordion title="Training Certification Process" bg="bg-[#d9f3e5]">
        <StepsSection />
      </Accordion>

      <Accordion title="Commonly Asked Questions" bg="bg-[#faf7db]">
        <AccordionHH />
      </Accordion>
    </div>
  );
};

export default AccordionSection;
