const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 md:pt-44 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline - one word per line */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-foreground leading-[0.9] tracking-tighter"
          >
            <span className="text-gradient block">Nemate</span>
            <span className="text-gradient block">vremena.</span>
          </h1>

          {/* Subheadline */}
          <p
            className="mt-8 md:mt-12 text-sm md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            <span className="font-bold text-foreground">Upitomat</span> odgovara na upite u <span className="font-bold text-foreground">vašem stilu</span> te organizira sve razgovore i podatke u{" "}
            <span className="block font-bold text-foreground">jednom inboxu.</span>
          </p>

          {/* CTA Button - clean edges, subtle glow */}
          <div
            className="mt-10 md:mt-14 flex flex-col items-center gap-3"
          >
            <a
              href="https://app.upitomat.hr/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow px-8 py-4 text-base md:text-lg bg-primary text-primary-foreground font-bold uppercase tracking-wide border-2 border-foreground focus-brutal transition-all duration-150 hover:translate-y-[-2px]"
            >
              Isprobajte Upitomat
            </a>
            <span className="text-sm text-muted-foreground tracking-wide">
              Besplatno, bez obveze
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
