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
            Upitomat vodi potencijalne kupce kroz vaša ključna pitanja i drži sve upite organizirane na jednom mjestu.
          </p>

          {/* Video Container with custom thumbnail */}
          <div 
            className="relative rounded-2xl overflow-hidden shadow-card-hover animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/t5guw03Rgbg"
                title="Upitomat VSL"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                srcDoc={`
                  <style>
                    * { margin: 0; padding: 0; width: 100%; height: 100%; }
                    a { display: flex; align-items: center; justify-content: center; background: url('/vsl-thumbnail.png') center/cover no-repeat; }
                    a::after { content: ''; position: absolute; width: 68px; height: 48px; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 48"><path fill="%23f00" d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"/><path fill="%23fff" d="M45 24L27 14v20"/></svg>') center/contain no-repeat; }
                  </style>
                  <a href="https://www.youtube.com/embed/t5guw03Rgbg?autoplay=1"></a>
                `}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
