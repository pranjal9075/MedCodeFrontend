import React, { lazy, Suspense } from 'react'

const MedicalCodingBanner = lazy(() => import('../Component/MedicalCodingBanner'));
const FeatureCards = lazy(() => import('../Component/FeatureCards'));
const WhyMedCode = lazy(() => import('../Component/WhyMed'));
const FeaturesGrid = lazy(() => import('../Component/FeaturedGrid'));
const PlacedLearners = lazy(() => import('../Component/PlacedLerner'));
const AwardsSection = lazy(() => import('../Component/AwardSection'));
const TestimonialSection = lazy(() => import('../Component/TestimonialSection'));
const Program10in1 = lazy(() => import('../Component/Program10in1'));
const Footer = lazy(() => import('../Component/Footer'));
const TopBar = lazy(() => import('../Component/TopBar'));
const AccordionSection = lazy(() => import('../Component/AccordionSection'));
const MedCodeCertificate = lazy(() => import('../Component/MedCodeCertificate'));

const Home = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div></div>}>
      <div>
        <TopBar />
        <MedicalCodingBanner />
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
    </Suspense>
  )
}

export default Home