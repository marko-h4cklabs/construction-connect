import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Početni",
    description: "Savršeno za male ekipe",
    price: 49,
    features: [
      "Do 5 članova tima",
      "10 aktivnih projekata",
      "Osnovno izvještavanje",
      "Email podrška",
      "Pristup mobilnoj aplikaciji",
    ],
    popular: false,
  },
  {
    name: "Profesionalni",
    description: "Za tvrtke u rastu",
    price: 99,
    features: [
      "Do 20 članova tima",
      "Neograničeni projekti",
      "Napredno izvještavanje i analitika",
      "Prioritetna telefonska podrška",
      "Portal za klijente",
      "Prilagođeni branding",
      "QuickBooks integracija",
    ],
    popular: true,
  },
  {
    name: "Poslovni",
    description: "Za velike operacije",
    price: 199,
    features: [
      "Neograničeni članovi tima",
      "Neograničeni projekti",
      "Prilagođeno izvještavanje",
      "Posvećeni voditelj računa",
      "API pristup",
      "Napredne integracije",
      "Obuka na licu mjesta",
      "SLA jamstvo",
    ],
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Jednostavne, Transparentne Cijene
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Odaberite plan koji odgovara vašem poslovanju. Svi planovi uključuju 14 dana besplatnog probnog razdoblja.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? "bg-primary text-primary-foreground scale-105 shadow-card-hover"
                  : "bg-card border border-border shadow-card hover:shadow-card-hover"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-accent-gradient text-accent-foreground text-sm font-semibold px-4 py-1 rounded-full shadow-accent">
                    Najpopularniji
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-5xl font-extrabold ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                    €{plan.price}
                  </span>
                  <span className={plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}>
                    /mjesečno
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? "text-accent" : "text-accent"}`} />
                    <span className={`text-sm ${plan.popular ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                variant={plan.popular ? "hero" : "outline"}
                className="w-full"
                size="lg"
              >
                Započnite
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-muted-foreground mt-12 text-sm">
          Sve cijene u EUR. Trebate prilagođeni plan?{" "}
          <button className="text-accent hover:underline font-medium">
            Kontaktirajte naš prodajni tim
          </button>
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
