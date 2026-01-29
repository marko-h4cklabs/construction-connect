import { useEffect, useState, useCallback } from 'react';

// ALL DARK THEME - No light sections
// Premium cinematic dark aesthetic throughout the entire page
const sectionColors = [
  // Hero - deep charcoal with subtle gold
  { bg: [12, 12, 12], accent: [45, 70, 50], glow: [45, 80, 50], intensity: 1 },
  // Features - slightly warmer dark
  { bg: [18, 16, 14], accent: [48, 65, 45], glow: [50, 75, 48], intensity: 1.2 },
  // Partners/Klijenti
  { bg: [14, 14, 14], accent: [50, 70, 48], glow: [48, 80, 52], intensity: 1.3 },
  // Calculator - dark with financial feel
  { bg: [10, 10, 12], accent: [48, 75, 52], glow: [50, 85, 55], intensity: 1.4 },
  // Our Story - warm dark
  { bg: [16, 14, 12], accent: [45, 70, 48], glow: [48, 78, 50], intensity: 1.3 },
  // CTA - deep dark for focus
  { bg: [8, 8, 10], accent: [50, 80, 55], glow: [52, 85, 58], intensity: 1.5 },
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
  intensity: section.intensity,
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

  // Enhanced breathing animation for grid - slower, more elegant
  useEffect(() => {
    let startTime = Date.now();
    let rafId: number;
    
    const breathe = () => {
      const elapsed = (Date.now() - startTime) % 12000; // Slower cycle
      const phase = elapsed / 12000;
      setBreathePhase(phase);
      // More pronounced breathing
      setGridOpacity(0.10 + Math.sin(phase * Math.PI * 2) * 0.08);
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
    
    // Smooth easing for transitions
    let eased: number;
    if (t < 0.35) {
      eased = 0;
    } else if (t > 0.65) {
      eased = 1;
    } else {
      const transitionT = (t - 0.35) / 0.30;
      eased = transitionT < 0.5 
        ? 2 * transitionT * transitionT 
        : 1 - Math.pow(-2 * transitionT + 2, 2) / 2;
    }
    
    const c1 = sectionColorsRGB[currentSection];
    const c2 = sectionColorsRGB[nextSection];
    
    setCurrentBg(lerpColor(c1.bg, c2.bg, eased));
    setCurrentAccent(lerpColor(c1.accent, c2.accent, eased));
    setCurrentGlow(lerpColor(c1.glow, c2.glow, eased));
    
    // Always dark mode text
    document.documentElement.style.setProperty('--scroll-text-color', '255, 255, 255');
    document.documentElement.style.setProperty('--scroll-heading-color', '255, 220, 100');
  }, [scrollProgress]);

  // Calculate current section intensity
  const numSections = sectionColorsRGB.length;
  const sectionProgress = scrollProgress * (numSections - 1);
  const currentSectionIdx = Math.floor(sectionProgress);
  const nextSectionIdx = Math.min(currentSectionIdx + 1, numSections - 1);
  const sectionT = sectionProgress - currentSectionIdx;
  const currentIntensity = lerp(
    sectionColorsRGB[currentSectionIdx].intensity,
    sectionColorsRGB[nextSectionIdx].intensity,
    sectionT
  );
  
  // Dynamic glow positions - slow, elegant movement
  const glowOffset1 = Math.sin(scrollProgress * Math.PI * 3 + breathePhase * Math.PI * 2) * 20 * currentIntensity;
  const glowOffset2 = Math.cos(scrollProgress * Math.PI * 2.5 + breathePhase * Math.PI * 2) * 25 * currentIntensity;
  const glowScale = 1 + Math.sin(scrollProgress * Math.PI * 4) * 0.2 * currentIntensity;
  
  // Enhanced vignette parameters
  const vignetteIntensity = 0.4 + Math.sin(scrollProgress * Math.PI * 2) * 0.15 + (currentIntensity - 1) * 0.1;
  const vignetteSize = 75 - scrollProgress * 15 + Math.sin(breathePhase * Math.PI * 2) * 6;
  const vignetteShift = Math.sin(scrollProgress * Math.PI * 2) * 4;

  // Varying line opacity for grid
  const lineVariation1 = 0.8 + Math.sin(breathePhase * Math.PI * 4) * 0.2;
  const lineVariation2 = 0.8 + Math.cos(breathePhase * Math.PI * 3 + 1) * 0.2;

  return (
    <>
      {/* Dynamic scroll-driven background */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-colors duration-500"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 50% ${-10 + scrollProgress * 20}%, ${rgbToString(currentAccent, 0.08)} 0%, transparent 50%),
            radial-gradient(ellipse 80% 50% at ${20 + glowOffset1}% ${30 + scrollProgress * 20}%, ${rgbToString(currentGlow, 0.06)} 0%, transparent 40%),
            radial-gradient(ellipse 60% 40% at ${80 + glowOffset2}% ${60 - scrollProgress * 15}%, ${rgbToString(currentGlow, 0.05)} 0%, transparent 35%),
            linear-gradient(180deg, ${rgbToString(currentBg)} 0%, ${rgbToString(lerpColor(currentBg, [6, 6, 8], 0.3))} 100%)
          `,
        }}
      />

      {/* Animated floating glow orbs - slow, elegant movement */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Primary large glow */}
        <div 
          className="absolute w-[60vw] h-[60vh] rounded-full blur-[120px] transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${rgbToString(currentGlow, 0.18 * glowScale * currentIntensity)} 0%, transparent 65%)`,
            left: `${-5 + glowOffset1}%`,
            top: `${-10 + scrollProgress * 40}%`,
            transform: `scale(${glowScale * 1.1})`,
          }}
        />
        {/* Secondary accent glow */}
        <div 
          className="absolute w-[50vw] h-[50vh] rounded-full blur-[100px] transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${rgbToString(currentAccent, 0.15 * currentIntensity)} 0%, transparent 60%)`,
            right: `${-5 + glowOffset2}%`,
            top: `${15 + scrollProgress * 35}%`,
            transform: `scale(${1 + scrollProgress * 0.2})`,
          }}
        />
        {/* Tertiary moving glow */}
        <div 
          className="absolute w-[45vw] h-[45vh] rounded-full blur-[90px] transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${rgbToString(currentGlow, 0.12 * currentIntensity)} 0%, transparent 55%)`,
            left: `${40 + glowOffset2 * 2}%`,
            bottom: `${10 + (1 - scrollProgress) * 30}%`,
            transform: `rotate(${scrollProgress * 30}deg)`,
          }}
        />
      </div>

      {/* Scroll-reactive grid with enhanced breathing */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
        style={{
          backgroundImage: `
            linear-gradient(${rgbToString(currentAccent, gridOpacity * lineVariation1 * 0.7)} 1.5px, transparent 1.5px),
            linear-gradient(90deg, ${rgbToString(currentAccent, gridOpacity * lineVariation2 * 0.7)} 1.5px, transparent 1.5px)
          `,
          backgroundSize: '80px 80px',
          backgroundPosition: `0 ${scrollProgress * -40}px`,
          maskImage: `
            radial-gradient(ellipse 55% 45% at ${20 + scrollProgress * 15}% ${12 + scrollProgress * 20}%, black 0%, transparent 85%),
            radial-gradient(ellipse 50% 40% at ${78 - scrollProgress * 12}% ${22 + scrollProgress * 15}%, black 0%, transparent 80%),
            radial-gradient(ellipse 45% 35% at ${88 - scrollProgress * 20}% ${55 + scrollProgress * 8}%, black 0%, transparent 75%),
            radial-gradient(ellipse 55% 42% at ${12 + scrollProgress * 18}% ${52 + scrollProgress * 12}%, black 0%, transparent 85%),
            radial-gradient(ellipse 48% 36% at ${62 - scrollProgress * 8}% ${78 - scrollProgress * 15}%, black 0%, transparent 80%)
          `,
          WebkitMaskImage: `
            radial-gradient(ellipse 55% 45% at ${20 + scrollProgress * 15}% ${12 + scrollProgress * 20}%, black 0%, transparent 85%),
            radial-gradient(ellipse 50% 40% at ${78 - scrollProgress * 12}% ${22 + scrollProgress * 15}%, black 0%, transparent 80%),
            radial-gradient(ellipse 45% 35% at ${88 - scrollProgress * 20}% ${55 + scrollProgress * 8}%, black 0%, transparent 75%),
            radial-gradient(ellipse 55% 42% at ${12 + scrollProgress * 18}% ${52 + scrollProgress * 12}%, black 0%, transparent 85%),
            radial-gradient(ellipse 48% 36% at ${62 - scrollProgress * 8}% ${78 - scrollProgress * 15}%, black 0%, transparent 80%)
          `,
        }}
      />

      {/* Premium film grain - subtle texture */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Dynamic cinematic vignette */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-700"
        style={{
          background: `
            radial-gradient(
              ellipse ${vignetteSize}% ${vignetteSize * 0.8}% at ${50 + vignetteShift + glowOffset1 * 0.3}% ${50 + glowOffset2 * 0.2}%, 
              transparent 15%, 
              rgba(0, 0, 0, ${vignetteIntensity * 0.5}) 60%,
              rgba(0, 0, 0, ${vignetteIntensity * 0.8}) 80%,
              rgba(0, 0, 0, ${vignetteIntensity * 1.1}) 100%
            )
          `,
        }}
      />
      
      {/* Secondary vignette layer */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-700"
        style={{
          background: `
            radial-gradient(
              ellipse ${vignetteSize + 15}% ${(vignetteSize + 15) * 0.85}% at ${50 - vignetteShift * 0.8 - glowOffset2 * 0.2}% ${50 - glowOffset1 * 0.15}%, 
              transparent 25%, 
              rgba(0, 0, 0, ${vignetteIntensity * 0.35}) 100%
            )
          `,
        }}
      />
      
      {/* Subtle edge darkening that pulses */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
        style={{
          opacity: 0.8,
          background: `
            radial-gradient(
              ellipse 90% 75% at 50% ${50 + breathePhase * 8 - 4}%, 
              transparent 40%, 
              rgba(0, 0, 0, ${0.12 + breathePhase * 0.08}) 100%
            )
          `,
        }}
      />

      {/* Top/bottom gradients for depth */}
      <div 
        className="fixed top-0 left-0 right-0 h-48 pointer-events-none z-0"
        style={{
          background: `linear-gradient(180deg, ${rgbToString(currentBg, 0.85)} 0%, transparent 100%)`,
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
