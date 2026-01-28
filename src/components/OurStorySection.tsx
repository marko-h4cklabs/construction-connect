import partner1 from "@/assets/partner1.jpg";
import partner2 from "@/assets/partner2.jpg";
import StaggeredText from "@/components/StaggeredText";

const OurStorySection = () => {
  return (
    <section className="py-16 md:py-20 scroll-mt-24 our-story-section">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Headline - mobile */}
          <StaggeredText>
            <h2 className="text-2xl md:text-4xl font-black text-scroll-heading mb-8 text-center lg:text-left lg:hidden uppercase tracking-tight">
              Naša priča
            </h2>
          </StaggeredText>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Images */}
            <StaggeredText delay={100} className="order-1 lg:order-1">
              <div className="relative w-full h-52 md:h-96 flex items-center justify-center">
                <div className="absolute left-4 md:left-8 w-40 md:w-52 aspect-square border-2 border-[rgb(74,74,74)]/50 overflow-hidden transform -rotate-6 hover:-rotate-3 transition-all duration-500 hover:border-[rgb(120,95,50)]/70 hover:shadow-[0_8px_30px_rgba(120,95,50,0.15)]">
                  <img 
                    src={partner1} 
                    alt="Partner 1" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute right-4 md:right-8 w-40 md:w-52 aspect-square border-2 border-[rgb(74,74,74)]/50 overflow-hidden transform rotate-6 hover:rotate-3 transition-all duration-500 z-10 hover:border-[rgb(120,95,50)]/70 hover:shadow-[0_8px_30px_rgba(120,95,50,0.15)]">
                  <img 
                    src={partner2} 
                    alt="Partner 2" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </StaggeredText>

            {/* Content */}
            <div className="order-2 lg:order-2">
              <StaggeredText delay={200}>
                <h2 className="hidden lg:block text-3xl md:text-4xl font-black text-scroll-heading mb-6 uppercase tracking-tight">
                  Naša priča
                </h2>
              </StaggeredText>
              
              <div className="space-y-4 text-scroll-adaptive opacity-85 leading-relaxed">
                <StaggeredText delay={300}>
                  <p>
                    Upitomat je nastao iz problema kojih smo saznali iz prve ruke surađujući sa hrvatskim firmama.
                  </p>
                </StaggeredText>
                
                <StaggeredText delay={400}>
                  <div className="space-y-2 pl-4 border-l-2 border-[rgb(120,95,50)]/60 italic text-scroll-adaptive opacity-90">
                    <p>"Dobivam previše upita, a nemam vremena za sve pohvatati."</p>
                    <p>"Sve je razbacano, ne znam tko mi glavu nosi."</p>
                    <p>"Gubim sate svaki dan ponavljajući isto, da na kraju ne bude ništa."</p>
                  </div>
                </StaggeredText>
                
                <StaggeredText delay={500}>
                  <p className="font-bold text-scroll-heading">
                    I to s nama jednostavno ne stoji.
                  </p>
                </StaggeredText>
                
                <StaggeredText delay={600}>
                  <p>
                    Marljiv i kvalitetan rad zaslužuje biti nagrađen, a ne kažnjen.
                  </p>
                </StaggeredText>
                
                <StaggeredText delay={700}>
                  <p className="font-bold text-scroll-heading">
                    Zato smo kreirali Upitomat.
                  </p>
                </StaggeredText>
                
                <StaggeredText delay={800}>
                  <p>
                    Kako bi vam poruke prestale uzimati dan, a posao opet imao mir i red.
                  </p>
                </StaggeredText>
                
                <StaggeredText delay={900}>
                  <div className="pt-4 mt-4 border-t-2 border-[rgb(74,74,74)]/30">
                    <p className="text-scroll-heading font-bold uppercase tracking-tight">
                      Jedno pitanje za vas:
                    </p>
                    <p className="text-scroll-adaptive opacity-70 mt-2">
                      Na što biste radije potrošili vrijeme koje će vam danas ukrasti poruke?
                    </p>
                  </div>
                </StaggeredText>
              </div>
              
              {/* CTA Button */}
              <StaggeredText delay={1000} className="flex flex-col items-center lg:items-start gap-3 mt-8">
                <a
                  href="https://app.upitomat.hr/auth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 text-lg bg-[rgb(120,95,50)] text-white font-bold uppercase tracking-wide border-2 border-[rgb(140,110,55)] focus-brutal transition-all duration-300 hover:translate-y-[-2px] hover:bg-[rgb(140,110,55)] hover:shadow-[0_0_35px_6px_rgba(180,140,60,0.4)]"
                  style={{ boxShadow: '0 0 25px 4px rgba(180,140,60,0.3)' }}
                >
                  Isprobajte Upitomat
                </a>
                <p className="text-sm text-scroll-adaptive opacity-70">
                  Besplatno, bez obveze
                </p>
              </StaggeredText>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;