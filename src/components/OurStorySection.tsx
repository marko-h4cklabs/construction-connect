import StaggeredText from "@/components/StaggeredText";
import partner1 from "@/assets/partner1.jpg";
import partner2 from "@/assets/partner2.jpg";

const OurStorySection = () => {
  return (
    <section className="py-12 md:py-20 scroll-mt-24 our-story-section overflow-hidden">
      <div className="container mx-auto px-4">
        <StaggeredText className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-black text-foreground mb-3 uppercase tracking-tight">
            Naša priča
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
            Kako je Upitomat nastao i zašto radimo ono što radimo.
          </p>
        </StaggeredText>

        <div className="max-w-4xl mx-auto">
          {/* Fan-style photos */}
          <StaggeredText delay={200}>
            <div className="flex justify-center items-end gap-4 md:gap-6 mb-10 md:mb-14">
              {/* First photo */}
              <div 
                className="w-[42%] md:w-[35%] max-w-[220px] bg-card/40 backdrop-blur-sm border-2 border-border p-2 transition-all duration-500 hover:scale-105 hover:border-primary/50 hover:shadow-[0_8px_40px_rgba(255,220,100,0.15)] -rotate-3 origin-bottom"
              >
                <div className="w-full aspect-[3/4] overflow-hidden border border-border/50">
                  <img 
                    src={partner1} 
                    alt="Partner 1" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-2 pb-1 px-1">
                  <p className="text-foreground font-semibold text-xs md:text-sm relative inline-block">
                    <span className="border-b-2 border-primary/60">Marko</span>
                  </p>
                  <p className="text-muted-foreground text-[10px] md:text-xs">Suosnivač</p>
                </div>
              </div>
              
              {/* Second photo */}
              <div 
                className="w-[42%] md:w-[35%] max-w-[220px] bg-card/40 backdrop-blur-sm border-2 border-border p-2 transition-all duration-500 hover:scale-105 hover:border-primary/50 hover:shadow-[0_8px_40px_rgba(255,220,100,0.15)] rotate-3 origin-bottom"
              >
                <div className="w-full aspect-[3/4] overflow-hidden border border-border/50">
                  <img 
                    src={partner2} 
                    alt="Partner 2" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-2 pb-1 px-1">
                  <p className="text-foreground font-semibold text-xs md:text-sm relative inline-block">
                    <span className="border-b-2 border-primary/60">Erik</span>
                  </p>
                  <p className="text-muted-foreground text-[10px] md:text-xs">Suosnivač</p>
                </div>
              </div>
            </div>
          </StaggeredText>

          {/* Story content */}
          <StaggeredText delay={400}>
            <div className="bg-card/40 backdrop-blur-sm border-2 border-border p-6 md:p-8 space-y-6 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_50px_-15px_hsl(50_100%_50%/0.2)]">
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                <span className="font-semibold text-foreground">Upitomat</span> je nastao iz problema koje smo saznali iz prve ruke surađujući sa hrvatskim firmama.
              </p>
              
              <div className="pl-4 border-l-2 border-primary/40 space-y-2">
                <p className="text-muted-foreground italic">"Dobivam previše upita, a nemam vremena za sve pohvatati."</p>
                <p className="text-muted-foreground italic">"Sve je razbacano, ne znam tko mi glavu nosi."</p>
                <p className="text-muted-foreground italic">"Gubim sate svaki dan ponavljajući isto, da na kraju ne bude ništa."</p>
              </div>
              
              <p className="text-lg md:text-xl font-bold text-foreground relative inline-block">
                <span className="relative z-10 px-2 py-1" style={{ 
                  background: 'linear-gradient(90deg, hsl(50 100% 50% / 0.15), hsl(50 100% 50% / 0.25), hsl(50 100% 50% / 0.15))',
                  boxShadow: '0 0 25px 5px hsl(50 100% 50% / 0.1)' 
                }}>
                  I to s nama jednostavno ne stoji.
                </span>
              </p>
              
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Marljiv i kvalitetan rad zaslužuje biti nagrađen, a ne kažnjen. Zato smo kreirali Upitomat — kako bi vam poruke prestale uzimati dan, a posao opet imao mir i red.
              </p>
              
              <div className="pt-4 border-t-2 border-border/60">
                <p className="font-semibold mb-2 text-foreground relative inline-block">
                  <span className="relative z-10 px-2 py-1" style={{ 
                    background: 'linear-gradient(90deg, hsl(50 100% 50% / 0.15), hsl(50 100% 50% / 0.25), hsl(50 100% 50% / 0.15))',
                    boxShadow: '0 0 25px 5px hsl(50 100% 50% / 0.1)' 
                  }}>
                    Jedno pitanje za vas:
                  </span>
                </p>
                <p className="text-muted-foreground mt-2">Na što biste radije potrošili vrijeme koje će vam danas ukrasti poruke?</p>
              </div>
            </div>
          </StaggeredText>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
