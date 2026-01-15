const BackgroundEffects = () => {
  return (
    <>
      {/* Fixed background - softer dark base */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Base - lighter dark gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, 
                hsl(0 0% 10%) 0%, 
                hsl(0 0% 8%) 30%,
                hsl(0 0% 10%) 60%,
                hsl(0 0% 9%) 100%
              )
            `,
          }}
        />

        {/* Subtle yellow glow spots */}
        <div 
          className="absolute top-[10%] left-[15%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-30"
          style={{
            background: 'radial-gradient(circle, hsl(50 100% 50% / 0.15) 0%, transparent 70%)',
          }}
        />
        
        <div 
          className="absolute top-[50%] right-[10%] w-[35%] h-[35%] rounded-full blur-[100px] opacity-25"
          style={{
            background: 'radial-gradient(circle, hsl(50 100% 50% / 0.12) 0%, transparent 70%)',
          }}
        />
        
        <div 
          className="absolute bottom-[20%] left-[5%] w-[30%] h-[30%] rounded-full blur-[80px] opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(50 100% 55% / 0.1) 0%, transparent 70%)',
          }}
        />

        {/* Yellow glowing grid pattern */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(50 100% 50% / 0.06) 1px, transparent 1px),
              linear-gradient(90deg, hsl(50 100% 50% / 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Brighter grid intersection dots */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at center, hsl(50 100% 50% / 0.12) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Very subtle vignette */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, hsl(0 0% 6% / 0.3) 100%)',
        }}
      />
    </>
  );
};

export default BackgroundEffects;
