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

        {/* Large golden glow orbs - more visible */}
        <div 
          className="absolute top-[5%] left-[10%] w-[50%] h-[50%] rounded-full blur-[100px]"
          style={{
            background: 'radial-gradient(circle, hsl(45 100% 50% / 0.25) 0%, transparent 60%)',
          }}
        />
        
        <div 
          className="absolute top-[30%] right-[5%] w-[45%] h-[45%] rounded-full blur-[90px]"
          style={{
            background: 'radial-gradient(circle, hsl(50 100% 45% / 0.2) 0%, transparent 60%)',
          }}
        />
        
        <div 
          className="absolute top-[55%] left-[20%] w-[40%] h-[40%] rounded-full blur-[80px]"
          style={{
            background: 'radial-gradient(circle, hsl(48 100% 50% / 0.18) 0%, transparent 55%)',
          }}
        />

        <div 
          className="absolute top-[75%] right-[15%] w-[50%] h-[50%] rounded-full blur-[100px]"
          style={{
            background: 'radial-gradient(circle, hsl(45 100% 48% / 0.22) 0%, transparent 60%)',
          }}
        />

        <div 
          className="absolute top-[95%] left-[5%] w-[45%] h-[45%] rounded-full blur-[85px]"
          style={{
            background: 'radial-gradient(circle, hsl(50 100% 50% / 0.2) 0%, transparent 55%)',
          }}
        />

        {/* Golden grid pattern - more visible */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(50 100% 50% / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(50 100% 50% / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Brighter grid intersection points */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at center, hsl(50 100% 50% / 0.2) 2px, transparent 2px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Horizontal golden glow bands for section transitions */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              repeating-linear-gradient(
                180deg,
                transparent 0px,
                transparent 600px,
                hsl(50 100% 50% / 0.08) 650px,
                hsl(50 100% 50% / 0.12) 700px,
                hsl(50 100% 50% / 0.08) 750px,
                transparent 800px,
                transparent 1400px
              )
            `,
          }}
        />
      </div>

      {/* Soft vignette */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(0 0% 5% / 0.4) 100%)',
        }}
      />
    </>
  );
};

export default BackgroundEffects;
