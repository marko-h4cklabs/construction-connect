import StaggeredText from "@/components/StaggeredText";

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline - one word per line with stagger */}
          <StaggeredText>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-foreground leading-[0.85] tracking-tighter"
            >
              <span className="text-gradient block mb-4 md:mb-6">Nemate</span>
              <span className="text-gradient block">vremena.</span>
            </h1>
          </StaggeredText>

          {/* Subheadline */}
          <StaggeredText delay={200}>
            <p
              className="mt-8 md:mt-12 text-base md:text-lg text-muted-foreground max-w-[85%] mx-auto leading-relaxed"
            >
              <span className="block"><span className="font-bold text-foreground">Upitomat</span> odgovara na upite u</span>
              <span className="block"><span className="font-bold text-foreground">vašem stilu</span> te organizira sve</span>
              <span className="block">razgovore i podatke u <span className="font-bold text-foreground">jednom inboxu.</span></span>
            </p>
          </StaggeredText>

          {/* CTA Button - premium glow */}
          <StaggeredText delay={400} className="mt-10 md:mt-14 flex flex-col items-center gap-3">
            <a
              href="https://app.upitomat.hr/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 text-base md:text-lg bg-primary text-primary-foreground font-black uppercase tracking-wide border-2 border-foreground transition-all duration-300 hover:translate-y-[-2px]"
              style={{ 
                boxShadow: '0 0 20px 3px hsl(50 100% 50% / 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px 5px hsl(50 100% 50% / 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px 3px hsl(50 100% 50% / 0.2)';
              }}
            >
              ISPROBAJTE UPITOMAT
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

export default HeroSection;
