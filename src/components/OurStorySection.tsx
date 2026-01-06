const OurStorySection = () => {
  return (
    <section id="nasa-prica" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Fan-style overlapping images */}
            <div className="order-2 lg:order-1">
              <div className="relative w-full h-80 md:h-96">
                {/* First image - rotated left */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 md:w-56 aspect-[3/4] rounded-2xl bg-muted border-2 border-border overflow-hidden shadow-card-hover transform -rotate-6 hover:-rotate-3 transition-transform duration-300">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-accent/20 flex items-center justify-center">
                        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <p className="text-xs">Partner 1</p>
                    </div>
                  </div>
                </div>
                
                {/* Second image - rotated right, overlapping */}
                <div className="absolute right-0 md:right-8 top-1/2 -translate-y-1/2 w-48 md:w-56 aspect-[3/4] rounded-2xl bg-muted border-2 border-border overflow-hidden shadow-card-hover transform rotate-6 hover:rotate-3 transition-transform duration-300 z-10">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-accent/20 flex items-center justify-center">
                        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <p className="text-xs">Partner 2</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Naša Priča
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  {/* Placeholder text - replace with actual content */}
                  Ovdje napišite svoju priču o tome tko ste i što radite. 
                  Opišite svoju misiju, vrijednosti i zašto ste pokrenuli Upitomat.
                </p>
                
                <p>
                  Dodajte informacije o vašem timu, iskustvu i što vas čini 
                  posebnima na tržištu.
                </p>
                
                <p>
                  Podijelite svoju viziju i kako pomažete hrvatskim tvrtkama 
                  da bolje upravljaju upitima svojih klijenata.
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
