import partner1 from "@/assets/partner1.jpg";
import partner2 from "@/assets/partner2.jpg";

const OurStorySection = () => {
  return (
    <section id="nasa-prica" className="py-16 md:py-24 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Headline - centered on mobile */}
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center lg:text-left lg:hidden">
            Naša priča
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Fan-style overlapping images - shown after headline on mobile */}
            <div className="order-1 lg:order-1">
              <div className="relative w-full h-52 md:h-96 flex items-center justify-center">
                {/* First image - rotated left */}
                <div className="absolute left-4 md:left-8 w-40 md:w-52 aspect-square rounded-2xl border-2 border-border overflow-hidden shadow-lg transform -rotate-6 hover:-rotate-3 transition-transform duration-300">
                  <img 
                    src={partner1} 
                    alt="Partner 1" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Second image - rotated right, overlapping */}
                <div className="absolute right-4 md:right-8 w-40 md:w-52 aspect-square rounded-2xl border-2 border-border overflow-hidden shadow-lg transform rotate-6 hover:rotate-3 transition-transform duration-300 z-10">
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
              {/* Headline for desktop only */}
              <h2 className="hidden lg:block text-3xl md:text-4xl font-bold text-foreground mb-6">
                Naša priča
              </h2>
              
              {/* Story text - same for mobile and desktop */}
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Upitomat je nastao iz problema kojih smo saznali iz prve ruke surađujući sa hrvatskim firmama.
                </p>
                
                <div className="space-y-2 pl-4 border-l-2 border-primary/30 italic">
                  <p>"Dobivam previše upita, a nemam vremena za sve pohvatati."</p>
                  <p>"Sve je razbacano, ne znam tko mi glavu nosi."</p>
                  <p>"Gubim sate svaki dan ponavljajući isto, da na kraju ne bude ništa."</p>
                </div>
                
                <p className="font-semibold text-foreground">
                  I to s nama jednostavno ne stoji.
                </p>
                
                <p>
                  Marljiv i kvalitetan rad zaslužuje biti nagrađen, a ne kažnjen.
                </p>
                
                <p className="font-semibold text-foreground">
                  Zato smo kreirali Upitomat.
                </p>
                
                <p>
                  Kako bi vam poruke prestale uzimati dan, a posao opet imao mir i red.
                </p>
                
                <div className="pt-4 mt-4 border-t border-border">
                  <p className="text-foreground font-medium">
                    Jedno pitanje za vas:
                  </p>
                  <p className="text-lg text-foreground mt-2">
                    Na što biste radije potrošili vrijeme koje će vam danas ukrasti poruke?
                  </p>
                </div>
              </div>
              
              {/* CTA Button - same as hero */}
              <div className="flex flex-col items-center lg:items-start gap-2 mt-8">
                <a
                  href="https://app.upitomat.hr/auth"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
                >
                  Isprobajte Upitomat
                </a>
                <p className="text-sm text-muted-foreground">
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
