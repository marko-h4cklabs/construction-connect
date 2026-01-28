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
          {/* Fan-style photos - side by side like holding cards */}
          <StaggeredText delay={200}>
            <div className="flex justify-center items-end gap-4 md:gap-6 mb-10 md:mb-14">
              {/* First photo - left card, slight tilt */}
              <div 
                className="w-[42%] md:w-[35%] max-w-[220px] bg-[rgba(248,244,235,0.4)] backdrop-blur-sm border-[1.5px] border-[rgb(64,64,64)] p-2 transition-all duration-500 hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] -rotate-3 origin-bottom"
              >
                <div className="w-full aspect-[3/4] overflow-hidden border border-[rgb(64,64,64)]/50">
                  <img 
                    src={partner1} 
                    alt="Partner 1" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-2 pb-1 px-1">
                  <p className="text-scroll-heading font-semibold text-xs md:text-sm">Marko</p>
                  <p className="text-scroll-adaptive opacity-60 text-[10px] md:text-xs">Suosnivač</p>
                </div>
              </div>
              
              {/* Second photo - right card, opposite tilt */}
              <div 
                className="w-[42%] md:w-[35%] max-w-[220px] bg-[rgba(248,244,235,0.4)] backdrop-blur-sm border-[1.5px] border-[rgb(64,64,64)] p-2 transition-all duration-500 hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] rotate-3 origin-bottom"
              >
                <div className="w-full aspect-[3/4] overflow-hidden border border-[rgb(64,64,64)]/50">
                  <img 
                    src={partner2} 
                    alt="Partner 2" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-2 pb-1 px-1">
                  <p className="text-scroll-heading font-semibold text-xs md:text-sm">Erik</p>
                  <p className="text-scroll-adaptive opacity-60 text-[10px] md:text-xs">Suosnivač</p>
                </div>
              </div>
            </div>
          </StaggeredText>

          {/* Story content */}
          <StaggeredText delay={400}>
            <div className="bg-[rgba(248,244,235,0.4)] backdrop-blur-sm border-[2px] border-[rgb(64,64,64)] p-6 md:p-8 space-y-6">
              <p className="text-scroll-adaptive opacity-90 text-base md:text-lg leading-relaxed">
                <span className="font-semibold text-scroll-heading">Upitomat</span> je nastao iz problema koje smo saznali iz prve ruke surađujući sa hrvatskim firmama.
              </p>
              
              <div className="pl-4 border-l-[2px] border-[rgb(64,64,64)]/60 space-y-2">
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
              
              <div className="pt-4 border-t-[2px] border-[rgb(64,64,64)]/40">
                <p className="text-scroll-heading font-semibold mb-2">Jedno pitanje za vas:</p>
                <p className="text-scroll-adaptive opacity-80">Na što biste radije potrošili vrijeme koje će vam danas ukrasti poruke?</p>
              </div>
            </div>
          </StaggeredText>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
