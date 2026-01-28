import { useEffect, useState, useCallback, useMemo } from 'react';

// Define color stops for each section (in order) with story switches
// Format: bg (RGB), accent (HSL), glow (HSL), isLightMode (for text adaptation), transitionIntensity, noVignette, noGrid, isEditorial
const sectionColors = [
  // Hero - deep charcoal with subtle gold
  { bg: [12, 12, 12], accent: [45, 70, 50], glow: [45, 80, 50], light: false, intensity: 1, noVignette: false, noGrid: false, isEditorial: false },
  // Features - slightly warmer dark
  { bg: [18, 16, 14], accent: [48, 65, 45], glow: [50, 75, 48], light: false, intensity: 1.2, noVignette: false, noGrid: false, isEditorial: false },
  // Pre-Calculator transition zone - fade out dark elements
  { bg: [80, 75, 68], accent: [42, 60, 40], glow: [45, 65, 45], light: false, intensity: 0.6, noVignette: true, noGrid: false, isEditorial: false },
  // Calculator - Warm cream with bronze accents (NO bright yellow/gold)
  { bg: [252, 248, 240], accent: [35, 45, 35], glow: [38, 50, 40], light: true, intensity: 1.8, noVignette: true, noGrid: false, isEditorial: false },
  // Post-Calculator transition - gradual return to dark
  { bg: [60, 55, 48], accent: [42, 55, 38], glow: [45, 60, 42], light: false, intensity: 0.7, noVignette: true, noGrid: false, isEditorial: false },
  // Partners - back to deep dark - smooth transition
  { bg: [10, 10, 10], accent: [50, 70, 48], glow: [48, 80, 52], light: false, intensity: 1.5, noVignette: false, noGrid: false, isEditorial: false },
  // Pricing - neutral dark with warm undertone
  { bg: [20, 18, 15], accent: [45, 75, 52], glow: [45, 85, 50], light: false, intensity: 1.2, noVignette: false, noGrid: false, isEditorial: false },
  // Pre-Story transition zone
  { bg: [75, 70, 62], accent: [38, 55, 38], glow: [42, 60, 42], light: false, intensity: 0.6, noVignette: true, noGrid: true },
  // Our Story - Warm cream with bronze accents (EDITORIAL - no grid, no vignette, no tech effects)
  { bg: [252, 248, 240], accent: [35, 45, 35], glow: [38, 50, 40], light: true, intensity: 1.8, noVignette: true, noGrid: true, isEditorial: true },
  // Post-Story transition
  { bg: [55, 50, 44], accent: [40, 50, 36], glow: [44, 55, 40], light: false, intensity: 0.7, noVignette: true, noGrid: true, isEditorial: false },
  // CTA - deep cinematic dark with intense gold accents
  { bg: [8, 8, 8], accent: [48, 80, 55], glow: [45, 90, 60], light: false, intensity: 1.5, noVignette: false, noGrid: false, isEditorial: false },
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
  intensity: section.intensity,
  noVignette: section.noVignette,
  noGrid: section.noGrid,
  isEditorial: section.isEditorial,
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
      setGridOpacity(0.18 + Math.sin(phase * Math.PI * 2) * 0.10);
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
    
    // Smoother easing for seamless transitions
    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    
    const c1 = sectionColorsRGB[currentSection];
    const c2 = sectionColorsRGB[nextSection];
    
    setCurrentBg(lerpColor(c1.bg, c2.bg, eased));
    setCurrentAccent(lerpColor(c1.accent, c2.accent, eased));
    setCurrentGlow(lerpColor(c1.glow, c2.glow, eased));
    
    // Calculate if we're in a light section for text adaptation
    const isLight = c1.light && c2.light ? 1 : 
                    c1.light && !c2.light ? 1 - eased :
                    !c1.light && c2.light ? eased : 0;
    
    // Calculate vignette visibility (fade out in light sections)
    const noVignette = c1.noVignette && c2.noVignette ? 1 :
                       c1.noVignette && !c2.noVignette ? 1 - eased :
                       !c1.noVignette && c2.noVignette ? eased : 0;
    
    // Calculate grid visibility (fade out in editorial/no-grid sections)
    const noGrid = c1.noGrid && c2.noGrid ? 1 :
                   c1.noGrid && !c2.noGrid ? 1 - eased :
                   !c1.noGrid && c2.noGrid ? eased : 0;
    
    // Calculate editorial mode (completely different treatment)
    const isEditorial = c1.isEditorial && c2.isEditorial ? 1 :
                        c1.isEditorial && !c2.isEditorial ? 1 - eased :
                        !c1.isEditorial && c2.isEditorial ? eased : 0;
    
    // Update CSS custom properties for global text adaptation
    document.documentElement.style.setProperty('--scroll-light-mode', isLight.toString());
    document.documentElement.style.setProperty('--scroll-no-vignette', noVignette.toString());
    document.documentElement.style.setProperty('--scroll-no-grid', noGrid.toString());
    document.documentElement.style.setProperty('--scroll-is-editorial', isEditorial.toString());
    
    // Premium anthracite colors for light sections (NO pure black)
    // Dark: #2B2B2B (43,43,43), Light secondary: #4A4A4A (74,74,74)
    // Headings in light: bronze-accented anthracite
    if (isLight > 0.5) {
      document.documentElement.style.setProperty('--scroll-text-color', '43, 43, 43');
      document.documentElement.style.setProperty('--scroll-heading-color', '48, 42, 35');
    } else {
      document.documentElement.style.setProperty('--scroll-text-color', '255, 255, 255');
      document.documentElement.style.setProperty('--scroll-heading-color', '255, 220, 100');
    }
  }, [scrollProgress]);

  // Calculate current section intensity for enhanced transitions
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
  
  // Calculate glow positions based on scroll - MORE dynamic movement
  const glowOffset1 = Math.sin(scrollProgress * Math.PI * 4 + breathePhase * Math.PI * 2) * 25 * currentIntensity;
  const glowOffset2 = Math.cos(scrollProgress * Math.PI * 3 + breathePhase * Math.PI * 2) * 30 * currentIntensity;
  const glowScale = 1 + Math.sin(scrollProgress * Math.PI * 5) * 0.25 * currentIntensity;
  
  // Enhanced dynamic vignette parameters - MORE dramatic and alive
  const vignetteIntensity = 0.35 + Math.sin(scrollProgress * Math.PI * 3) * 0.2 + (currentIntensity - 1) * 0.1;
  const vignetteSize = 70 - scrollProgress * 20 + Math.sin(breathePhase * Math.PI * 2) * 8;
  const vignetteShift = Math.sin(scrollProgress * Math.PI * 2) * 5;
  
  // Calculate vignette opacity based on section (fade out for light sections)
  const noVignetteValue = parseFloat(document.documentElement.style.getPropertyValue('--scroll-no-vignette') || '0');
  const vignetteOpacity = 1 - noVignetteValue;
  
  // Calculate grid opacity based on section (fade out for editorial sections)
  const noGridValue = parseFloat(document.documentElement.style.getPropertyValue('--scroll-no-grid') || '0');
  const gridVisibility = 1 - noGridValue;
  
  // Check if we're in editorial mode (Our Story section)
  const isEditorialValue = parseFloat(document.documentElement.style.getPropertyValue('--scroll-is-editorial') || '0');

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

      {/* Animated floating glow orbs - ENHANCED (fade out in editorial mode) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700"
        style={{ opacity: 1 - isEditorialValue }}
      >
        {/* Primary large glow - follows scroll dramatically */}
        <div 
          className="absolute w-[60vw] h-[60vh] rounded-full blur-[120px] transition-all duration-700"
          style={{
            background: `radial-gradient(circle, ${rgbToString(currentGlow, 0.2 * glowScale * currentIntensity)} 0%, transparent 65%)`,
            left: `${-5 + glowOffset1}%`,
            top: `${-10 + scrollProgress * 40}%`,
            transform: `scale(${glowScale * 1.1})`,
          }}
        />
        {/* Secondary accent glow */}
        <div 
          className="absolute w-[50vw] h-[50vh] rounded-full blur-[100px] transition-all duration-700"
          style={{
            background: `radial-gradient(circle, ${rgbToString(currentAccent, 0.18 * currentIntensity)} 0%, transparent 60%)`,
            right: `${-5 + glowOffset2}%`,
            top: `${15 + scrollProgress * 35}%`,
            transform: `scale(${1 + scrollProgress * 0.25})`,
          }}
        />
        {/* Tertiary moving glow */}
        <div 
          className="absolute w-[45vw] h-[45vh] rounded-full blur-[90px] transition-all duration-700"
          style={{
            background: `radial-gradient(circle, ${rgbToString(currentGlow, 0.15 * currentIntensity)} 0%, transparent 55%)`,
            left: `${40 + glowOffset2 * 2.5}%`,
            bottom: `${10 + (1 - scrollProgress) * 30}%`,
            transform: `rotate(${scrollProgress * 45}deg)`,
          }}
        />
        {/* Fourth glow for depth during transitions */}
        <div 
          className="absolute w-[40vw] h-[40vh] rounded-full blur-[80px] transition-all duration-500"
          style={{
            background: `radial-gradient(circle, ${rgbToString(currentAccent, 0.12 * (currentIntensity - 0.5))} 0%, transparent 50%)`,
            left: `${20 + glowOffset1 * 1.5}%`,
            top: `${50 + glowOffset2}%`,
          }}
        />
      </div>

      {/* Scroll-reactive grid with breathing - adapts to light/dark, fades in editorial */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          opacity: gridVisibility,
          backgroundImage: `
            linear-gradient(${rgbToString(currentAccent, gridOpacity * 1.2)} 1.5px, transparent 1.5px),
            linear-gradient(90deg, ${rgbToString(currentAccent, gridOpacity * 1.2)} 1.5px, transparent 1.5px)
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

      {/* Section transition highlight - ENHANCED with more dramatic pulse */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          background: `
            linear-gradient(180deg, 
              transparent 0%, 
              ${rgbToString(currentGlow, 0.04 * currentIntensity + Math.sin(scrollProgress * Math.PI * 8) * 0.03)} 40%,
              ${rgbToString(currentGlow, 0.08 * currentIntensity + Math.sin(scrollProgress * Math.PI * 8) * 0.05)} 50%,
              ${rgbToString(currentGlow, 0.04 * currentIntensity + Math.sin(scrollProgress * Math.PI * 8) * 0.03)} 60%,
              transparent 100%
            )
          `,
        }}
      />
      
      {/* Horizontal light streaks during story switches */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
        style={{
          opacity: currentIntensity > 1.3 ? (currentIntensity - 1.3) * 1.5 : 0,
          background: `
            linear-gradient(90deg, 
              transparent 0%, 
              ${rgbToString(currentGlow, 0.06)} 20%,
              ${rgbToString(currentGlow, 0.1)} 50%,
              ${rgbToString(currentGlow, 0.06)} 80%,
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

      {/* === LIGHT SECTION PREMIUM EFFECTS (NOT in editorial sections) === */}
      
      {/* A) Ultra-fine material texture - luxury paper/ceramic grain (NOT in editorial) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
        style={{
          opacity: (vignetteOpacity < 0.5 && isEditorialValue < 0.3) ? (1 - vignetteOpacity * 2) * 0.035 : 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply',
        }}
      />
      
      {/* B) Animated geometry - thin floating lines (NOT in editorial - Our Story has its own treatment) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-1000"
        style={{
          opacity: (vignetteOpacity < 0.5 && isEditorialValue < 0.3) ? (1 - vignetteOpacity * 2) : 0,
        }}
      >
        {/* Horizontal drifting line 1 */}
        <div 
          className="absolute w-[120%] h-[1px] transition-all duration-[3000ms] ease-linear"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(120, 100, 70, 0.05) 30%, rgba(120, 100, 70, 0.08) 50%, rgba(120, 100, 70, 0.05) 70%, transparent 100%)',
            top: `${25 + Math.sin(breathePhase * Math.PI * 2) * 3}%`,
            left: `${-10 + Math.sin(scrollProgress * Math.PI * 2 + breathePhase * Math.PI) * 8}%`,
          }}
        />
        {/* Horizontal drifting line 2 */}
        <div 
          className="absolute w-[100%] h-[1px] transition-all duration-[4000ms] ease-linear"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(100, 85, 60, 0.04) 40%, rgba(100, 85, 60, 0.06) 50%, rgba(100, 85, 60, 0.04) 60%, transparent 100%)',
            top: `${55 + Math.cos(breathePhase * Math.PI * 2) * 4}%`,
            left: `${5 - Math.cos(scrollProgress * Math.PI * 1.5) * 6}%`,
          }}
        />
        {/* Vertical subtle line */}
        <div 
          className="absolute h-[80%] w-[1px] transition-all duration-[5000ms] ease-linear"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(110, 95, 65, 0.03) 20%, rgba(110, 95, 65, 0.05) 50%, rgba(110, 95, 65, 0.03) 80%, transparent 100%)',
            left: `${75 + Math.sin(breathePhase * Math.PI) * 5}%`,
            top: `${10 + Math.sin(scrollProgress * Math.PI * 2) * 3}%`,
          }}
        />
        {/* Floating circle accent */}
        <div 
          className="absolute w-[200px] h-[200px] rounded-full border transition-all duration-[6000ms] ease-linear"
          style={{
            borderColor: 'rgba(100, 80, 50, 0.03)',
            borderWidth: '1px',
            left: `${20 + Math.sin(breathePhase * Math.PI * 2) * 8}%`,
            top: `${35 + Math.cos(breathePhase * Math.PI * 2) * 5}%`,
            transform: `scale(${1 + Math.sin(breathePhase * Math.PI) * 0.08})`,
          }}
        />
        {/* Second floating circle */}
        <div 
          className="absolute w-[150px] h-[150px] rounded-full border transition-all duration-[7000ms] ease-linear"
          style={{
            borderColor: 'rgba(90, 75, 50, 0.025)',
            borderWidth: '1px',
            right: `${15 + Math.cos(breathePhase * Math.PI * 2) * 6}%`,
            bottom: `${25 + Math.sin(breathePhase * Math.PI * 2) * 4}%`,
            transform: `scale(${1 + Math.cos(breathePhase * Math.PI) * 0.06})`,
          }}
        />
      </div>
      
      {/* C) Light refraction effect - ultra subtle passing light (NOT in editorial) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
        style={{
          opacity: (vignetteOpacity < 0.5 && isEditorialValue < 0.3) ? (1 - vignetteOpacity * 2) * 0.25 : 0,
          background: `
            radial-gradient(
              ellipse 100% 60% at ${30 + Math.sin((breathePhase + scrollProgress * 0.3) * Math.PI * 2) * 25}% ${20 + Math.cos(breathePhase * Math.PI) * 15}%, 
              rgba(255, 252, 248, 0.4) 0%, 
              transparent 50%
            )
          `,
        }}
      />
      
      {/* D) Rhythm-based scroll-reactive subtle glow (NOT in editorial) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-700"
        style={{
          opacity: (vignetteOpacity < 0.5 && isEditorialValue < 0.3) ? (1 - vignetteOpacity * 2) * 0.15 : 0,
          background: `
            radial-gradient(ellipse 70% 45% at ${40 + scrollProgress * 20}% ${35 + Math.sin(scrollProgress * Math.PI * 3) * 10}%, 
              rgba(180, 160, 120, 0.08) 0%, 
              transparent 60%
            ),
            radial-gradient(ellipse 50% 35% at ${60 - scrollProgress * 15}% ${65 - Math.cos(scrollProgress * Math.PI * 2) * 8}%, 
              rgba(160, 140, 100, 0.06) 0%, 
              transparent 50%
            )
          `,
        }}
      />

      {/* Dynamic cinematic vignette - fades out in light sections */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-500"
        style={{
          opacity: vignetteOpacity,
          background: `
            radial-gradient(
              ellipse ${vignetteSize}% ${vignetteSize * 0.8}% at ${50 + vignetteShift + glowOffset1 * 0.4}% ${50 + glowOffset2 * 0.3}%, 
              transparent 15%, 
              rgba(0, 0, 0, ${vignetteIntensity * 0.5}) 60%,
              rgba(0, 0, 0, ${vignetteIntensity * 0.8}) 80%,
              rgba(0, 0, 0, ${vignetteIntensity * 1.1}) 100%
            )
          `,
        }}
      />
      
      {/* Secondary vignette layer - orbiting effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-500"
        style={{
          opacity: vignetteOpacity,
          background: `
            radial-gradient(
              ellipse ${vignetteSize + 15}% ${(vignetteSize + 15) * 0.85}% at ${50 - vignetteShift * 0.8 - glowOffset2 * 0.25}% ${50 - glowOffset1 * 0.2}%, 
              transparent 25%, 
              rgba(0, 0, 0, ${vignetteIntensity * 0.4}) 100%
            )
          `,
        }}
      />
      
      {/* Tertiary vignette - subtle edge darkening that pulses */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          opacity: vignetteOpacity * 0.8,
          background: `
            radial-gradient(
              ellipse 90% 75% at 50% ${50 + breathePhase * 10 - 5}%, 
              transparent 40%, 
              rgba(0, 0, 0, ${0.15 + breathePhase * 0.1}) 100%
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
