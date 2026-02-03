import { useState, useRef, useCallback, useEffect } from "react";
import { Play } from "lucide-react";
import StaggeredText from "@/components/StaggeredText";

const YOUTUBE_VIDEO_ID = "em9Wk2ZtNb0";

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("");

  // Set initial muted autoplay src with minimal YouTube UI
  useEffect(() => {
    setIframeSrc(
      `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0&disablekb=1`
    );
  }, []);

  const handlePlayClick = useCallback(() => {
    // Reset video to start with sound enabled, controls, and fullscreen available
    setIframeSrc(
      `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=0&playsinline=1&loop=0&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&start=0`
    );
    setIsPlaying(true);
  }, []);

  return (
    <section className="pt-10 pb-20 md:pt-20 md:pb-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline - one word per line with stagger */}
          <StaggeredText>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground leading-[0.85] tracking-tighter"
            >
              <span className="text-gradient block mb-3 md:mb-4">Nemate</span>
              <span className="text-gradient block">vremena.</span>
            </h1>
          </StaggeredText>

          {/* VSL Video */}
          <StaggeredText delay={200} className="mt-8 md:mt-10">
            <div className="relative w-full max-w-[95%] mx-auto aspect-video rounded-xl overflow-hidden border-2 border-primary/60">
              {/* YouTube Embed */}
              {iframeSrc && (
                <iframe
                  src={iframeSrc}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Upitomat VSL"
                />
              )}
              
              {/* Dark overlay + Play button (only when not playing) */}
              {!isPlaying && (
                <div 
                  className="absolute inset-0 bg-black/25 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-black/15"
                  onClick={handlePlayClick}
                >
                  <button
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center transition-transform duration-300 hover:scale-110"
                    style={{
                      boxShadow: '0 0 20px 3px hsl(50 100% 50% / 0.3)',
                    }}
                    aria-label="Play video"
                  >
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground fill-primary-foreground ml-1" />
                  </button>
                </div>
              )}
            </div>
          </StaggeredText>

          {/* CTA Button - premium glow */}
          <StaggeredText delay={400} className="mt-10 md:mt-12 flex flex-col items-center gap-3">
            <a
              href="https://app.upitomat.hr/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 text-sm md:text-base bg-primary text-primary-foreground font-black uppercase tracking-wide border-2 border-foreground transition-all duration-300 hover:translate-y-[-2px]"
              style={{ 
                boxShadow: '0 0 20px 3px hsl(50 100% 50% / 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px 5px hsl(50 100% 50% / 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px 3px hsl(50 100% 50% / 0.2)';
              }}
            >
              ISPROBAJTE UPITOMAT
            </a>
            <span className="text-xs text-muted-foreground tracking-wide">
              besplatno, bez obveze
            </span>
          </StaggeredText>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
