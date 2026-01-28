import partner1 from "@/assets/partner1.jpg";
import partner2 from "@/assets/partner2.jpg";

const OurStorySection = () => {
  return (
    <section id="nasa-prica" className="py-16 md:py-24 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Headline - mobile */}
          <h2 className="text-2xl md:text-4xl font-black text-primary-foreground mb-8 text-center lg:text-left lg:hidden uppercase tracking-tight">
            Naša priča
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Images */}
            <div className="order-1 lg:order-1">
              <div className="relative w-full h-52 md:h-96 flex items-center justify-center">
                <div className="absolute left-4 md:left-8 w-40 md:w-52 aspect-square border-2 border-primary-foreground/30 overflow-hidden transform -rotate-6 hover:-rotate-3 transition-transform duration-150 hover:border-primary-foreground">
                  <img 
                    src={partner1} 
                    alt="Partner 1" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute right-4 md:right-8 w-40 md:w-52 aspect-square border-2 border-primary-foreground/30 overflow-hidden transform rotate-6 hover:rotate-3 transition-transform duration-150 z-10 hover:border-primary-foreground">
                  <img 
                    src={partner2} 
                    alt="Partner 2" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-2 lg:order-2">
              <h2 className="hidden lg:block text-3xl md:text-4xl font-black text-primary-foreground mb-6 uppercase tracking-tight">
                Naša priča
              </h2>
              
              <div className="space-y-4 text-primary-foreground/70 leading-relaxed">
                <p>
                  Upitomat je nastao iz problema kojih smo saznali iz prve ruke surađujući sa hrvatskim firmama.
                </p>
                
                <div className="space-y-2 pl-4 border-l-2 border-primary-foreground italic text-primary-foreground">
                  <p>"Dobivam previše upita, a nemam vremena za sve pohvatati."</p>
                  <p>"Sve je razbacano, ne znam tko mi glavu nosi."</p>
                  <p>"Gubim sate svaki dan ponavljajući isto, da na kraju ne bude ništa."</p>
                </div>
                
                <p className="font-bold text-primary-foreground">
                  I to s nama jednostavno ne stoji.
                </p>
                
                <p>
                  Marljiv i kvalitetan rad zaslužuje biti nagrađen, a ne kažnjen.
                </p>
                
                <p className="font-bold text-primary-foreground">
                  Zato smo kreirali Upitomat.
                </p>
                
                <p>
                  Kako bi vam poruke prestale uzimati dan, a posao opet imao mir i red.
                </p>
                
                <div className="pt-4 mt-4 border-t-2 border-primary-foreground/30">
                  <p className="text-primary-foreground font-bold uppercase tracking-tight">
                    Jedno pitanje za vas:
                  </p>
                  <p className="text-primary-foreground/70 mt-2">
                    Na što biste radije potrošili vrijeme koje će vam danas ukrasti poruke?
                  </p>
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="flex flex-col items-center lg:items-start gap-3 mt-8">
                <a
                  href="https://app.upitomat.hr/auth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 text-lg bg-primary-foreground text-primary font-bold uppercase tracking-wide border-2 border-primary-foreground focus-brutal transition-all duration-150 hover:translate-y-[-2px]"
                  style={{ boxShadow: '0 0 20px 2px hsl(0 0% 5% / 0.4)' }}
                >
                  Isprobajte Upitomat
                </a>
                <p className="text-sm text-primary-foreground/70">
                  Besplatno, bez obveze
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
