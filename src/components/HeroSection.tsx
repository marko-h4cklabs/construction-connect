const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Vaši klijenti žele odgovore odmah.{" "}
            <span className="text-gradient">Vi nemate vremena.</span>
          </h1>

          {/* Subheadline */}
          <p
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Upitomat je inteligentni chatbot koji odgovara na upite umjesto vas i vodi komunikaciju u vašem jeziku i stilu.
          </p>
          <p
            className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            Sve razgovore i prikupljene podatke automatski sprema u jedan organizirani inbox s potpunim pregledom svih upita.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

