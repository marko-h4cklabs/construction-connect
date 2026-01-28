import { useEffect, useRef, useState } from 'react';
import partner1 from "@/assets/partner1.jpg";
import partner2 from "@/assets/partner2.jpg";

// Story margin line component with scroll-reveal segments
const StoryMarginLine = ({ scrollProgress }: { scrollProgress: number }) => {
  const segments = [
    { top: 0, height: 15 },
    { top: 20, height: 8 },
    { top: 32, height: 20 },
    { top: 58, height: 12 },
    { top: 75, height: 18 },
  ];
  
  return (
    <div className="absolute left-0 top-0 h-full w-[2px] hidden lg:block">
      {segments.map((seg, i) => (
        <div
          key={i}
          className="absolute w-full transition-all duration-700 ease-out"
          style={{
            top: `${seg.top}%`,
            height: `${seg.height}%`,
            background: `linear-gradient(180deg, 
              rgba(120, 95, 50, ${0.15 + scrollProgress * 0.2}) 0%, 
              rgba(120, 95, 50, ${0.25 + scrollProgress * 0.15}) 50%, 
              rgba(120, 95, 50, ${0.15 + scrollProgress * 0.2}) 100%
            )`,
            opacity: scrollProgress > (i * 0.15) ? 1 : 0,
            transform: `scaleY(${scrollProgress > (i * 0.15) ? 1 : 0})`,
            transformOrigin: 'top',
          }}
        />
      ))}
      {/* Small marker dots */}
      {[12, 35, 52, 70, 88].map((pos, i) => (
        <div
          key={`dot-${i}`}
          className="absolute w-[6px] h-[6px] -left-[2px] rounded-full transition-all duration-500"
          style={{
            top: `${pos}%`,
            background: `rgba(120, 95, 50, ${0.4 + scrollProgress * 0.3})`,
            opacity: scrollProgress > (i * 0.18) ? 1 : 0,
            transform: `scale(${scrollProgress > (i * 0.18) ? 1 : 0})`,
          }}
        />
      ))}
    </div>
  );
};

// Highlighted text component
const HighlightedText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span 
    className={`relative inline ${className}`}
    style={{
      background: 'linear-gradient(180deg, transparent 60%, rgba(252, 240, 210, 0.7) 60%, rgba(252, 240, 210, 0.7) 90%, transparent 90%)',
      padding: '0 2px',
    }}
  >
    {children}
  </span>
);

// Person card component
const PersonCard = ({ 
  image, 
  name, 
  role, 
  quote,
  tilt = 0,
  delay = 0,
  isVisible = false 
}: { 
  image: string; 
  name: string; 
  role: string; 
  quote: string;
  tilt?: number;
  delay?: number;
  isVisible?: boolean;
}) => (
  <div 
    className="transition-all duration-700 ease-out"
    style={{
      opacity: isVisible ? 1 : 0,
      transform: `translateY(${isVisible ? 0 : 30}px) rotate(${tilt}deg)`,
      transitionDelay: `${delay}ms`,
    }}
  >
    <div 
      className="relative bg-[rgb(248,244,235)] overflow-hidden transition-all duration-500 hover:shadow-[0_8px_40px_rgba(120,95,50,0.12)]"
      style={{
        border: '3px solid rgb(74, 74, 74)',
      }}
    >
      {/* Image */}
      <div className="aspect-[4/5] overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      
      {/* Info section */}
      <div 
        className="p-4 md:p-5"
        style={{
          borderTop: '2px solid rgb(74, 74, 74)',
          background: 'linear-gradient(180deg, rgb(252, 248, 240) 0%, rgb(248, 244, 235) 100%)',
        }}
      >
        <h4 
          className="font-semibold text-lg md:text-xl tracking-tight mb-1"
          style={{ color: '#1F1F1F', fontWeight: 600 }}
        >
          {name}
        </h4>
        <p 
          className="text-sm uppercase tracking-wider mb-3"
          style={{ color: 'rgb(120, 95, 50)', fontWeight: 500 }}
        >
          {role}
        </p>
        <p 
          className="text-sm leading-relaxed italic"
          style={{ color: '#3A3A3A' }}
        >
          "{quote}"
        </p>
      </div>
    </div>
  </div>
);

const OurStorySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionHeight = sectionRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        // Calculate progress through the section
        const start = viewportHeight;
        const end = -sectionHeight;
        const current = rect.top;
        const progress = Math.max(0, Math.min(1, (start - current) / (start - end)));
        
        setScrollProgress(progress);
      }
    };

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-28 scroll-mt-24 our-story-section relative"
      style={{
        // Ultra-fine noise texture (print feel)
        backgroundImage: `
          linear-gradient(180deg, rgba(252, 248, 240, 0) 0%, rgba(248, 244, 235, 0.025) 50%, rgba(252, 248, 240, 0) 100%),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")
        `,
        backgroundBlendMode: 'overlay',
      }}
    >
      {/* Section-specific background (removes global effects) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'transparent',
        }}
      />
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main headline */}
          <div 
            className="text-center mb-16 md:mb-20 transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? 0 : 40}px)`,
            }}
          >
            <h2 
              className="text-3xl md:text-5xl lg:text-6xl tracking-tight mb-4"
              style={{ 
                color: '#1F1F1F', 
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              Naša priča
            </h2>
            <div 
              className="w-16 h-[3px] mx-auto mt-6"
              style={{ background: 'rgb(120, 95, 50)' }}
            />
          </div>

          {/* People Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24 max-w-3xl mx-auto">
            <PersonCard
              image={partner1}
              name="Ime Osobe"
              role="Suosnivač"
              quote="Vjerujemo da kvalitetan rad zaslužuje biti nagrađen, ne kažnjen."
              tilt={-2}
              delay={100}
              isVisible={isVisible}
            />
            <PersonCard
              image={partner2}
              name="Ime Osobe"
              role="Suosnivač"
              quote="Gradimo alate koje bismo i sami htjeli koristiti."
              tilt={2}
              delay={250}
              isVisible={isVisible}
            />
          </div>

          {/* Story Content with margin line */}
          <div className="max-w-3xl mx-auto relative pl-8 lg:pl-12">
            <StoryMarginLine scrollProgress={scrollProgress} />
            
            <div 
              className="space-y-8"
              style={{
                lineHeight: 1.85,
              }}
            >
              {/* First paragraph with emphasized first word */}
              <p 
                className="transition-all duration-700 ease-out"
                style={{
                  color: '#2A2A2A',
                  fontWeight: 400,
                  fontSize: '1.125rem',
                  opacity: isVisible ? 1 : 0,
                  transform: `translateY(${isVisible ? 0 : 20}px)`,
                  transitionDelay: '300ms',
                }}
              >
                <span 
                  className="font-semibold tracking-wide"
                  style={{ color: '#1F1F1F', fontWeight: 600 }}
                >
                  Upitomat
                </span>{' '}
                je nastao iz problema koje smo saznali iz prve ruke surađujući sa hrvatskim firmama.
              </p>

              {/* Quote block with highlight */}
              <div 
                className="py-6 transition-all duration-700 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: `translateY(${isVisible ? 0 : 20}px)`,
                  transitionDelay: '450ms',
                }}
              >
                <div 
                  className="space-y-3 pl-6"
                  style={{
                    borderLeft: '3px solid rgb(120, 95, 50)',
                  }}
                >
                  <p 
                    className="italic text-lg"
                    style={{ color: '#3A3A3A' }}
                  >
                    <HighlightedText>"Dobivam previše upita, a nemam vremena za sve pohvatati."</HighlightedText>
                  </p>
                  <p 
                    className="italic text-lg"
                    style={{ color: '#3A3A3A' }}
                  >
                    "Sve je razbacano, ne znam tko mi glavu nosi."
                  </p>
                  <p 
                    className="italic text-lg"
                    style={{ color: '#3A3A3A' }}
                  >
                    <HighlightedText>"Gubim sate svaki dan ponavljajući isto, da na kraju ne bude ništa."</HighlightedText>
                  </p>
                </div>
              </div>

              {/* Statement */}
              <p 
                className="text-xl md:text-2xl transition-all duration-700 ease-out"
                style={{
                  color: '#1F1F1F',
                  fontWeight: 600,
                  lineHeight: 1.5,
                  opacity: isVisible ? 1 : 0,
                  transform: `translateY(${isVisible ? 0 : 20}px)`,
                  transitionDelay: '600ms',
                }}
              >
                I to s nama jednostavno ne stoji.
              </p>

              {/* Body text */}
              <p 
                className="transition-all duration-700 ease-out"
                style={{
                  color: '#2A2A2A',
                  fontWeight: 400,
                  fontSize: '1.125rem',
                  opacity: isVisible ? 1 : 0,
                  transform: `translateY(${isVisible ? 0 : 20}px)`,
                  transitionDelay: '700ms',
                }}
              >
                Marljiv i kvalitetan rad zaslužuje biti nagrađen, a ne kažnjen.
              </p>

              {/* Highlighted statement */}
              <p 
                className="text-xl md:text-2xl transition-all duration-700 ease-out"
                style={{
                  color: '#1F1F1F',
                  fontWeight: 600,
                  lineHeight: 1.5,
                  opacity: isVisible ? 1 : 0,
                  transform: `translateY(${isVisible ? 0 : 20}px)`,
                  transitionDelay: '800ms',
                }}
              >
                <HighlightedText>Zato smo kreirali Upitomat.</HighlightedText>
              </p>

              {/* Closing text */}
              <p 
                className="transition-all duration-700 ease-out"
                style={{
                  color: '#2A2A2A',
                  fontWeight: 400,
                  fontSize: '1.125rem',
                  opacity: isVisible ? 1 : 0,
                  transform: `translateY(${isVisible ? 0 : 20}px)`,
                  transitionDelay: '900ms',
                }}
              >
                Kako bi vam poruke prestale uzimati dan, a posao opet imao mir i red.
              </p>

              {/* Question section */}
              <div 
                className="pt-8 mt-8 transition-all duration-700 ease-out"
                style={{
                  borderTop: '2px solid rgba(120, 95, 50, 0.3)',
                  opacity: isVisible ? 1 : 0,
                  transform: `translateY(${isVisible ? 0 : 20}px)`,
                  transitionDelay: '1000ms',
                }}
              >
                <p 
                  className="text-lg tracking-wide mb-3"
                  style={{ 
                    color: '#1F1F1F', 
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Jedno pitanje za vas:
                </p>
                <p 
                  className="text-lg"
                  style={{ color: '#4A4A4A' }}
                >
                  Na što biste radije potrošili vrijeme koje će vam danas ukrasti poruke?
                </p>
              </div>

              {/* CTA */}
              <div 
                className="flex flex-col items-start gap-3 pt-8 transition-all duration-700 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: `translateY(${isVisible ? 0 : 20}px)`,
                  transitionDelay: '1100ms',
                }}
              >
                <a
                  href="https://app.upitomat.hr/auth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 text-lg font-semibold tracking-wide transition-all duration-300 hover:translate-y-[-2px]"
                  style={{ 
                    background: 'rgb(120, 95, 50)',
                    color: 'white',
                    border: '3px solid rgb(90, 70, 35)',
                    boxShadow: '0 4px 20px rgba(120, 95, 50, 0.25)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgb(140, 110, 55)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(120, 95, 50, 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgb(120, 95, 50)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(120, 95, 50, 0.25)';
                  }}
                >
                  Isprobajte Upitomat
                </a>
                <p 
                  className="text-sm"
                  style={{ color: '#6A6A6A' }}
                >
                  Besplatno, bez obveze
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
