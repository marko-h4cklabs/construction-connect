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
              {/* First photo - flat, no rotation */}
              <div 
                className="w-[42%] md:w-[35%] max-w-[220px] bg-card/40 backdrop-blur-sm border-2 border-border p-2 transition-all duration-500 hover:scale-105 hover:border-primary/50"
              >
                <div className="w-full overflow-hidden border border-border/50" style={{ aspectRatio: '3/3.4' }}>
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
              
              {/* Second photo - flat, no rotation */}
              <div 
                className="w-[42%] md:w-[35%] max-w-[220px] bg-card/40 backdrop-blur-sm border-2 border-border p-2 transition-all duration-500 hover:scale-105 hover:border-primary/50"
              >
                <div className="w-full overflow-hidden border border-border/50" style={{ aspectRatio: '3/3.4' }}>
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

          {/* Story content - clean, calm, readable */}
          <StaggeredText delay={400}>
            <div className="bg-card/20 backdrop-blur-sm border border-border/40 p-8 md:p-12 transition-all duration-500">
              
              {/* Intro block */}
              <p className="text-muted-foreground text-base md:text-lg leading-loose mb-10">
                <span className="font-semibold text-foreground">Upitomat</span> je nastao iz problema koje smo saznali iz prve ruke surađujući sa hrvatskim firmama.
              </p>
              
              {/* Quotes block - grouped, subtle, breathable */}
              <div className="pl-5 border-l border-primary/30 space-y-5 mb-12">
                <p className="text-muted-foreground/80 italic leading-relaxed">"Dobivam previše upita, a nemam vremena za sve pohvatati."</p>
                <p className="text-muted-foreground/80 italic leading-relaxed">"Sve je razbacano, ne znam tko mi glavu nosi."</p>
                <p className="text-muted-foreground/80 italic leading-relaxed">"Gubim sate svaki dan ponavljajući isto, da na kraju ne bude ništa."</p>
              </div>
              
              {/* Highlighted statement - clearly separated */}
              <p className="text-xl md:text-2xl font-bold text-primary py-8 my-8 border-y border-border/30">
                I to s nama jednostavno ne stoji.
              </p>
              
              {/* Conclusion block */}
              <p className="text-muted-foreground text-base md:text-lg leading-loose mb-12">
                Marljiv i kvalitetan rad zaslužuje biti nagrađen, a ne kažnjen. Zato smo kreirali Upitomat — kako bi vam poruke prestale uzimati dan, a posao opet imao mir i red.
              </p>
              
              {/* Question block - focused */}
              <div className="pt-8 border-t border-border/30">
                <h3 className="text-sm md:text-base font-semibold text-foreground/80 uppercase tracking-wide mb-4">
                  Jedno pitanje za vas:
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Na što biste radije potrošili vrijeme koje će vam danas ukrasti poruke?
                </p>
              </div>
            </div>
          </StaggeredText>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
