import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "Neograničeni upiti",
  "Prilagođeni obrasci",
  "Email notifikacije",
  "Pristup mobilnoj aplikaciji",
  "Analitika i izvještaji",
  "Prioritetna podrška",
  "Integracije s alatima",
  "Bez ugovorne obveze",
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Jednostavne, Transparentne Cijene
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sve što trebate za upravljanje upitima u jednom paketu.
          </p>
        </div>

        {/* Single Pricing Card */}
        <div className="max-w-lg mx-auto">
          <div className="relative rounded-2xl p-8 md:p-10 bg-primary text-primary-foreground shadow-card-hover">
            {/* Price */}
            <div className="text-center mb-8">
              <p className="text-primary-foreground/70 text-sm mb-2">Počinje od</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl md:text-6xl font-extrabold text-primary-foreground">
                  €50
                </span>
                <span className="text-primary-foreground/70">
                  /mjesečno
                </span>
              </div>
              <p className="text-primary-foreground/70 text-sm mt-2">
                Cijena ovisi o potrebama vaše tvrtke
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-accent" />
                  <span className="text-sm text-primary-foreground/90">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Button
              variant="hero"
              className="w-full"
              size="xl"
              onClick={() => {
                const element = document.getElementById("kontakt");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Započnite besplatno
            </Button>

            <p className="text-center text-primary-foreground/60 text-sm mt-4">
              14 dana besplatno • Bez kreditne kartice
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
