import { useState, useRef, useEffect } from "react";
import { Inbox, Bot, Share2, BarChart3 } from "lucide-react";

const features = [
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analitika i Uvid",
    description: "Jasan uvid u rezultate i ponašanje vaših klijenata",
    videoUrl: "/videos/demo.mp4",
  },
  {
    id: "inbox",
    icon: Inbox,
    title: "Upitomat Inbox",
    description: "Svi vaši upiti uredno organizirani na jednom mjestu.",
    videoUrl: "/videos/demo.mp4",
  },
  {
    id: "platforms",
    icon: Share2,
    title: "Povezane Platforme",
    description: "Instagram, Facebook, WhatsApp i ostali kanali, po vašem odabiru.",
    videoUrl: "/videos/demo.mp4",
  },
  {
    id: "chatbot",
    icon: Bot,
    title: "Personalizirani Chatbot",
    description: "AI asistent obučen prema vašem načinu rada i komunikacije",
    videoUrl: "/videos/demo.mp4",
  },
];

const FeatureShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(features[0]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Reset and play video when feature changes
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked
      });
    }
  }, [activeFeature]);

  return (
    <section id="proces" className="py-12 md:py-24 scroll-mt-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Što <span className="text-gradient">Upitomat</span> radi za vas?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Odaberite funkcionalnost i pogledajte kako izgleda u praksi
          </p>
        </div>

        {/* Feature Grid + Preview */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Feature Boxes - Left Side */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => {
                const isActive = activeFeature.id === feature.id;
                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature)}
                    className={`
                      relative p-5 md:p-6 rounded-xl border-2 text-left transition-all duration-300
                      ${isActive 
                        ? "border-primary bg-primary/5 shadow-lg" 
                        : "border-border bg-background hover:border-primary/50 hover:bg-muted/50"
                      }
                    `}
                  >
                    {/* Checkbox indicator */}
                    <div className={`
                      absolute top-3 right-3 w-5 h-5 rounded border-2 flex items-center justify-center
                      transition-all duration-200
                      ${isActive 
                        ? "border-primary bg-primary" 
                        : "border-muted-foreground/30"
                      }
                    `}>
                      {isActive && (
                        <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    {/* Icon */}
                    <div className={`
                      w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors
                      ${isActive ? "bg-primary/20" : "bg-muted"}
                    `}>
                      <feature.icon className={`w-6 h-6 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    </div>

                    {/* Title */}
                    <h3 className={`font-semibold mb-1 transition-colors ${isActive ? "text-foreground" : "text-foreground/80"}`}>
                      {feature.title}
                    </h3>
                    
                    {/* Description - hidden on mobile for cleaner look */}
                    <p className="text-sm text-muted-foreground hidden md:block">
                      {feature.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Video Preview - Right Side */}
            <div className="relative order-first lg:order-last">
              <div className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-xl aspect-[4/3]">
                {/* Video container - matches height of feature boxes */}
                <div className="absolute inset-0">
                  <video
                    ref={videoRef}
                    src={activeFeature.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay gradient for polish */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 to-transparent" />
                </div>

                {/* Feature label overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/90 backdrop-blur-sm rounded-lg px-4 py-3 border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <activeFeature.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm">{activeFeature.title}</h4>
                        <p className="text-xs text-muted-foreground">{activeFeature.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
