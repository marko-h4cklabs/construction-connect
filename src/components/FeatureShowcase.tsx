import { useState, useRef, useEffect } from "react";
import { Inbox, Bot, Share2, BarChart3 } from "lucide-react";
import StaggeredText from "@/components/StaggeredText";

// Import videos
import inboxVideo from "@/assets/videos/upitomat-inbox.mp4";
import chatbotVideo from "@/assets/videos/personalizirani-chatbot.mp4";
import analyticsVideo from "@/assets/videos/analitika-i-uvid.mp4";
import platformsVideo from "@/assets/videos/povezane-platforme.mp4";

// New order as requested:
// 1 - Upitomat Inbox
// 2 - Personalizirani Chatbot
// 3 - Analitika i Uvid
// 4 - Povezane Platforme
const features = [
  {
    id: "inbox",
    icon: Inbox,
    title: "Upitomat Inbox",
    description: "Svi vaši upiti uredno organizirani na jednom mjestu.",
    videoUrl: inboxVideo,
  },
  {
    id: "chatbot",
    icon: Bot,
    title: "Personalizirani Chatbot",
    description: "AI asistent obučen prema vašem načinu rada i komunikacije",
    videoUrl: chatbotVideo,
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analitika i Uvid",
    description: "Jasan uvid u rezultate i ponašanje vaših klijenata",
    videoUrl: analyticsVideo,
  },
  {
    id: "platforms",
    icon: Share2,
    title: "Povezane Platforme",
    description: "Instagram, Facebook, WhatsApp i ostali kanali, po vašem odabiru.",
    videoUrl: platformsVideo,
  },
];

const FeatureShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(features[0]);
  const [iconAnimated, setIconAnimated] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    // Trigger one-time icon animation
    setIconAnimated(activeFeature.id);
    const timer = setTimeout(() => setIconAnimated(null), 600);
    return () => clearTimeout(timer);
  }, [activeFeature]);

  return (
    <section id="proces" className="py-16 md:py-20 scroll-mt-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <StaggeredText className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-black text-foreground mb-4">
            <span className="block">Što <span className="text-gradient">Upitomat</span> radi</span>
            <span className="block">za vas?</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Odaberite funkcionalnost i pogledajte kako izgleda u praksi
          </p>
        </StaggeredText>

        {/* Feature Grid + Preview */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Feature Boxes */}
            <StaggeredText delay={200}>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {features.map((feature, index) => {
                  const isActive = activeFeature.id === feature.id;
                  return (
                    <button
                      key={feature.id}
                      onClick={() => setActiveFeature(feature)}
                      className={`
                        relative p-4 md:p-6 border-2 text-left transition-all duration-500 focus-brutal group
                        ${isActive 
                          ? "border-primary bg-primary/10 shadow-[0_0_35px_-5px_hsl(50_100%_50%/0.3)]" 
                          : "border-border bg-card/50 hover:border-primary/50 hover:bg-card/80 hover:shadow-[0_0_25px_-8px_hsl(50_100%_50%/0.2)] hover:translate-y-[-2px]"
                        }
                      `}
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      {/* Checkbox indicator */}
                      <div className={`
                        absolute top-3 right-3 w-5 h-5 border-2 flex items-center justify-center
                        transition-all duration-300
                        ${isActive 
                          ? "border-primary bg-primary" 
                          : "border-muted-foreground/30 group-hover:border-primary/50"
                        }
                      `}>
                        {isActive && (
                          <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>

                      {/* Icon with glow on active */}
                      <div className={`
                        w-10 h-10 md:w-12 md:h-12 border-2 flex items-center justify-center mb-3 md:mb-4 transition-all duration-500
                        ${isActive 
                          ? "border-primary bg-primary/20 shadow-[0_0_20px_hsl(50_100%_50%/0.3)]" 
                          : "border-border bg-muted group-hover:border-primary/30 group-hover:bg-primary/5"
                        }
                      `}>
                        <feature.icon 
                          className={`
                            w-5 h-5 md:w-6 md:h-6 transition-all duration-500 
                            ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary/70"}
                            ${iconAnimated === feature.id ? "scale-110" : "scale-100"}
                          `} 
                        />
                      </div>

                      {/* Title */}
                      <h3 className={`font-bold text-sm md:text-base mb-1 transition-colors duration-300 uppercase tracking-tight ${isActive ? "text-foreground" : "text-foreground/80"}`}>
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
            </StaggeredText>

            {/* Video Preview - autoplay, loop, no controls */}
            <StaggeredText delay={400} className="relative order-first lg:order-last">
              <div className="relative overflow-hidden bg-card border-2 border-border aspect-[4/3] group hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_-10px_hsl(50_100%_50%/0.2)]">
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                  <video
                    ref={videoRef}
                    key={activeFeature.id}
                    src={activeFeature.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />

                {/* Feature label overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="bg-background/60 backdrop-blur-md border-2 border-border/50 px-4 py-3 transition-all duration-300">
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
            </StaggeredText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
