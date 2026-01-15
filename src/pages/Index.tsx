import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureShowcase from "@/components/FeatureShowcase";
import SavingsCalculator from "@/components/SavingsCalculator";
import OurStorySection from "@/components/OurStorySection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import PartnersSection from "@/components/PartnersSection";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundEffects />
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <ScrollReveal>
            <FeatureShowcase />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <SavingsCalculator />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <PartnersSection />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <OurStorySection />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <FAQSection />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <CTASection />
          </ScrollReveal>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
