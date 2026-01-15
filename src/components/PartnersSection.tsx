import render13 from "@/assets/partners/render13-new.jpg";
import simpertech from "@/assets/partners/simpertech-new.jpg";
import shiatsuShen from "@/assets/partners/shiatsu-shen-new.jpg";
import edictus from "@/assets/partners/edictus-new.jpg";
import beriko from "@/assets/partners/beriko-new.jpg";
import srnecStyle from "@/assets/partners/srnec-style-new.jpg";
import vrtnaOaza from "@/assets/partners/vrtna-oaza-new.jpg";
import edenville from "@/assets/partners/edenville-new.jpg";
import inovix from "@/assets/partners/inovix-new.jpg";

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
    <section id="klijenti" className="py-6 md:py-24 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          Firme sa kojima surađujemo
        </h2>
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-background/50 backdrop-blur-sm rounded-xl p-5 md:p-8 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 aspect-[3/2]"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-20 md:max-h-28 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
