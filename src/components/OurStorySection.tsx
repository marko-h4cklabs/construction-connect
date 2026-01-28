import StaggeredText from "@/components/StaggeredText";
import partner1 from "@/assets/partner1.jpg";
import partner2 from "@/assets/partner2.jpg";

const OurStorySection = () => {
  return (
    <section className="py-12 md:py-20 scroll-mt-24 our-story-section overflow-hidden">
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
          {/* Overlapping photos */}
          <StaggeredText delay={200}>
            <div className="relative h-[280px] md:h-[380px] mb-10 md:mb-14">
              {/* First photo - left, rotated */}
              <div 
                className="absolute left-1/2 -translate-x-[70%] md:-translate-x-[65%] top-0 w-[55%] md:w-[48%] aspect-square bg-[rgba(248,244,235,0.4)] backdrop-blur-sm border-[3px] border-[rgb(20,20,20)] p-2 md:p-3 transition-all duration-500 hover:z-20 hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] -rotate-6"
                style={{ zIndex: 10 }}
              >
                <div className="w-full h-full overflow-hidden border-2 border-[rgb(20,20,20)]/60">
                  <img 
                    src={partner1} 
                    alt="Partner 1" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5">
                  <p className="text-scroll-heading font-bold text-sm md:text-base">Ime Osobe</p>
                  <p className="text-scroll-adaptive opacity-70 text-xs md:text-sm">Suosnivač</p>
                </div>
              </div>
              
              {/* Second photo - right, rotated opposite */}
              <div 
                className="absolute left-1/2 -translate-x-[30%] md:-translate-x-[35%] top-4 md:top-6 w-[55%] md:w-[48%] aspect-square bg-[rgba(248,244,235,0.4)] backdrop-blur-sm border-[3px] border-[rgb(20,20,20)] p-2 md:p-3 transition-all duration-500 hover:z-20 hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] rotate-4"
                style={{ zIndex: 9 }}
              >
                <div className="w-full h-full overflow-hidden border-2 border-[rgb(20,20,20)]/60">
                  <img 
                    src={partner2} 
                    alt="Partner 2" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5">
                  <p className="text-scroll-heading font-bold text-sm md:text-base">Ime Osobe</p>
                  <p className="text-scroll-adaptive opacity-70 text-xs md:text-sm">Suosnivač</p>
                </div>
              </div>
            </div>
          </StaggeredText>

          {/* Story content */}
          <StaggeredText delay={400}>
            <div className="bg-[rgba(248,244,235,0.4)] backdrop-blur-sm border-[3px] border-[rgb(20,20,20)] p-6 md:p-8 space-y-6">
              <p className="text-scroll-adaptive opacity-90 text-base md:text-lg leading-relaxed">
                <span className="font-semibold text-scroll-heading">Upitomat</span> je nastao iz problema koje smo saznali iz prve ruke surađujući sa hrvatskim firmama.
              </p>
              
              <div className="pl-4 border-l-[3px] border-[rgb(20,20,20)]/60 space-y-2">
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
              
              <div className="pt-4 border-t-[3px] border-[rgb(20,20,20)]/40">
                <p className="text-scroll-heading font-semibold mb-2">Jedno pitanje za vas:</p>
                <p className="text-scroll-adaptive opacity-80">Na što biste radije potrošili vrijeme koje će vam danas ukrasti poruke?</p>
              </div>
              
              <div className="flex flex-col items-center gap-2 pt-4">
                <a
                  href="https://app.upitomat.hr/auth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-4 text-base md:text-lg bg-[rgb(120,95,50)] text-white font-bold uppercase tracking-wide border-[3px] border-[rgb(90,70,35)] focus-brutal transition-all duration-300 hover:translate-y-[-2px] hover:bg-[rgb(140,110,55)] hover:shadow-[0_0_35px_6px_rgba(180,140,60,0.4)]"
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
