import { useEffect, useState, useCallback } from 'react';

// Define color stops for each section (in order)
const sectionColors = [
  // Hero - deep charcoal with subtle gold
  { bg: [12, 12, 12], accent: [45, 70, 50], glow: [45, 80, 50] },
  // Features - slightly warmer dark
  { bg: [14, 13, 11], accent: [48, 65, 45], glow: [50, 75, 48] },
  // Calculator - warm gold gradient
  { bg: [28, 24, 18], accent: [45, 60, 55], glow: [42, 70, 52] },
  // Partners - back to deep dark
  { bg: [12, 12, 12], accent: [50, 65, 45], glow: [48, 75, 50] },
  // Pricing - neutral dark
  { bg: [13, 13, 13], accent: [45, 70, 50], glow: [45, 80, 48] },
  // Our Story - warm gold
  { bg: [26, 22, 16], accent: [42, 65, 55], glow: [40, 75, 55] },
  // CTA - gradient dark to gold
  { bg: [16, 14, 12], accent: [48, 70, 52], glow: [45, 80, 55] },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const lerpColor = (
  c1: [number, number, number], 
  c2: [number, number, number], 
  t: number
): [number, number, number] => [
  lerp(c1[0], c2[0], t),
  lerp(c1[1], c2[1], t),
  lerp(c1[2], c2[2], t),
];

const rgbToString = (c: [number, number, number], alpha = 1) => 
  `rgba(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])}, ${alpha})`;

const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
};

// Convert section colors from HSL-like to RGB
const sectionColorsRGB = sectionColors.map(section => ({
  bg: section.bg as [number, number, number],
  accent: hslToRgb(section.accent[0], section.accent[1], section.accent[2]),
  glow: hslToRgb(section.glow[0], section.glow[1], section.glow[2]),
}));

const ScrollDrivenBackground = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentBg, setCurrentBg] = useState<[number, number, number]>([12, 12, 12]);
  const [currentAccent, setCurrentAccent] = useState<[number, number, number]>([180, 140, 50]);
  const [currentGlow, setCurrentGlow] = useState<[number, number, number]>([200, 160, 60]);
  const [gridOpacity, setGridOpacity] = useState(0.12);
  const [breathePhase, setBreathePhase] = useState(0);

  // Smooth scroll tracking with RAF
  const updateScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, scrollTop / docHeight));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    let rafId: number;
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      if (Math.abs(window.scrollY - lastScrollY) > 1) {
        lastScrollY = window.scrollY;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [updateScroll]);

  // Breathing animation for grid
  useEffect(() => {
    let startTime = Date.now();
    let rafId: number;
    
    const breathe = () => {
      const elapsed = (Date.now() - startTime) % 10000;
      const phase = elapsed / 10000;
      setBreathePhase(phase);
      setGridOpacity(0.08 + Math.sin(phase * Math.PI * 2) * 0.06);
      rafId = requestAnimationFrame(breathe);
    };
    
    rafId = requestAnimationFrame(breathe);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Interpolate colors based on scroll
  useEffect(() => {
    const numSections = sectionColorsRGB.length;
    const sectionProgress = scrollProgress * (numSections - 1);
    const currentSection = Math.floor(sectionProgress);
    const nextSection = Math.min(currentSection + 1, numSections - 1);
    const t = sectionProgress - currentSection;
    
    // Smooth easing
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    
    const c1 = sectionColorsRGB[currentSection];
    const c2 = sectionColorsRGB[nextSection];
    
    setCurrentBg(lerpColor(c1.bg, c2.bg, eased));
    setCurrentAccent(lerpColor(c1.accent, c2.accent, eased));
    setCurrentGlow(lerpColor(c1.glow, c2.glow, eased));
  }, [scrollProgress]);

  // Calculate glow positions based on scroll
  const glowOffset1 = Math.sin(scrollProgress * Math.PI * 2 + breathePhase * Math.PI * 2) * 10;
  const glowOffset2 = Math.cos(scrollProgress * Math.PI * 1.5 + breathePhase * Math.PI * 2) * 15;
  const glowScale = 1 + Math.sin(scrollProgress * Math.PI * 3) * 0.1;

  return (
    <>
      {/* Dynamic scroll-driven background */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-colors duration-300"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 50% ${-10 + scrollProgress * 20}%, ${rgbToString(currentAccent, 0.08)} 0%, transparent 50%),
            radial-gradient(ellipse 80% 50% at ${20 + glowOffset1}% ${30 + scrollProgress * 20}%, ${rgbToString(currentGlow, 0.06)} 0%, transparent 40%),
            radial-gradient(ellipse 60% 40% at ${80 + glowOffset2}% ${60 - scrollProgress * 15}%, ${rgbToString(currentGlow, 0.05)} 0%, transparent 35%),
            linear-gradient(180deg, ${rgbToString(currentBg)} 0%, ${rgbToString(lerpColor(currentBg, [8, 8, 8], 0.3))} 100%)
          `,
        }}
      />

      {/* Animated floating glow orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute w-[50vw] h-[50vh] rounded-full blur-[100px] transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${rgbToString(currentGlow, 0.15 * glowScale)} 0%, transparent 70%)`,
            left: `${5 + glowOffset1}%`,
            top: `${5 + scrollProgress * 30}%`,
            transform: `scale(${glowScale})`,
          }}
        />
        <div 
          className="absolute w-[40vw] h-[40vh] rounded-full blur-[80px] transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${rgbToString(currentAccent, 0.12)} 0%, transparent 65%)`,
            right: `${10 + glowOffset2}%`,
            top: `${25 + scrollProgress * 25}%`,
            transform: `scale(${1 + scrollProgress * 0.15})`,
          }}
        />
        <div 
          className="absolute w-[35vw] h-[35vh] rounded-full blur-[70px] transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${rgbToString(currentGlow, 0.1)} 0%, transparent 60%)`,
            left: `${50 + glowOffset2 * 2}%`,
            bottom: `${15 + (1 - scrollProgress) * 20}%`,
          }}
        />
      </div>

      {/* Scroll-reactive grid with breathing */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          backgroundImage: `
            linear-gradient(${rgbToString(currentAccent, gridOpacity)} 1px, transparent 1px),
            linear-gradient(90deg, ${rgbToString(currentAccent, gridOpacity)} 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          backgroundPosition: `0 ${scrollProgress * -20}px`,
          maskImage: `
            radial-gradient(ellipse 55% 45% at ${20 + scrollProgress * 10}% ${12 + scrollProgress * 15}%, black 0%, transparent 85%),
            radial-gradient(ellipse 50% 40% at ${78 - scrollProgress * 8}% ${22 + scrollProgress * 10}%, black 0%, transparent 80%),
            radial-gradient(ellipse 45% 35% at ${88 - scrollProgress * 15}% ${55 + scrollProgress * 5}%, black 0%, transparent 75%),
            radial-gradient(ellipse 55% 42% at ${12 + scrollProgress * 12}% ${52 + scrollProgress * 8}%, black 0%, transparent 85%),
            radial-gradient(ellipse 48% 36% at ${62 - scrollProgress * 5}% ${78 - scrollProgress * 10}%, black 0%, transparent 80%)
          `,
          WebkitMaskImage: `
            radial-gradient(ellipse 55% 45% at ${20 + scrollProgress * 10}% ${12 + scrollProgress * 15}%, black 0%, transparent 85%),
            radial-gradient(ellipse 50% 40% at ${78 - scrollProgress * 8}% ${22 + scrollProgress * 10}%, black 0%, transparent 80%),
            radial-gradient(ellipse 45% 35% at ${88 - scrollProgress * 15}% ${55 + scrollProgress * 5}%, black 0%, transparent 75%),
            radial-gradient(ellipse 55% 42% at ${12 + scrollProgress * 12}% ${52 + scrollProgress * 8}%, black 0%, transparent 85%),
            radial-gradient(ellipse 48% 36% at ${62 - scrollProgress * 5}% ${78 - scrollProgress * 10}%, black 0%, transparent 80%)
          `,
        }}
      />

      {/* Premium film grain */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Cinematic vignette that shifts with scroll */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse ${70 - scrollProgress * 10}% ${60 - scrollProgress * 5}% at center, transparent 30%, rgba(0, 0, 0, ${0.5 + scrollProgress * 0.1}) 100%)
          `,
        }}
      />

      {/* Top/bottom ambient lighting */}
      <div 
        className="fixed top-0 left-0 right-0 h-48 pointer-events-none z-0"
        style={{
          background: `linear-gradient(180deg, ${rgbToString(currentBg, 0.8)} 0%, transparent 100%)`,
        }}
      />
      <div 
        className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-0"
        style={{
          background: `linear-gradient(0deg, ${rgbToString(currentBg, 0.9)} 0%, transparent 100%)`,
        }}
      />
    </>
  );
};

export default ScrollDrivenBackground;
