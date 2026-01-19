const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 md:pt-44 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1
            className="text-[2.5rem] md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-foreground leading-tight animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="text-gradient">Nemate vremena.</span>
          </h1>

          {/* Subheadline */}
          <p
            className="mt-10 md:mt-12 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Upitomat odgovara na upite u <span className="font-semibold text-foreground">vašem stilu</span> te organizira sve razgovore i podatke u <span className="font-semibold text-foreground">jednom inboxu.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

