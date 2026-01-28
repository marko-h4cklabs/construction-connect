import { partners } from "./PartnersSection";

const LogoMarquee = () => {
  const duplicatedPartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <div className="py-6 md:py-10 overflow-hidden">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling track */}
        <div className="flex animate-marquee-mobile md:animate-marquee" style={{ width: "fit-content" }}>
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 mx-5 md:mx-8 flex items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 md:h-14 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-150"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoMarquee;
