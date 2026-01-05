const OurStorySection = () => {
  return (
    <section id="nasa-prica" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-2xl bg-muted border border-border overflow-hidden shadow-card">
                {/* Placeholder for image - replace src with actual image */}
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm">Dodajte sliku ovdje</p>
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
