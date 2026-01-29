import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureShowcase from "@/components/FeatureShowcase";
import SavingsCalculator from "@/components/SavingsCalculator";
import OurStorySection from "@/components/OurStorySection";
import CTASection from "@/components/CTASection";
import PartnersSection from "@/components/PartnersSection";
import SectionDivider from "@/components/SectionDivider";
import Footer from "@/components/Footer";
import ScrollDrivenBackground from "@/components/ScrollDrivenBackground";
import PremiumSection from "@/components/PremiumSection";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden scroll-smooth snap-y snap-mandatory">
      {/* Dynamic scroll-driven background */}
      <ScrollDrivenBackground />
      
      <div className="relative z-10">
        <Navbar />
        <main>
          {/* Hero - Full screen snap */}
          <PremiumSection className="pt-20">
            <HeroSection />
          </PremiumSection>
          
          <SectionDivider />
          
          {/* Feature Showcase */}
          <PremiumSection>
            <FeatureShowcase />
          </PremiumSection>
          
          <SectionDivider />
          
          {/* Partners/Clients */}
          <PremiumSection id="klijenti">
            <PartnersSection />
          </PremiumSection>
          
          <SectionDivider />
          
          {/* Calculator */}
          <PremiumSection id="kalkulator">
            <SavingsCalculator />
          </PremiumSection>
          
          <SectionDivider />
          
          {/* Our Story */}
          <PremiumSection id="nasa-prica">
            <OurStorySection />
          </PremiumSection>
          
          <SectionDivider />
          
          {/* Final CTA */}
          <PremiumSection className="min-h-[60vh]">
            <CTASection />
          </PremiumSection>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
