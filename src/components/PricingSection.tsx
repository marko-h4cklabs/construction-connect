import { Check, MessageCircle, Instagram, Mail, Globe } from "lucide-react";
import { useState } from "react";
import StaggeredText from "@/components/StaggeredText";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PricingSection = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("messenger");

  const platformOptions = [
    { value: "messenger", icon: MessageCircle, name: "Messenger" },
    { value: "instagram", icon: Instagram, name: "Instagram" },
    { value: "website", icon: Globe, name: "Website chatbot" },
  ];

  const plans = [
    {
      id: "basic",
      name: "Osnovni",
      price: "44,99",
      platforms: [
        { icon: Mail, name: "Email" },
      ],
      hasDropdown: true,
      features: [
        "2 platforme uključene",
        "Upitomat Inbox",
        "Personalizirani chatbot",
        "Napredna analitika",
      ],
    },
    {
      id: "pro",
      name: "Napredni",
      price: "89,99",
      popular: true,
      platforms: [
        { icon: MessageCircle, name: "Messenger" },
        { icon: Instagram, name: "Instagram" },
        { icon: Mail, name: "Email" },
        { icon: Globe, name: "Website chatbot" },
      ],
      features: [
        "Sve platforme uključene",
        "Upitomat Inbox",
        "Personalizirani chatbot",
        "Napredna analitika",
        "Neograničena simulacija",
        "24/7 Prioritetna podrška",
      ],
    },
  ];

  const handleSelectPlan = (planId: string) => {
    window.open("https://app.upitomat.hr/auth", "_blank");
  };

  return (
    <section id="cijene" className="py-16 md:py-20 scroll-mt-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <StaggeredText className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-black text-foreground mb-4">
            Odaberite svoj plan
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Jednostavne cijene, bez skrivenih troškova
          </p>
        </StaggeredText>

        {/* Pricing Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {plans.map((plan, index) => (
            <StaggeredText key={plan.id} delay={200 + index * 150}>
              <div
                className={`
                  relative border p-6 md:p-8 transition-all duration-500 group
                  ${plan.popular 
                    ? "border-primary bg-primary/5 shadow-[0_0_30px_hsl(50_100%_50%/0.1)]" 
                    : "border-border bg-card/50 hover:border-primary/50 hover:bg-card/80"
                  }
                `}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-black px-4 py-2 uppercase tracking-wide shadow-[0_0_20px_hsl(50_100%_50%/0.3)]">
                      Najpopularniji
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="text-center mb-6 pt-2">
                  <h3 className="text-xl font-black text-foreground mb-4 uppercase tracking-tight">{plan.name}</h3>
                  
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl md:text-5xl font-black text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground font-semibold uppercase">€/mj</span>
                  </div>
                </div>

                {/* Platforms */}
                <div className="mb-6">
                  <p className="text-sm font-bold text-foreground mb-3 uppercase tracking-tight">Uključene platforme:</p>
                  <div className="flex flex-wrap gap-2">
                    {plan.platforms.map((platform, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-muted/50 border border-border px-3 py-2 transition-colors group-hover:border-primary/30"
                      >
                        <platform.icon className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground font-medium">{platform.name}</span>
                      </div>
                    ))}
                    
                    {plan.hasDropdown && (
                      <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                        <SelectTrigger className="w-auto min-w-[160px] bg-muted/50 border border-border px-3 py-2 h-auto focus-brutal">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-border">
                          {platformOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <option.icon className="w-4 h-4 text-primary" />
                                <span>{option.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 border border-primary bg-primary/20 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/30">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`
                      w-full py-3 px-6 font-bold uppercase tracking-wide transition-all duration-300 border focus-brutal hover:translate-y-[-2px]
                      ${plan.popular
                        ? "bg-primary text-primary-foreground border-primary hover:shadow-[0_0_30px_4px_hsl(50_100%_50%/0.4)]"
                        : "border-border bg-muted/50 text-foreground hover:border-primary hover:bg-muted/80"
                      }
                    `}
                    style={plan.popular ? { boxShadow: '0 0 20px 2px hsl(50 100% 50% / 0.25)' } : {}}
                  >
                    Odaberi {plan.name}
                  </button>
                  <span className="text-sm text-muted-foreground tracking-wide">
                    Besplatno, bez obveze
                  </span>
                </div>
              </div>
            </StaggeredText>
          ))}
        </div>

        {/* Note */}
        <StaggeredText delay={600} className="text-center mt-8">
          <p className="text-sm text-muted-foreground tracking-wide">
            Plan možete promijeniti kada god želite
          </p>
        </StaggeredText>
      </div>
    </section>
  );
};

export default PricingSection;
