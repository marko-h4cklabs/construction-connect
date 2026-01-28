import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureShowcase from "@/components/FeatureShowcase";
import SavingsCalculator from "@/components/SavingsCalculator";
import OurStorySection from "@/components/OurStorySection";
import CTASection from "@/components/CTASection";
import PartnersSection from "@/components/PartnersSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";
import SectionWrapper from "@/components/SectionWrapper";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <BackgroundEffects />
      <div className="relative z-10">
        <Navbar />
        <main>
          {/* Hero - always dark */}
          <HeroSection />
          
          {/* Feature Showcase - dark with reveal */}
          <SectionWrapper variant="dark">
            <FeatureShowcase />
          </SectionWrapper>
          
          {/* Calculator - LIGHT (yellow bg, black text) - contrast section */}
          <SectionWrapper variant="light">
            <SavingsCalculator />
          </SectionWrapper>
          
          {/* Partners - dark */}
          <SectionWrapper variant="dark">
            <PartnersSection />
          </SectionWrapper>
          
          {/* Pricing - dark */}
          <SectionWrapper variant="dark">
            <PricingSection />
          </SectionWrapper>
          
          {/* Our Story - LIGHT (yellow bg, black text) - contrast section */}
          <SectionWrapper variant="light">
            <OurStorySection />
          </SectionWrapper>
          
          {/* Final CTA - dark */}
          <SectionWrapper variant="dark">
            <CTASection />
          </SectionWrapper>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
