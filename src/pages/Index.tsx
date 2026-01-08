import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ContactSection from "@/components/ContactSection";
import OurStorySection from "@/components/OurStorySection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import PartnersSection from "@/components/PartnersSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ContactSection />
        <PricingSection />
        <PartnersSection />
        <OurStorySection />
        <FAQSection />
        <ContactSection isSecondary />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
