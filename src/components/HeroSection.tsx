const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">

          {/* Headline */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Ušteđeno vrijeme.{" "}
            <span className="text-gradient">Organizirani upiti.</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Upitomat vodi kupce kroz vaša unaprijed postavljena pitanja i drži sve upite organizirane na jednom mjestu.
          </p>

          {/* Video Container */}
          <div 
            className="relative rounded-2xl overflow-hidden shadow-card-hover animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="aspect-video">
              <video
                className="w-full h-full object-cover"
                controls
                poster="/images/video-thumbnail.png"
              >
                <source src="/videos/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
