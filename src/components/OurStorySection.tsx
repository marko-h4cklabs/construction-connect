import StaggeredText from "@/components/StaggeredText";
import partner1 from "@/assets/partner1.jpg";
import partner2 from "@/assets/partner2.jpg";

const OurStorySection = () => {
  return (
    <section className="py-12 md:py-20 scroll-mt-24 our-story-section overflow-hidden">
      <div className="container mx-auto px-4">
        <StaggeredText className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-black text-foreground mb-3 uppercase tracking-tight">
            Naša <span className="text-gradient">priča</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-[85%] mx-auto">
            Kako je Upitomat nastao i zašto radimo ono što radimo.
          </p>
        </StaggeredText>

        <div className="max-w-4xl mx-auto">
          {/* Fan-style photos */}
          <StaggeredText delay={200}>
            <div className="flex justify-center items-end gap-4 md:gap-6 mb-8 md:mb-10">
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
                <div className="pt-2 pb-1 px-1 text-center">
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
                <div className="pt-2 pb-1 px-1 text-center">
                  <p className="text-foreground font-semibold text-xs md:text-sm relative inline-block">
                    <span className="border-b-2 border-primary/60">Erik</span>
                  </p>
                  <p className="text-muted-foreground text-[10px] md:text-xs">Suosnivač</p>
                </div>
              </div>
            </div>
          </StaggeredText>

          {/* Story content - clean, structured in 4 blocks */}
          <StaggeredText delay={400}>
            <div 
              className="relative transition-all duration-500 text-center"
              style={{
                // Reduced grid/noise via lower opacity background
                background: 'linear-gradient(180deg, hsl(var(--card) / 0.1) 0%, transparent 100%)',
              }}
            >
              {/* Max-width container - 80% width */}
              <div className="max-w-[85%] mx-auto px-4 md:px-0">
                
                {/* Block 1: Intro paragraph */}
                <p className="text-muted-foreground text-base leading-[1.8] mb-6 md:mb-8">
                  <span className="font-semibold text-foreground">Upitomat</span> je nastao iz problema koje smo saznali iz prve ruke surađujući sa hrvatskim firmama.
                </p>
                
                {/* Block 2: Quotes - grouped with subtle yellow marker */}
                <div className="relative mb-4 md:mb-5 py-3">
                  {/* Subtle yellow vertical line marker */}
                  <div 
                    className="absolute left-0 md:left-4 top-0 bottom-0 w-0.5"
                    style={{
                      background: 'linear-gradient(180deg, transparent 0%, hsl(50 100% 50% / 0.4) 20%, hsl(50 100% 50% / 0.4) 80%, transparent 100%)',
                    }}
                  />
                  
                  <div className="space-y-3 md:space-y-4 pl-4 md:pl-10 text-left">
                    <p className="text-muted-foreground/80 italic leading-[1.8] text-base">
                      "Dobivam previše upita, a nemam vremena za sve pohvatati."
                    </p>
                    <p className="text-muted-foreground/80 italic leading-[1.8] text-base">
                      "Sve je razbacano, ne znam tko mi glavu nosi."
                    </p>
                    <p className="text-muted-foreground/80 italic leading-[1.8] text-base">
                      "Gubim sate svaki dan ponavljajući isto, da na kraju ne bude ništa."
                    </p>
                  </div>
                </div>
                
                {/* Block 3: Highlighted statement - CAPS, same base font size */}
                <div className="py-3 md:py-4 mb-4 md:mb-5">
                  <p className="text-base font-bold text-primary leading-[1.6] uppercase tracking-wide">
                    I TO S NAMA JEDNOSTAVNO NE STOJI.
                  </p>
                </div>
                
                {/* Block 4: Conclusion + Question */}
                <div className="space-y-4 md:space-y-5">
                  {/* Conclusion paragraph */}
                  <p className="text-muted-foreground text-base leading-[1.8]">
                    Marljiv i kvalitetan rad zaslužuje biti nagrađen, a ne kažnjen.
                  </p>
                  <p className="text-muted-foreground text-base leading-[1.8]">
                    Zato smo kreirali Upitomat. Kako bi vam poruke prestale krasti vrijeme, a posao opet imao mir i red.
                  </p>
                  
                  {/* Question block */}
                  <div className="pt-3 md:pt-4">
                    <h3 className="text-base font-semibold text-foreground/80 uppercase tracking-wide mb-3">
                      Jedno pitanje za vas:
                    </h3>
                    <div className="py-2 md:py-3">
                      <p className="text-muted-foreground text-base leading-[1.8]">
                        Na što biste radije potrošili vrijeme koje će vam danas ukrasti poruke?
                      </p>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </StaggeredText>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
