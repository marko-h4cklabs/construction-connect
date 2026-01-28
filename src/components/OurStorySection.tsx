import StaggeredText from "@/components/StaggeredText";
import partner1 from "@/assets/partner1.jpg";
import partner2 from "@/assets/partner2.jpg";

const OurStorySection = () => {
  return (
    <section className="py-12 md:py-20 scroll-mt-24 our-story-section">
      <div className="container mx-auto px-4">
        <StaggeredText className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-black text-scroll-heading mb-3 uppercase tracking-tight">
            Naša priča
          </h2>
          <p className="text-scroll-adaptive opacity-80 text-sm md:text-lg max-w-2xl mx-auto">
            Kako je Upitomat nastao i zašto radimo ono što radimo.
          </p>
        </StaggeredText>

        <div className="max-w-4xl mx-auto">
          {/* Partners grid */}
          <StaggeredText delay={200}>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10">
              <div className="bg-[rgba(248,244,235,0.4)] backdrop-blur-sm border-2 border-[rgb(35,35,35)]/60 p-4 md:p-6 transition-all duration-300 hover:border-[rgb(120,95,50)]/60">
                <div className="aspect-[4/3] overflow-hidden mb-4 border-2 border-[rgb(35,35,35)]/50">
                  <img 
                    src={partner1} 
                    alt="Partner 1" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-scroll-heading mb-1">Ime Osobe</h3>
                <p className="text-scroll-adaptive opacity-70 text-sm">Suosnivač</p>
              </div>
              
              <div className="bg-[rgba(248,244,235,0.4)] backdrop-blur-sm border-2 border-[rgb(35,35,35)]/60 p-4 md:p-6 transition-all duration-300 hover:border-[rgb(120,95,50)]/60">
                <div className="aspect-[4/3] overflow-hidden mb-4 border-2 border-[rgb(35,35,35)]/50">
                  <img 
                    src={partner2} 
                    alt="Partner 2" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-scroll-heading mb-1">Ime Osobe</h3>
                <p className="text-scroll-adaptive opacity-70 text-sm">Suosnivač</p>
              </div>
            </div>
          </StaggeredText>

          {/* Story content */}
          <StaggeredText delay={400}>
            <div className="bg-[rgba(248,244,235,0.4)] backdrop-blur-sm border-2 border-[rgb(35,35,35)]/60 p-6 md:p-8 space-y-6">
              <p className="text-scroll-adaptive opacity-90 text-base md:text-lg leading-relaxed">
                <span className="font-semibold text-scroll-heading">Upitomat</span> je nastao iz problema koje smo saznali iz prve ruke surađujući sa hrvatskim firmama.
              </p>
              
              <div className="pl-4 border-l-2 border-[rgb(120,95,50)]/50 space-y-2">
                <p className="text-scroll-adaptive opacity-80 italic">"Dobivam previše upita, a nemam vremena za sve pohvatati."</p>
                <p className="text-scroll-adaptive opacity-80 italic">"Sve je razbacano, ne znam tko mi glavu nosi."</p>
                <p className="text-scroll-adaptive opacity-80 italic">"Gubim sate svaki dan ponavljajući isto, da na kraju ne bude ništa."</p>
              </div>
              
              <p className="text-scroll-heading font-bold text-lg md:text-xl">
                I to s nama jednostavno ne stoji.
              </p>
              
              <p className="text-scroll-adaptive opacity-90 text-base md:text-lg leading-relaxed">
                Marljiv i kvalitetan rad zaslužuje biti nagrađen, a ne kažnjen. Zato smo kreirali Upitomat — kako bi vam poruke prestale uzimati dan, a posao opet imao mir i red.
              </p>
              
              <div className="pt-4 border-t-2 border-[rgb(35,35,35)]/30">
                <p className="text-scroll-heading font-semibold mb-2">Jedno pitanje za vas:</p>
                <p className="text-scroll-adaptive opacity-80">Na što biste radije potrošili vrijeme koje će vam danas ukrasti poruke?</p>
              </div>
              
              <div className="flex flex-col items-center gap-2 pt-4">
                <a
                  href="https://app.upitomat.hr/auth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-4 text-base md:text-lg bg-[rgb(120,95,50)] text-white font-bold uppercase tracking-wide border-2 border-[rgb(140,110,55)] focus-brutal transition-all duration-300 hover:translate-y-[-2px] hover:bg-[rgb(140,110,55)] hover:shadow-[0_0_35px_6px_rgba(180,140,60,0.4)]"
                  style={{ boxShadow: '0 0 25px 4px rgba(180,140,60,0.3)' }}
                >
                  Isprobajte Upitomat
                </a>
                <span className="text-sm text-scroll-adaptive opacity-70">
                  Besplatno, bez obveze
                </span>
              </div>
            </div>
          </StaggeredText>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
