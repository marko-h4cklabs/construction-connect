import { useEffect, useState } from 'react';

const BackgroundEffects = () => {
  const [gridOpacity, setGridOpacity] = useState(0.12);
  const [glowIntensity, setGlowIntensity] = useState(1);

  useEffect(() => {
    // Elegant breathing animation for grid visibility
    const breathe = () => {
      const duration = 10000; // 10 seconds per cycle - slower = more premium
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = (Date.now() - startTime) % duration;
        const progress = elapsed / duration;
        // Smooth sine wave oscillation between 0.06 and 0.16
        const opacity = 0.11 + Math.sin(progress * Math.PI * 2) * 0.05;
        // Glow pulsing
        const glow = 1 + Math.sin(progress * Math.PI * 2 + Math.PI / 4) * 0.15;
        
        setGridOpacity(opacity);
        setGlowIntensity(glow);
        requestAnimationFrame(animate);
      };
      
      animate();
    };
    
    breathe();
  }, []);

  return (
    <>
      {/* Fixed background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Base gradient - premium dark with subtle warmth */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 0%, hsl(45 30% 8%) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 100% 100%, hsl(40 20% 6%) 0%, transparent 50%),
              hsl(0 0% 7%)
            `,
          }}
        />

        {/* Animated golden glow patches - organic placement with breathing */}
        <div 
          className="absolute top-[2%] left-[5%] w-[40%] h-[30%] rounded-full transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle, hsl(45 70% 50% / ${0.12 * glowIntensity}) 0%, transparent 70%)`,
            filter: 'blur(100px)',
          }}
        />
        
        <div 
          className="absolute top-[20%] right-[5%] w-[35%] h-[25%] rounded-full transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle, hsl(50 60% 45% / ${0.1 * glowIntensity}) 0%, transparent 65%)`,
            filter: 'blur(90px)',
          }}
        />
        
        <div 
          className="absolute top-[45%] left-[55%] w-[30%] h-[25%] rounded-full transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle, hsl(48 65% 50% / ${0.08 * glowIntensity}) 0%, transparent 60%)`,
            filter: 'blur(80px)',
          }}
        />

        <div 
          className="absolute top-[60%] left-[0%] w-[30%] h-[25%] rounded-full transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle, hsl(45 70% 48% / ${0.12 * glowIntensity}) 0%, transparent 65%)`,
            filter: 'blur(85px)',
          }}
        />

        <div 
          className="absolute top-[75%] right-[10%] w-[35%] h-[28%] rounded-full transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle, hsl(50 65% 50% / ${0.1 * glowIntensity}) 0%, transparent 70%)`,
            filter: 'blur(95px)',
          }}
        />

        {/* Animated organic grid with premium fading */}
        <div 
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            backgroundImage: `
              linear-gradient(hsl(50 80% 55% / ${gridOpacity}) 1px, transparent 1px),
              linear-gradient(90deg, hsl(50 80% 55% / ${gridOpacity}) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: `
              radial-gradient(ellipse 55% 45% at 20% 12%, black 0%, transparent 85%),
              radial-gradient(ellipse 50% 40% at 78% 22%, black 0%, transparent 80%),
              radial-gradient(ellipse 45% 35% at 88% 55%, black 0%, transparent 75%),
              radial-gradient(ellipse 55% 42% at 12% 52%, black 0%, transparent 85%),
              radial-gradient(ellipse 48% 36% at 62% 78%, black 0%, transparent 80%),
              radial-gradient(ellipse 45% 38% at 28% 88%, black 0%, transparent 75%),
              radial-gradient(ellipse 40% 32% at 92% 92%, black 0%, transparent 70%)
            `,
            WebkitMaskImage: `
              radial-gradient(ellipse 55% 45% at 20% 12%, black 0%, transparent 85%),
              radial-gradient(ellipse 50% 40% at 78% 22%, black 0%, transparent 80%),
              radial-gradient(ellipse 45% 35% at 88% 55%, black 0%, transparent 75%),
              radial-gradient(ellipse 55% 42% at 12% 52%, black 0%, transparent 85%),
              radial-gradient(ellipse 48% 36% at 62% 78%, black 0%, transparent 80%),
              radial-gradient(ellipse 45% 38% at 28% 88%, black 0%, transparent 75%),
              radial-gradient(ellipse 40% 32% at 92% 92%, black 0%, transparent 70%)
            `,
          }}
        />

        {/* Premium film grain texture */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Premium vignette - cinematic feel */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at center, transparent 30%, hsl(0 0% 4% / 0.6) 100%)
          `,
        }}
      />
    </>
  );
};

export default BackgroundEffects;
