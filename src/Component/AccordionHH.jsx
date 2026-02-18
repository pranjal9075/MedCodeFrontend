import React, { useState } from "react";

const faqs = [
  {
    q: "What is the Scope & Modules are covered in the Online Medical Coding Course?",
    a: "The scope of Online Medical Coding Course at WebCode consists of 15 module courses that include an introduction, coding manuals, medical terminology with an introduction to the coding process, detailed explanation, exploring the topics and much more. They also include 2 complimentary modules on soft skill development and resume writing.",
  },
  {
    q: "How long does it take to become a Medical Coder?",
    a: "It usually depends on the course you choose and your learning pace.",
  },
  {
    q: "Medical Coding Training After 12th with fees at WebCode.",
    a: "You can join medical coding training after 12th. Fees vary depending on the course.",
  },
  {
    q:"What is the eligibility, duration & fees of Medical Coding Course training?",
    a:"In the Medical Coding Course, everything including but not limited to Medical Coding, medical terminology including anatomy, diseases, procedures, diagnostics tools tests, treatments and master all the aspects of ICD-10-CM, CPT and HCPCS. By the end of the course, the learner might be able to code in a professional way.",
  },
  {
    q:"How is the training for the Online Medical Coding Course at WebCode ?",
    a:"The course is taught in different modes including online, one-on-one training and corporate training. The classes can have a customized schedule and customized curriculum for one-on-one training. The courses are self-paced with flexible schedules and are trained by experts in the field.",
  },
  {
    q:"Can you describe ICD?",
    a:"ICD is the International Classification of Disease. It is primarily implemented by the WHO for classifying injuries, deaths, and diseases. ICD -10 is the newest and improved version of ICD and is popularly used. ",
  },
  {
    q:"Can I do a Medical coding course after my graduation?",
    a:"Yes, you can do a Medical Coding course after graduation. If you are interested in building a career in this sect of the healthcare industry, then you are in the right place. Join WebCode’s course in Kolkata and gain in-depth knowledge of the subject.",
  },
  {
    q:"Can this course help me in preparing for the CPC Exam?",
    a:"Yes, the course is designed to aid the learners in preparing for the CPC Exam. Moreover, it helps gain hands-on exposure through projects and real-time assignments.",
  },
  {
    q:"Is the timing for this course flexible?",
    a:"Yes, the course schedule for WebCode’s Medical Coding course in Indore is flexible. Both weekend and weekday batches with convenient timings are available.",
  },
  {
    q:"Who are the trainers for this course?",
    a:"Ans:     The trainers for the course are experts from the Medical Coding domain who are also domain experts at the WebCode Medical Academy.",
  },
  {
    q:"What are the major coding systems used in the Medical Coding domain?",
    a:" The major Codes used in  Medical Coding are: CPT codes, ICD Codes, DRG COdes, HCPCS codes, etc.",
  },
  {
    q:"Is a career in Medical Coding fruitful?",
    a:"There is a huge gap between the availability of skilled professionals and countless opportunities in the Medical coding arena, as a result, a Medical Coding career will be rewarding.",
  },
  {
    q:"Is a career in Medical Coding fruitful?",
    a:"Ans:     There is a huge gap between the availability of skilled professionals and countless opportunities in the Medical coding arena, as a result, a Medical Coding career will be rewarding.",
  },
  {
    q:"Is the Medical Coding course require prior experience in coding?",
    a:"ANS:  Medical Coding has nothing to do with computer coding languages. Medical Coding uses an entirely different set of universally accepted code systems, which depend only on the type of treatment and doctor visits.",
  },
  {
    q:"Is there WebCode’s Medical Coding course near me in Coimbatore?",
    a:"ANS: Yes, WebCode’s Medical Coding course is available online in Coimbatore. The training is live online interactive and Instructor-led. You can also choose the self-paced course in Medical Coding if you are up to it.",
  },
  {
    q:"Will Medical Coding become obsolete?",
    a:"ANS: The chances of Medical Coding becoming obsolete is next to none. This is because this field of Healthcare is just gaining momentum with its deliberate ease of handling records of patients. Moreover, the Medical Coding system is adapted to the various progress in the finance, health, and tech industries.",
  },
  {
    q:"Is CPC Certification better than other certifications in Medical Coding?",
    a:"ANS: The CPC Certification is regarded as the best certification in Medical Coding as it enables you to work in a clinic or medical practitioner’s office. ",
  },
  {
    q:"Which Certificate Exam in Medical Coding is the most difficult?",
    a:"ANS: The CMC Exam or the Certified Medical Coder Exam is considered the hardest among the others in Medical Coding. This is offered by the PMI and is for outpatient settings alone.",
  },
  {
    q:"What is Medical Coding in simple words?",
    a:"ANS: Medical Coding can be put simply as the process of translating the records of patients into codes. They are intended to make the medical reimbursement processes, treatment tracking, and monitoring easy.",
  },
  {
    q:"Can I do this course after class 12th?",
    a:"ANS: Yes, you can do WebCode’s Medical Coding course in Indore after class 12. No prior knowledge of coding is required to do this course. Also, this course gives 100% practical training along with learning the concepts.",
  },
  {
    q:"Is Medical Coding, a rewarding field?",
    a:"ANS: Yes, Medical Coding is a highly rewarding domain. The demand for Medical coders is huge while available trained professionals are fewer. Hence, there are countless opportunities for Medical coders in India.",
  },
  {
    q:"Is the job of a Medical Coder highly-paid?",
    a:"ANS: The salry of Medical Coders in India is in the range INR 1.5 lakhs to INR 4.3 lakhs per annum. So, yes, Medical Coders are paid substantially.",
  },
  {
    q:"Is Medical Coding a stressful job?",
    a:"ANS: Any job comes with its stress and deadlines and so is the job of Medical Coders. But, with time and experience, the tasks become easier to accomplish. Moreover, eye to detail is one of the best ways to complete the task in this arena.",
  },
  {
    q:"What is Medical Coding?",
    a:"Medical Coding involves extracting patient information from medical records such as doctor’s notes, lab results etc. and transforming them into universally accepted alphanumeric codes.",
  },
  {
    q:"Why is Medical Coding needed?",
    a:"Codification of a patient’s medical information plays a crucial role in assisting doctors with diagnosis and treatment. It helps insurers determine the accuracy of claims and provide appropriate reimbursements. Finally, governments can also access this health data to formulate health policies.",
  },
  {
    q:"1. What is Medical Coding?",
    a:"Medical Coding involves the extraction of patient information from medical records such as doctor’s notes, lab results etc. and its conversion to universally accepted alphanumeric codes. This codification helps healthcare providers in subsequent diagnosis and treatment, insurers approve the claims, and governments formulate effective health policies.",
  },
  {
    q:"2. Is the Medical Coding career worth pursuing?",
    a:"Yes, this is the right time to pursue this career path because the healthcare sector is booming. The growth is partly an outcome of the Covid pandemic and partly the availability of a talented pool of trained healthcare providers able to analyse huge volumes of data, detect trends, and discover underlying correlations. This makes India a preferred healthcare destination, and, in turn, boosts the demand for medical coders in India.",
  },
  {
    q:"3. Are Medical Coding Courses online effective?",
    a:"Given the nature of work involved in Medical Coding, you can master the knowledge and skills in all aspects including medical terminologies, Anatomy, diseases, procedures, diagnostics tools, and treatments from the comforts of your home. The online courses also offer carefully curated live projects and Internship assignments to provide you with the necessary hands-on experience. Additionally, the online courses are well-designed to prepare you for the Certification exam as well.",
  },
  {
    q:"4. Which are the best Medical Coding course certificates in India?",
    a:"Medical Coding courses offer a range of certificates. Of them, the five best are: Professional Coder Certification (CPC), Outpatient Hospital/Facility Certification (COC), Inpatient Hospital/Facility Certification (CIC), Risk Adjustment Certification (CRC), and Family Practice Coder Certification (CFPC).",
  },
  {
    q:"5. What are the eligibility criteria to become a professional Medical Coder in India?",
    a:`The following criteria you must fulfil to qualify as a professional medical coder in India:

      
       • Academic: Bachelor’s or Master’s degree preferably in life sciences (eg- B.Pharma, BSc, B.Tech)
       • Technical skills: CPT coding, ICD-10, Medical billing, Medical Terminology, and Data Entry.
       • Soft skills: Communication Skills, Analytical skills, and Research skills`
  },
  {
    q:"Ques1. What exactly is meant by Medical Coding?",
    a:"Ans. Medical Coding is the process of extracting a patient’s information from medical records such as doctor’s notes, lab reports etc. and transforming the same into universally agreed alphanumeric codes. This information is then used by healthcare providers for further diagnosis and treatment. Insurers also make use of this information to verify claims. Even governments refer to this codified information at the time of formulating health policies.",
  },
  {
    q:"Q1. Why should you study a medical coding course in Pune?",
    a:"Ans. It prepares students to become medical coders in hospitals, physician offices, and other healthcare facilities. In medical coding courses, students ensure data quality, accuracy, and a secure account for each patient. Therefore, taking the medical coding training from MedCode is a wise idea.",
  },
  {
    q:"Q2. Is medical coding course in Pune available for anyone?",
    a:"The course is best suited to science graduates. In addition to coding medical terminology, it also provides knowledge of human anatomy. It is not uncommon for commerce graduates to take the course. The courses are open to holders of master's degrees, bachelor's degrees, and diplomas.",
  },
  {
    q:"Q3. How much does a medical coding course in Pune expert make?",
    a:"An entry-level medical coder earns an initial salary of Rs 2-4 lakhs per year, and an experienced medical coder can earn up to INR 15 lakhs per year.",
  },
  {
    q:"Q4. How much do medical coding courses in Pune cost?",
    a:"Medical coding course fees are about INR 60000. Contact WebCode to get more details. The experts here have years of experience in teaching medical coding. You will have a great future with WebCode after finishing the course.",
  },
  {
    q:"Can I take a course to get my medical coding certification done online?",
    a:"Medical coding courses may be studied online at medcode.tech, where the sessions are conducted interactively.",
  },
  {
    q:"How satisfying would you find the salary of a medical coder to be?",
    a:"An average yearly pay of 3.0 Lakhs is earned by medical coders in India, with a range of 1.4 Lakhs to 4.7 Lakhs.",
  },
  {
    q:"What should I do if I have questions about medical coding training that need answering?",
    a:"Instructors at medcode.tech typically offer the chance to address any remaining questions or concerns as a follow-up to specific training sessions.",
  },
  {
    q:"Does Medical Coding Training Have Any Standards?",
    a:"Medical coding education is measured against the Certified Professional Coder (CPC) standard.",
  },
  {
    q:"What role does medical coding course play in the healthcare industry?",
    a:"Using a universal medical alphanumeric code, medical coding assigns a unique number code to each medical diagnosis, operation, medical service, and medical gadget. Patients' information, insurance claims for third-party providers, and illness, treatment, etc. tracking all rely on these codes. Not just patients dependent on this report; doctors do, too.",
  },
  {
    q:"How long does the Medical Coding course last per medcode.tech's curriculum?",
    a:"Medical Coding Training takes ninety hours to finish a medical coding course.",
  },
  {
    q:"Does the Medical Coding course require computer knowledge?",
    a:"Knowledge of computers is helpful but is optional.Each potential employee receives instruction on how to use the various medical programs.A firm grasp of the fundamentals is a major plus for getting the job done.",
  },
  {
    q:"Does the medical coding program include job placement services?",
    a:"Institutions like medcode.tech provide placement from renowned firms when students finish their medical coding courses.",
  },
  {
    q:"Is there any prerequisite work for medical coding classes?",
    a:"Medical coding is an open field that welcomes students of all skill levels.",
  },
  {
    q:"To what extent does one need to be eligible for medical coding?",
    a:"You will only be considered if you have a bachelor's degree in healthcare or a related life science field. It's common for medical coders to come from a variety of educational backgrounds.",
  },
  {
    q:"How should I choose the medical coding course, and what are the advantages?",
    a:"Nowadays, medical coding is among the fastest-growing occupations. There is a growing demand for competent personnel in this industry, fueled in part by an older population that has piqued the interest of many people looking for work-from-home or telecommuting opportunities. After learning about medical coding and deciding that this is their profession, the next step is getting the training they need to succeed.",
  },
  {
    q:"Do you need help learning medical coding?",
    a:"The most challenging aspect of medical coding is learning and correctly applying thousands of codes. Join recognized training programs like medcode.tech and pass the necessary exams to become a certified medical coder.",
  },
  {
    q:"Why is it so important to accurately code medical records?",
    a:"The medical health sector is beginning to devote much time and energy to medical coding, a relatively new healthcare professional.",
  },
  {
    q:"Can a total newbie to the medical coding course finish medcode.tech's course on the subject in a reasonable amount of time?",
    a:"Due to the interactive sessions and best course structure, the medcode.tech course can be completed quickly.",
  },
  {
    q:"If a working professional is interested in taking a medical coding course, are there any options for scheduling?",
    a:"medcode.tech does provide flexible scheduling, including online and weekend classes, for busy professionals.",
  },
  {
    q:"When the training is finished, can we review what we've learned?",
    a:"Applicants get access to our Learning Management System (LMS) for up to one year after the conclusion of the course at no additional cost for review and updates in any of our centers in India, or they may receive answers to their concerns at any time through our 24/7 online help desk.",
  },
  {
    q:"Do the medical coding programs offer placement help for their students?",
    a:"The institution does provide placement from renowned firms when students finish their medical coding training.",
  },
  {
    q:"Is there any prerequisite work for medical coding classes?",
    a:"Medical coding is an open field that welcomes students of all skill levels.",
  },
  {
    q:"How much money can you expect to make working as a medical coder?",
    a:"Average yearly pay of 3.0 Lakhs is earned by medical coders in India, with a range of 1.4 Lakhs to 4.7 Lakhs.",
  },
  {
    q:"What language do medical coders often use?",
    a:"The CPT terminology is the most widely used medical vocabulary in the United States for reporting evaluation and management (E/M), evaluation and management (E/M), surgery, radiology, laboratory, anesthesiology, genomic sequencing, and other services under public and private health insurance programs.",
  },
  {
    q:"In what ways does medcode.tech provide verified certificates for medical coding courses?",
    a:"A certificate of completion will be issued once all training requirements (quizzes, homework, and projects) have been met. ",
  },
  {
    q:"When can I get medical coding training courses online?",
    a:"To answer your question, the school approves distance education for its medical coding programs.",
  },
  {
    q:"Which three categories of medical coding exist?",
    a:"Coding professionals use ICD to assign one of three medical codes. The International Statistical Classification of Diseases (ICD) codes are the most well-known medical codes. Most doctor-performed medical treatments are documented using CPT, or Current Procedure Terminology and codes, instead of HCPCS, used for hospital-performed operations.",
  },
  {
    q:"Do you provide extra support sessions if students have issues or require clarification on the course material?",
    a:"Send a ticket to medcode.tech's dedicated support staff anytime you need help, and they'll get back to you as soon as possible with an answer. However, the course's interactive sessions include opportunities for one-on-one time with an instructor.",
  },
  {
    q:"Is it true that medical coding is a type of information technology work?",
    a:"A lifetime of guaranteed employment is only one of the many benefits of a career in medical coding.",
  },
  {
    q:"How do I get answers to my questions about medical coding education?",
    a:"After a training session is over, participants are allowed to ask questions.",
  },
  {
    q:"Do you need help taking our medical coding classes?",
    a:"However, the training will become more familiar after you learn basic coding approaches and procedures.",
  },
  {
    q:"Can I switch back and forth between independent study and traditional classroom learning?",
    a:"If you wish to upgrade from self-paced to online instructor-led education, you won't have to spend much more. You will be added to the next available group as soon as possible.",
  },
  {
    q:"Can the medcode.tech placement support team assist you in locating employment opportunities?",
    a:"medcode.tech provides students who have completed their program with passive and proactive placement help. In this regard, we've partnered exclusively with over 80 of the most illustrious global firms globally.",
  },
  {
    q:"How long do medical coding courses typically run?",
    a:"The courses offered by the medcode.tech Institute can be completed in as little as six months",
  },
  {
    q:"Can I get internship experience if I take a course in medical coding?",
    a:"Internships and using the institute's project space are two ways students can get real-world experience.",
  },
  {
    q:"Is there a difference in value between medical coding courses and those that focus on more conventional advertising techniques?",
    a:"Students who take classes may get valuable market knowledge. Throughout the training, instructors consistently use examples from the actual world to verify that their pupils absorb the material.",
  },
  {
    q:"While enrolling in Medical Coding Courses, what kind of resources can I anticipate receiving for study?",
    a:"Students must sign up for a class and log into the learning management system to access the course texts.",
  },
  {
    q:"Can you study medical coding courses over the internet?",
    a:"Several city residents enroll in the class for ease of access to the online lectures. Students who cannot attend the live sessions can still benefit from the instruction by watching the recorded versions. Online medical coding courses, however, provide additional benefits.",
  },
  {
    q:"Is it a good idea to go into medical coding?",
    a:"Those who graduated from college and majored in this field have an excellent chance of finding employment with a reputable firm.",
  },
  {
    q:"How many different sections are there in the medical coding training program?",
    a:"medcode.tech's Medical Coding Course consists of 26 separate lessons.",
  },
  {
    q:"Can I take a course in medical coding after I graduate?",
    a:"A certificate program in medical coding is available to recent grads. This is the place to be if you want to make a name for yourself in this particular field of medicine",
  },
  {
    q:"Does this course provide good practice for the CPC Exam?",
    a:"Absolutely, the goal of the course is to help students be ready for the CPC test. Projects and real-world tasks are also great ways to get some practical experience.",
  },
  {
    q:"What is Medical Coding?",
    a:"Medical Coding is the process of extracting medical information from a patient’s medical records. This information is then converted into universally accepted medical codes for reference by doctors at the time of diagnosis and treatment. Insurance companies also use this information to validate insurance claims. Even governments find this information handy while formulating health policies.",
  },
  {
    q:"Is medical coding a difficult field?",
    a:"Working in the field of medical coding as a medical coder is not difficult. However, this job comes with many complexities and requires highly specialized skills and specialized training. Therefore, it is very important to enroll in a medical coding course at one of the best medical coding institutes in Hyderabad like medcode.tech Education.",
  },
  {
    q:"Where do Medical Coders work?",
    a:"Due to the wide variety of companies and institutions that employ medical programmers, there are countless career opportunities for medical programmers. In addition to healthcare systems, hospitals, clinics, and ambulatory surgery centers, coders are called upon in:Emergency clinics,Mental health practices,Collection agencies,Insurance companies,Professional liability companies,Federal agencies,Information technology services,Law Firms,Dental Offices,Physical therapy centers,Nursing homes,State government agencies,Vocational schools,Medical billing services,Medical laboratories, etc.",
  }
];

const AccordionHH = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="bg-[#FFF9F0] min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {faqs.map((item, i) => (
          <div key={i} className="border-b border-[#e4dfd4] py-6 cursor-pointer">
            
            {/* Question Row */}
            <div
              className="flex justify-between items-center"
              onClick={() => toggle(i)}
            >
              <h2 className="text-xl font-semibold text-[#2d2d2d]">
                {item.q}
              </h2>

              {/* plus / minus icon */}
              <span className="
                flex items-center justify-center
                rounded-full aspect-square
                border-2 border-[#d7d2c5] text-[#4a4a4a] 
                text-lg sm:text-xl md:text-2xl
                w-8 sm:w-10 md:w-12
                transition-all duration-200
                hover:border-blue-400 hover:text-blue-400
                shrink-0
              ">
                {openIndex === i ? "−" : "+"}
              </span>
            </div>

            {/* Answer */}
            {openIndex === i && (
              <p className="mt-4 text-[#4a4a4a] leading-relaxed text-[17px]">
                {item.a}
              </p>
            )}

          </div>
        ))}

      </div>
    </div>
  );
};

export default AccordionHH;
