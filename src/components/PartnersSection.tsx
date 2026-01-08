import render13 from "@/assets/partners/render13.jpg";
import simpertech from "@/assets/partners/simpertech.jpg";
import shiatsuShen from "@/assets/partners/shiatsu-shen.jpg";
import edictus from "@/assets/partners/edictus.jpg";
import beriko from "@/assets/partners/beriko.png";
import srnecStyle from "@/assets/partners/srnec-style.png";
import vrtnaOaza from "@/assets/partners/vrtna-oaza.png";
import edenville from "@/assets/partners/edenville.png";
import inovix from "@/assets/partners/inovix.png";

const partners = [
  { name: "Render13", logo: render13 },
  { name: "Simper Tech", logo: simpertech },
  { name: "Shiatsu Shen", logo: shiatsuShen },
  { name: "Edictus", logo: edictus },
  { name: "Beriko d.o.o", logo: beriko },
  { name: "Srnec Style d.o.o", logo: srnecStyle },
  { name: "Vrtna Oaza Beljan", logo: vrtnaOaza },
  { name: "EdenVille", logo: edenville },
  { name: "Inovix", logo: inovix },
];

export { partners };

const PartnersSection = () => {
  return (
    <section id="klijenti" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          Firme sa kojima surađujemo
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 max-w-5xl mx-auto">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-background rounded-xl p-3 md:p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300 gap-2 md:gap-4"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-12 md:max-h-24 w-auto object-contain"
              />
              <span className="text-xs md:text-sm font-medium text-muted-foreground text-center">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
