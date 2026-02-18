import React from 'react'
import MedicalCodingBanner from '../Component/MedicalCodingBanner'
import FeatureCards from '../Component/FeatureCards'
import WhyMedCode from '../Component/WhyMed'
import FeaturesGrid from '../Component/FeaturedGrid'
import PlacedLearners from '../Component/PlacedLerner'
import AwardsSection from '../Component/AwardSection'
import TestimonialSection from '../Component/TestimonialSection'
import Program10in1 from '../Component/Program10in1'
import Footer from '../Component/Footer'
import TopBar from '../Component/TopBar'
import AccordionSection from '../Component/AccordionSection'
import MedCodeCertificate from '../Component/MedCodeCertificate'
import InquiryPopup from '../Component/InquiryPopup'
import RegisterPopup from '../Component/RegisterPopup'

const Home = () => {
  return (
    <div>
        <TopBar />
        <MedicalCodingBanner />
        <InquiryPopup />
        <FeatureCards />
        <WhyMedCode />
        <FeaturesGrid />
        <AwardsSection />
        <PlacedLearners />
        <AccordionSection />
        <TestimonialSection />
        <Program10in1 />
        <MedCodeCertificate />
        <Footer />
        
    </div>
  )
}

export default Home