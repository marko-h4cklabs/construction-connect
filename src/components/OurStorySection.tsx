import partner1 from "@/assets/partner1.jpg";
import partner2 from "@/assets/partner2.jpg";

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
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 md:w-56 aspect-[3/4] rounded-2xl border-2 border-border overflow-hidden shadow-card-hover transform -rotate-6 hover:-rotate-3 transition-transform duration-300">
                  <img 
                    src={partner1} 
                    alt="Partner 1" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Second image - rotated right, overlapping */}
                <div className="absolute right-0 md:right-8 top-1/2 -translate-y-1/2 w-48 md:w-56 aspect-[3/4] rounded-2xl border-2 border-border overflow-hidden shadow-card-hover transform rotate-6 hover:rotate-3 transition-transform duration-300 z-10">
                  <img 
                    src={partner2} 
                    alt="Partner 2" 
                    className="w-full h-full object-cover"
                  />
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
