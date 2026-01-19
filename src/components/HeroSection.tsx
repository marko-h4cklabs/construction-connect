const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-8 leading-tight animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Ušteđeno vrijeme.{" "}
            <span className="text-gradient">Organizirani upiti.</span>
          </h1>

          {/* CTA Button */}
          <div
            className="animate-fade-up flex flex-col items-center gap-2"
            style={{ animationDelay: "0.2s" }}
          >
            <a
              href="https://nurturehub-ai.lovable.app"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
            >
              Isprobajte Upitomat odmah
            </a>
            <p className="text-sm text-muted-foreground">
              14 dana besplatno, bez obveze
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

