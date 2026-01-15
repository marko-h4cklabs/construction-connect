const BackgroundEffects = () => {
  return (
    <>
      {/* Fixed background with gradient mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Base gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% -10%, hsl(50 100% 50% / 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 110%, hsl(145 60% 40% / 0.12) 0%, transparent 50%),
              radial-gradient(ellipse 50% 50% at 90% 20%, hsl(45 100% 45% / 0.08) 0%, transparent 40%)
            `,
          }}
        />

        {/* Animated aurora orbs */}
        <div 
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[100px] animate-aurora-1"
          style={{
            background: 'radial-gradient(circle, hsl(50 100% 50% / 0.25) 0%, transparent 70%)',
          }}
        />
        
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[80px] animate-aurora-2"
          style={{
            background: 'radial-gradient(circle, hsl(145 60% 45% / 0.2) 0%, transparent 70%)',
          }}
        />
        
        <div 
          className="absolute top-[30%] right-[-5%] w-[40%] h-[40%] rounded-full blur-[60px] animate-aurora-3"
          style={{
            background: 'radial-gradient(circle, hsl(50 100% 50% / 0.12) 0%, transparent 60%)',
          }}
        />

        {/* Noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(50 100% 50% / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(50 100% 50% / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Vignette overlay for depth */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(0 0% 8% / 0.4) 100%)',
        }}
      />
    </>
  );
};

export default BackgroundEffects;
