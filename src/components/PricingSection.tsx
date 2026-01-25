import { Check, MessageCircle, Instagram, Mail, Globe, ChevronDown } from "lucide-react";
import { useState } from "react";
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
        "Osnovna analitika",
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
        "24/7 Prioritetna podrška",
      ],
    },
  ];

  const handleSelectPlan = (planId: string) => {
    window.open("https://app.upitomat.hr/auth", "_blank");
  };

  const SelectedPlatformIcon = platformOptions.find(p => p.value === selectedPlatform)?.icon || MessageCircle;

  return (
    <section id="cijene" className="py-16 md:py-24 scroll-mt-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Odaberite svoj plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Jednostavne cijene, bez skrivenih troškova
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`
                relative rounded-2xl border-2 p-6 md:p-8 transition-all duration-300
                ${plan.popular 
                  ? "border-primary bg-primary/5 shadow-xl scale-[1.02]" 
                  : "border-border bg-background hover:border-primary/50"
                }
              `}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Najpopularniji
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground mb-4">{plan.name}</h3>
                
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl md:text-5xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">€/mj</span>
                </div>
              </div>

              {/* Platforms */}
              <div className="mb-6">
                <p className="text-sm font-medium text-foreground mb-3">Uključene platforme:</p>
                <div className="flex flex-wrap gap-2">
                  {plan.platforms.map((platform, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2"
                    >
                      <platform.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">{platform.name}</span>
                    </div>
                  ))}
                  
                  {/* Dropdown for basic plan */}
                  {plan.hasDropdown && (
                    <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                      <SelectTrigger className="w-auto min-w-[160px] bg-muted/50 border-0 rounded-lg px-3 py-2 h-auto">
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
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`
                  w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300
                  ${plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl"
                    : "bg-muted text-foreground hover:bg-muted/80"
                  }
                `}
              >
                Odaberi {plan.name}
              </button>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Plan možete promijeniti kada god želite
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
