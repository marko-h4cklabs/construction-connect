import { partners } from "./PartnersSection";

const LogoMarquee = () => {
  const duplicatedPartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <div className="py-6 md:py-10 overflow-hidden">
      <div className="relative">
        {/* Premium fade edges with gradient */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, hsl(0 0% 7%) 0%, hsl(0 0% 7% / 0.8) 50%, transparent 100%)',
          }}
        />
        <div 
          className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(-90deg, hsl(0 0% 7%) 0%, hsl(0 0% 7% / 0.8) 50%, transparent 100%)',
          }}
        />
        
        {/* Scrolling track */}
        <div className="flex animate-marquee-mobile md:animate-marquee" style={{ width: "fit-content" }}>
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 mx-5 md:mx-8 flex items-center justify-center group"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 md:h-14 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoMarquee;
