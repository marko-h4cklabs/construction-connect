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
              className="mt-8 md:mt-12 text-sm md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
            >
              <span className="font-bold text-foreground">Upitomat</span> odgovara na upite u <span className="font-bold text-foreground">vašem stilu</span> te organizira sve razgovore i podatke u{" "}
              <span className="block font-bold text-foreground">jednom inboxu.</span>
            </p>
          </StaggeredText>

          {/* CTA Button - premium glow */}
          <StaggeredText delay={400} className="mt-10 md:mt-14 flex flex-col items-center gap-3">
            <a
              href="https://app.upitomat.hr/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 text-base md:text-lg bg-primary text-primary-foreground font-bold uppercase tracking-wide border-2 border-foreground focus-brutal transition-all duration-300 hover:translate-y-[-2px]"
              style={{ 
                boxShadow: '0 0 30px 4px hsl(50 100% 50% / 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 40px 8px hsl(50 100% 50% / 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px 4px hsl(50 100% 50% / 0.3)';
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

export default HeroSection;
