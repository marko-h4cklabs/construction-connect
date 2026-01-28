import render13 from "@/assets/partners/render13-new.jpg";
import simpertech from "@/assets/partners/simpertech-new.jpg";
import shiatsuShen from "@/assets/partners/shiatsu-shen-new.jpg";
import edictus from "@/assets/partners/edictus-new.jpg";
import beriko from "@/assets/partners/beriko-new.jpg";
import srnecStyle from "@/assets/partners/srnec-style-new.jpg";
import vrtnaOaza from "@/assets/partners/vrtna-oaza-new.jpg";
import edenville from "@/assets/partners/edenville-new.jpg";
import inovix from "@/assets/partners/inovix-new.jpg";
import VideoTestimonials from "./VideoTestimonials";
import LogoMarquee from "./LogoMarquee";

const partners = [
  { name: "Render13", logo: render13 },
  { name: "Simper Tech", logo: simpertech },
  { name: "Shiatsu Shen", logo: shiatsuShen },
  { name: "Edictus", logo: edictus },
  { name: "Beriko", logo: beriko },
  { name: "Srnec Style", logo: srnecStyle },
  { name: "Vrtna Oaza Beljan", logo: vrtnaOaza },
  { name: "EdenVille", logo: edenville },
  { name: "Inovix", logo: inovix },
];

export { partners };

const PartnersSection = () => {
  return (
    <section id="klijenti" className="py-6 md:py-16 scroll-mt-24">
      {/* Video Testimonials */}
      <VideoTestimonials />
      
      {/* Logo Marquee */}
      <div className="mt-6 md:mt-10">
        <p className="text-center text-sm text-muted-foreground mb-2 uppercase tracking-wide">
          Firme koje nam vjeruju
        </p>
        <LogoMarquee />
      </div>
    </section>
  );
};

export default PartnersSection;
