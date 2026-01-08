import { useState, useRef, useEffect } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);

    const initPlayer = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        videoId: "t5guw03Rgbg",
        playerVars: {
          autoplay: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }
  };

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">

          {/* Headline */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Ušteđeno vrijeme.{" "}
            <span className="text-gradient">Organizirani upiti.</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Upitomat vodi potencijalne kupce kroz vaša ključna pitanja i drži sve upite organizirane na jednom mjestu.
          </p>

          {/* Video Container with custom thumbnail */}
          <div 
            ref={containerRef}
            className="relative rounded-2xl overflow-hidden shadow-card-hover animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="aspect-video">
              {isPlaying ? (
                <div id="yt-player" className="w-full h-full" />
              ) : (
                <button
                  type="button"
                  onClick={handlePlay}
                  className="relative w-full h-full cursor-pointer group touch-manipulation"
                  aria-label="Pokreni video"
                >
                  <img
                    src="/vsl-thumbnail.png"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg 
                      className="w-16 h-12 md:w-20 md:h-14 transition-transform group-hover:scale-110" 
                      viewBox="0 0 68 48"
                    >
                      <path fill="#f00" d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"/>
                      <path fill="#fff" d="M45 24L27 14v20"/>
                    </svg>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
