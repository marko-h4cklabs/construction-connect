import { Play } from "lucide-react";

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
            className="relative rounded-2xl overflow-hidden shadow-card-hover bg-primary animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="aspect-video relative">
              {/* Replace this div with your actual video embed */}
              {/* Example YouTube embed: */}
              {/* <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                title="Upitomat Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              /> */}
              
              {/* Placeholder until video is added */}
              <div className="absolute inset-0 bg-hero-gradient flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-accent/30 transition-colors group">
                    <div className="w-16 h-16 rounded-full bg-accent-gradient flex items-center justify-center shadow-accent group-hover:scale-105 transition-transform">
                      <Play className="w-8 h-8 text-accent-foreground ml-1" />
                    </div>
                  </div>
                  <p className="text-primary-foreground text-lg font-medium">
                    Dodajte URL vašeg videa ovdje
                  </p>
                  <p className="text-primary-foreground/60 text-sm mt-2">
                    Podržava YouTube, Vimeo ili direktne video datoteke
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
