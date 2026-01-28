const BackgroundEffects = () => {
  return (
    <>
      {/* Fixed background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Base dark */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'hsl(0 0% 9%)',
          }}
        />

        {/* Scattered golden glow patches - organic placement */}
        <div 
          className="absolute top-[2%] left-[5%] w-[35%] h-[25%] rounded-full blur-[80px]"
          style={{
            background: 'radial-gradient(circle, hsl(45 100% 50% / 0.2) 0%, transparent 70%)',
          }}
        />
        
        <div 
          className="absolute top-[15%] right-[8%] w-[28%] h-[20%] rounded-full blur-[70px]"
          style={{
            background: 'radial-gradient(circle, hsl(50 100% 45% / 0.18) 0%, transparent 65%)',
          }}
        />
        
        <div 
          className="absolute top-[40%] left-[60%] w-[30%] h-[22%] rounded-full blur-[75px]"
          style={{
            background: 'radial-gradient(circle, hsl(48 100% 50% / 0.15) 0%, transparent 60%)',
          }}
        />

        <div 
          className="absolute top-[55%] left-[2%] w-[25%] h-[18%] rounded-full blur-[65px]"
          style={{
            background: 'radial-gradient(circle, hsl(45 100% 48% / 0.2) 0%, transparent 65%)',
          }}
        />

        <div 
          className="absolute top-[70%] right-[15%] w-[32%] h-[24%] rounded-full blur-[80px]"
          style={{
            background: 'radial-gradient(circle, hsl(50 100% 50% / 0.18) 0%, transparent 70%)',
          }}
        />

        <div 
          className="absolute top-[85%] left-[25%] w-[28%] h-[20%] rounded-full blur-[70px]"
          style={{
            background: 'radial-gradient(circle, hsl(48 100% 48% / 0.16) 0%, transparent 60%)',
          }}
        />

        {/* Organic fading grid - using SVG mask for random disappearing effect */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(50 100% 50% / 0.12) 1px, transparent 1px),
              linear-gradient(90deg, hsl(50 100% 50% / 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: `
              radial-gradient(ellipse 50% 40% at 20% 15%, black 0%, transparent 80%),
              radial-gradient(ellipse 45% 35% at 75% 25%, black 0%, transparent 75%),
              radial-gradient(ellipse 40% 30% at 85% 55%, black 0%, transparent 70%),
              radial-gradient(ellipse 50% 38% at 15% 50%, black 0%, transparent 80%),
              radial-gradient(ellipse 45% 32% at 60% 75%, black 0%, transparent 75%),
              radial-gradient(ellipse 40% 35% at 30% 85%, black 0%, transparent 70%),
              radial-gradient(ellipse 35% 28% at 90% 90%, black 0%, transparent 65%)
            `,
            WebkitMaskImage: `
              radial-gradient(ellipse 50% 40% at 20% 15%, black 0%, transparent 80%),
              radial-gradient(ellipse 45% 35% at 75% 25%, black 0%, transparent 75%),
              radial-gradient(ellipse 40% 30% at 85% 55%, black 0%, transparent 70%),
              radial-gradient(ellipse 50% 38% at 15% 50%, black 0%, transparent 80%),
              radial-gradient(ellipse 45% 32% at 60% 75%, black 0%, transparent 75%),
              radial-gradient(ellipse 40% 35% at 30% 85%, black 0%, transparent 70%),
              radial-gradient(ellipse 35% 28% at 90% 90%, black 0%, transparent 65%)
            `,
          }}
        />

        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Soft vignette */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, hsl(0 0% 5% / 0.5) 100%)',
        }}
      />
    </>
  );
};

export default BackgroundEffects;
