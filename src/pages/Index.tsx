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
import PremiumSection from "@/components/PremiumSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden scroll-smooth snap-y snap-mandatory">
      <BackgroundEffects />
      <div className="relative z-10">
        <Navbar />
        <main>
          {/* Hero - Full screen snap */}
          <PremiumSection variant="dark" className="pt-20">
            <HeroSection />
          </PremiumSection>
          
          {/* Feature Showcase */}
          <PremiumSection variant="dark">
            <FeatureShowcase />
          </PremiumSection>
          
          {/* Calculator - Premium gold gradient instead of flat yellow */}
          <PremiumSection variant="gold" id="kalkulator">
            <SavingsCalculator />
          </PremiumSection>
          
          {/* Partners */}
          <PremiumSection variant="dark">
            <PartnersSection />
          </PremiumSection>
          
          {/* Pricing */}
          <PremiumSection variant="dark">
            <PricingSection />
          </PremiumSection>
          
          {/* Our Story - Premium gold gradient */}
          <PremiumSection variant="gold" id="nasa-prica">
            <OurStorySection />
          </PremiumSection>
          
          {/* Final CTA */}
          <PremiumSection variant="gradient" className="min-h-[60vh]">
            <CTASection />
          </PremiumSection>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
