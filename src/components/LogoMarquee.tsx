import { partners } from "./PartnersSection";

const LogoMarquee = () => {
  // Duplicate the array for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-4 md:py-6 bg-muted/50 overflow-hidden border-y border-border/50">
      <div className="relative">
        <div className="flex animate-marquee-mobile md:animate-marquee">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 mx-4 md:mx-12"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-8 md:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
