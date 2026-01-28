import { useEffect, useState, useCallback } from 'react';

// Define color stops for each section (in order) with story switches
// Format: bg (RGB), accent (HSL), glow (HSL), isLightMode (for text adaptation)
const sectionColors = [
  // Hero - deep charcoal with subtle gold
  { bg: [12, 12, 12], accent: [45, 70, 50], glow: [45, 80, 50], light: false },
  // Features - slightly warmer dark
  { bg: [14, 13, 11], accent: [48, 65, 45], glow: [50, 75, 48], light: false },
  // Calculator - STORY SWITCH: Warm gold/cream (light mode)
  { bg: [245, 225, 180], accent: [42, 90, 35], glow: [45, 85, 45], light: true },
  // Partners - back to deep dark
  { bg: [12, 12, 12], accent: [50, 65, 45], glow: [48, 75, 50], light: false },
  // Pricing - neutral dark with warm undertone
  { bg: [16, 14, 12], accent: [45, 70, 50], glow: [45, 80, 48], light: false },
  // Our Story - STORY SWITCH: Rich gold (light mode)
  { bg: [235, 210, 160], accent: [40, 85, 40], glow: [42, 90, 50], light: true },
  // CTA - gradient dark with gold accents
  { bg: [14, 12, 10], accent: [48, 70, 52], glow: [45, 80, 55], light: false },
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
  light: section.light,
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

  // Interpolate colors based on scroll and update CSS variables for text adaptation
  useEffect(() => {
    const numSections = sectionColorsRGB.length;
    const sectionProgress = scrollProgress * (numSections - 1);
    const currentSection = Math.floor(sectionProgress);
    const nextSection = Math.min(currentSection + 1, numSections - 1);
    const t = sectionProgress - currentSection;
    
    // Smooth easing with more pronounced transitions
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    
    const c1 = sectionColorsRGB[currentSection];
    const c2 = sectionColorsRGB[nextSection];
    
    setCurrentBg(lerpColor(c1.bg, c2.bg, eased));
    setCurrentAccent(lerpColor(c1.accent, c2.accent, eased));
    setCurrentGlow(lerpColor(c1.glow, c2.glow, eased));
    
    // Calculate if we're in a light section for text adaptation
    const isLight = c1.light && c2.light ? 1 : 
                    c1.light && !c2.light ? 1 - eased :
                    !c1.light && c2.light ? eased : 0;
    
    // Update CSS custom properties for global text adaptation
    document.documentElement.style.setProperty('--scroll-light-mode', isLight.toString());
    document.documentElement.style.setProperty('--scroll-text-color', isLight > 0.5 ? '12, 10, 8' : '255, 255, 255');
    document.documentElement.style.setProperty('--scroll-heading-color', isLight > 0.5 ? '20, 15, 10' : '255, 220, 100');
  }, [scrollProgress]);

  // Calculate glow positions based on scroll - more dynamic movement
  const glowOffset1 = Math.sin(scrollProgress * Math.PI * 3 + breathePhase * Math.PI * 2) * 15;
  const glowOffset2 = Math.cos(scrollProgress * Math.PI * 2 + breathePhase * Math.PI * 2) * 20;
  const glowScale = 1 + Math.sin(scrollProgress * Math.PI * 4) * 0.15;
  
  // Dynamic vignette parameters based on scroll
  const vignetteIntensity = 0.4 + Math.sin(scrollProgress * Math.PI * 2) * 0.15;
  const vignetteSize = 65 - scrollProgress * 15 + Math.sin(breathePhase * Math.PI * 2) * 5;

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

      {/* Scroll-reactive grid with breathing - adapts to light/dark */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          backgroundImage: `
            linear-gradient(${rgbToString(currentAccent, gridOpacity * 0.8)} 1px, transparent 1px),
            linear-gradient(90deg, ${rgbToString(currentAccent, gridOpacity * 0.8)} 1px, transparent 1px)
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

      {/* Section transition highlight - appears at boundaries */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
        style={{
          background: `
            linear-gradient(180deg, 
              transparent 0%, 
              ${rgbToString(currentGlow, 0.03 + Math.sin(scrollProgress * Math.PI * 7) * 0.02)} 45%,
              ${rgbToString(currentGlow, 0.05 + Math.sin(scrollProgress * Math.PI * 7) * 0.03)} 50%,
              ${rgbToString(currentGlow, 0.03 + Math.sin(scrollProgress * Math.PI * 7) * 0.02)} 55%,
              transparent 100%
            )
          `,
        }}
      />

      {/* Premium film grain - subtle texture */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Dynamic cinematic vignette - moves and breathes with scroll */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(
              ellipse ${vignetteSize}% ${vignetteSize * 0.85}% at ${50 + glowOffset1 * 0.3}% ${50 + glowOffset2 * 0.2}%, 
              transparent 20%, 
              rgba(0, 0, 0, ${vignetteIntensity * 0.6}) 70%,
              rgba(0, 0, 0, ${vignetteIntensity}) 100%
            )
          `,
        }}
      />
      
      {/* Secondary vignette layer for depth */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(
              ellipse ${vignetteSize + 10}% ${(vignetteSize + 10) * 0.9}% at ${50 - glowOffset2 * 0.2}% ${50 - glowOffset1 * 0.15}%, 
              transparent 30%, 
              rgba(0, 0, 0, ${vignetteIntensity * 0.3}) 100%
            )
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
