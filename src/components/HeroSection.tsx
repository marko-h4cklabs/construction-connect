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
            Ušteđeno vrijeme.{" "}
            <span className="text-gradient">Organizirani upiti.</span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

