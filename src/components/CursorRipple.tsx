import { useEffect, useState, useCallback } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

const CursorRipple = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isLightSection, setIsLightSection] = useState(false);

  // Check if we're in a light section
  useEffect(() => {
    const checkLightMode = () => {
      const lightMode = parseFloat(
        document.documentElement.style.getPropertyValue('--scroll-light-mode') || '0'
      );
      setIsLightSection(lightMode > 0.5);
    };

    // Check on scroll
    window.addEventListener('scroll', checkLightMode, { passive: true });
    checkLightMode();

    return () => window.removeEventListener('scroll', checkLightMode);
  }, []);

  // Track mouse movement and create ripples
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isLightSection) return;

    const now = Date.now();
    
    setRipples(prev => {
      // Only add ripple if enough time passed (throttle)
      const lastRipple = prev[prev.length - 1];
      if (lastRipple && now - lastRipple.timestamp < 80) return prev;

      // Add new ripple
      const newRipple: Ripple = {
        id: now,
        x: e.clientX,
        y: e.clientY,
        timestamp: now,
      };

      // Keep only last 8 ripples
      return [...prev.slice(-7), newRipple];
    });
  }, [isLightSection]);

  // Clean up old ripples
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setRipples(prev => prev.filter(r => now - r.timestamp < 1200));
    }, 100);

    return () => clearInterval(cleanup);
  }, []);

  // Attach mouse listener
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  if (!isLightSection) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {ripples.map((ripple) => {
        const age = Date.now() - ripple.timestamp;
        const progress = Math.min(age / 1200, 1);
        const scale = 0.5 + progress * 2;
        const opacity = (1 - progress) * 0.35;

        return (
          <div
            key={ripple.id}
            className="absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 60,
              height: 60,
              marginLeft: -30,
              marginTop: -30,
              transform: `scale(${scale})`,
              opacity,
              background: `radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 40%, transparent 70%)`,
              boxShadow: `0 0 20px rgba(255, 255, 255, 0.5)`,
              transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
            }}
          />
        );
      })}
    </div>
  );
};

export default CursorRipple;
