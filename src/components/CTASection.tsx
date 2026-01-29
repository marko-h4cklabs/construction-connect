import { useState, useEffect, useRef } from "react";
import StaggeredText from "@/components/StaggeredText";

const CTASection = () => {
  const [isPulsing, setIsPulsing] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Subtle glow pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <StaggeredText>
            <h2 className="text-2xl md:text-4xl font-black text-foreground mb-6 uppercase tracking-tight">
              VRATITE SI <span className="text-gradient">VAŠE VRIJEME</span>
            </h2>
          </StaggeredText>
          <StaggeredText delay={200} className="flex flex-col items-center gap-3">
            <a
              ref={buttonRef}
              href="https://app.upitomat.hr/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 text-lg bg-primary text-primary-foreground font-bold uppercase tracking-wide border-2 border-foreground focus-brutal transition-all duration-500 hover:translate-y-[-2px]"
              style={{ 
                boxShadow: isPulsing 
                  ? '0 0 35px 6px hsl(50 100% 50% / 0.35)' 
                  : '0 0 20px 3px hsl(50 100% 50% / 0.2)',
                transition: 'box-shadow 0.8s ease-out, transform 0.3s ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px 5px hsl(50 100% 50% / 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = isPulsing 
                  ? '0 0 35px 6px hsl(50 100% 50% / 0.35)' 
                  : '0 0 20px 3px hsl(50 100% 50% / 0.2)';
              }}
            >
              Isprobajte Upitomat
            </a>
            <span className="text-sm text-muted-foreground tracking-wide">
              Besplatno, bez obveze
            </span>
          </StaggeredText>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
