import { MessageSquare, Bot, Database, LayoutDashboard, Clock, Users } from "lucide-react";

const flowSteps = [
  {
    icon: Users,
    title: "Potencijalni klijent",
    description: "Klijent vas kontaktira putem bilo koje platforme",
  },
  {
    icon: MessageSquare,
    title: "Vaš Messenger",
    description: "Facebook, Instagram, WhatsApp ili web chat",
  },
  {
    icon: Bot,
    title: "Personalizirani Chatbot",
    description: "AI asistent obučen za vašu firmu odgovara 24/7",
  },
  {
    icon: Database,
    title: "Spremanje Podataka",
    description: "Ključne informacije i razgovori se automatski spremaju",
  },
  {
    icon: LayoutDashboard,
    title: "Upravljačka Ploča",
    description: "Pregled svih upita i informacija s jednog mjesta",
  },
  {
    icon: Clock,
    title: "Ušteđeno Vrijeme",
    description: "Više strukture, manje ručnog rada",
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Kako naš sistem pomaže vašoj firmi?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Na prvom video pozivu vam demonstriramo personalizirani chatbot i platformu za vašu firmu, bez ikakve obveze.
          </p>
        </div>

        {/* Flow Diagram */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flowSteps.map((step, index) => (
              <div key={step.title} className="relative group">
                {/* Card */}
                <div className="bg-background border border-border rounded-xl p-6 h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Connection Arrow (hidden on last item per row) */}
                {index < flowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <div className="w-6 h-0.5 bg-primary/40"></div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-6 border-l-primary/40"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Flow Indicators */}
          <div className="flex justify-center mt-8 lg:hidden">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>Slijedite korake od 1 do 6</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
