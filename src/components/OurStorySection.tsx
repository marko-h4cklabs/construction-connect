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
              <div className="relative w-full h-80 md:h-96 flex items-center justify-center">
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
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Pomažemo tvrtkama da upiti opet postanu dobra vijest.
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed whitespace-pre-line">
                <p>
                  {`Upitomat je nastao iz stvarnog problema kojeg smo vidjeli iz prve ruke.

Radeći s tvrtkama kojima dovodimo više kvalitetnih upita, te pričajući sa novima, stalno slušamo istu stvar:

"Dobivamo dosta upita, ali nemamo vremena za sve pohvatati."
"Sve je razbacano, ne znam tko mi glavu nosi."
"Trošimo sate da na kraju shvatimo da od toga neće biti ništa."

Za većinu, problem nije s interesom, nego s kaosom koji dolazi s njim. A upiti umjesto prilike postaju svakodnevni teret.`}
                </p>
                
                <p>
                  {`Baš zbog toga smo napravili Upitomat.

Da olakšamo život firmama koji imaju te probleme, uštedimo ih puno vremena i omogućimo im puno efektivniju organizaciju svih upita i razgovora sa potencijalnim kupcima.`}
                </p>
                
                <p>
                  {`Znamo da je svaka tvrtka drugačija. I tu smo se pobrinuli da se stvarno izdvojimo.

Za Upitomat izgradili napredan chatbot kojeg istreniramo na temelju vaših stvarnih razgovora, vašeg tona i načina komunikacije. Tako da 24/7 imate verziju sebe koja ne samo da vodi ljude nego im i daje osjećaj da pričaju s vlasnikom ili članom tima.`}
                </p>
                
                <p>
                  Cilj nije zamijeniti vas, nego vam vratiti vrijeme i kontrolu. A na kraju i vratiti osmijeh na lice svaki puta kada provjerite vaše upite.
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
