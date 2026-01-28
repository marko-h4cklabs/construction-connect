const HeroSection = () => {
  return (
    <section className="pt-24 pb-12 md:pt-36 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground leading-none tracking-tighter"
          >
            <span className="text-gradient">Nemate vremena.</span>
          </h1>

          {/* Subheadline */}
          <p
            className="mt-6 md:mt-10 text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            <span className="font-bold text-foreground">Upitomat</span> odgovara na upite u <span className="font-bold text-foreground">vašem stilu</span> te organizira sve razgovore i podatke u <span className="font-bold text-foreground">jednom inboxu.</span>
          </p>

          {/* CTA Button - Brutalist style */}
          <div
            className="mt-8 md:mt-10 flex flex-col items-center gap-3"
          >
            <a
              href="https://app.upitomat.hr/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal px-8 py-4 text-base md:text-lg focus-brutal"
            >
              Isprobajte Upitomat
            </a>
            <span className="text-sm text-muted-foreground uppercase tracking-wide">
              Besplatno, bez obveze
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
