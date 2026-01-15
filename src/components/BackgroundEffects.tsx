const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />
      
      {/* Aurora effect - yellow/gold glow */}
      <div 
        className="absolute -top-1/2 -left-1/4 w-[80%] h-[80%] rounded-full opacity-20 blur-[120px] animate-aurora-1"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(50 100% 50% / 0.4) 0%, transparent 70%)',
        }}
      />
      
      {/* Aurora effect - green glow */}
      <div 
        className="absolute -bottom-1/4 -right-1/4 w-[70%] h-[70%] rounded-full opacity-15 blur-[100px] animate-aurora-2"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(145 60% 40% / 0.5) 0%, transparent 70%)',
        }}
      />
      
      {/* Subtle secondary yellow glow */}
      <div 
        className="absolute top-1/4 right-1/4 w-[50%] h-[50%] rounded-full opacity-10 blur-[80px] animate-aurora-3"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(45 100% 45% / 0.3) 0%, transparent 60%)',
        }}
      />
    </div>
  );
};

export default BackgroundEffects;
