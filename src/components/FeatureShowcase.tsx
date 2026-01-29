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
          <p className="text-base md:text-lg text-muted-foreground max-w-[85%] mx-auto">
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
              {/* Main video container */}
              <div className="relative">
                {/* Video box */}
                <div className="relative overflow-hidden bg-card/60 backdrop-blur-sm aspect-[16/10] group transition-all duration-500 hover:shadow-[0_0_40px_-10px_hsl(50_100%_50%/0.2)]">
                  <div className="absolute inset-0 transition-transform duration-700 will-change-transform group-hover:scale-105">
                    <video
                      ref={videoRef}
                      key={activeFeature.id}
                      src={activeFeature.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Subtle gradient overlay - fades into dock */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Fused dock - center aligned with bottom edge of video (50% overlap) */}
                <div 
                  className="absolute left-1/2 -translate-x-1/2 w-[88%] md:w-[78%] z-10 animate-fade-in"
                  style={{
                    bottom: '-24px',
                    animationDelay: '200ms',
                  }}
                >
                  {/* Gradient connector - seamless blend from main block */}
                  <div 
                    className="absolute -top-8 left-0 right-0 h-10 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, transparent 0%, hsl(var(--card) / 0.7) 100%)',
                      maskImage: 'radial-gradient(ellipse 85% 100% at 50% 100%, black 0%, transparent 100%)',
                      WebkitMaskImage: 'radial-gradient(ellipse 85% 100% at 50% 100%, black 0%, transparent 100%)',
                    }}
                  />
                  
                  {/* Dock content */}
                  <div 
                    className="relative bg-card/85 backdrop-blur-md rounded-2xl px-4 py-3 md:px-6 md:py-4 transition-all duration-500"
                    style={{
                      boxShadow: '0 12px 40px -10px hsl(0 0% 0% / 0.5), 0 6px 20px -6px hsl(0 0% 0% / 0.3)',
                    }}
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <activeFeature.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-foreground text-sm md:text-base uppercase tracking-tight">{activeFeature.title}</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">{activeFeature.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Spacer for dock overflow */}
              <div className="h-8 md:h-10" />
            </StaggeredText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
