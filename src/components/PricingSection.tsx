import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small crews",
    price: 49,
    features: [
      "Up to 5 team members",
      "10 active projects",
      "Basic reporting",
      "Email support",
      "Mobile app access",
    ],
    popular: false,
  },
  {
    name: "Professional",
    description: "For growing companies",
    price: 99,
    features: [
      "Up to 20 team members",
      "Unlimited projects",
      "Advanced reporting & analytics",
      "Priority phone support",
      "Client portal",
      "Custom branding",
      "QuickBooks integration",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large operations",
    price: 199,
    features: [
      "Unlimited team members",
      "Unlimited projects",
      "Custom reporting",
      "Dedicated account manager",
      "API access",
      "Advanced integrations",
      "On-site training",
      "SLA guarantee",
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
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your business. All plans include a 14-day free trial.
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
                    Most Popular
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
                    ${plan.price}
                  </span>
                  <span className={plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}>
                    /month
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
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-muted-foreground mt-12 text-sm">
          All prices in USD. Need a custom plan?{" "}
          <button className="text-accent hover:underline font-medium">
            Contact our sales team
          </button>
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
