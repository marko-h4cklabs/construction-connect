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
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [activeFeature]);

  return (
    <section id="proces" className="py-16 md:py-24 scroll-mt-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-black text-foreground mb-4">
            Što <span className="text-gradient">Upitomat</span> radi za vas?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Odaberite funkcionalnost i pogledajte kako izgleda u praksi
          </p>
        </div>

        {/* Feature Grid + Preview */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Feature Boxes */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {features.map((feature) => {
                const isActive = activeFeature.id === feature.id;
                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature)}
                    className={`
                      relative p-4 md:p-6 border-2 text-left transition-all duration-150 focus-brutal
                      ${isActive 
                        ? "border-primary bg-primary/10" 
                        : "border-border bg-card hover:border-primary/50"
                      }
                    `}
                  >
                    {/* Checkbox indicator */}
                    <div className={`
                      absolute top-3 right-3 w-5 h-5 border-2 flex items-center justify-center
                      transition-all duration-150
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
                      w-10 h-10 md:w-12 md:h-12 border-2 flex items-center justify-center mb-3 md:mb-4 transition-colors
                      ${isActive ? "border-primary bg-primary/20" : "border-border bg-muted"}
                    `}>
                      <feature.icon className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    </div>

                    {/* Title */}
                    <h3 className={`font-bold text-sm md:text-base mb-1 transition-colors uppercase tracking-tight ${isActive ? "text-foreground" : "text-foreground/80"}`}>
                      {feature.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-xs md:text-sm text-muted-foreground hidden md:block">
                      {feature.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Video Preview */}
            <div className="relative order-first lg:order-last">
              <div className="relative overflow-hidden bg-card border-2 border-border aspect-[4/3]">
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
                </div>

                {/* Feature label overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="bg-background/95 border-2 border-border px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 border-2 border-primary bg-primary/20 flex items-center justify-center">
                        <activeFeature.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-sm uppercase tracking-tight">{activeFeature.title}</h4>
                        <p className="text-xs text-muted-foreground">{activeFeature.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
