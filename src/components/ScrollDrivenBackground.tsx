import { useEffect, useState, useCallback, useMemo } from 'react';

// SIMPLIFIED: Only TWO themes - DARK (first half) and LIGHT (second half)
// Single transition happens between Klijenti (Partners) and Kalkulator sections
// Page structure: Hero → Features → Klijenti(dark) → [TRANSITION] → Kalkulator(light) → Our Story(light) → CTA(light)
const sectionColors = [
  // Hero - deep charcoal with subtle gold (DARK)
  { bg: [12, 12, 12], accent: [45, 70, 50], glow: [45, 80, 50], light: false, intensity: 1, noVignette: false, noGrid: false, isEditorial: false },
  // Features - slightly warmer dark (DARK)
  { bg: [18, 16, 14], accent: [48, 65, 45], glow: [50, 75, 48], light: false, intensity: 1.2, noVignette: false, noGrid: false, isEditorial: false },
  // Partners/Klijenti - last dark section (DARK)
  { bg: [14, 14, 14], accent: [50, 70, 48], glow: [48, 80, 52], light: false, intensity: 1.3, noVignette: false, noGrid: false, isEditorial: false },
  // === SINGLE TRANSITION POINT === Calculator - first light section (LIGHT - stays light from here)
  { bg: [252, 248, 240], accent: [35, 45, 35], glow: [38, 50, 40], light: true, intensity: 1.6, noVignette: false, noGrid: false, isEditorial: false },
  // Our Story (LIGHT - editorial style)
  { bg: [252, 248, 240], accent: [35, 45, 35], glow: [38, 50, 40], light: true, intensity: 1.6, noVignette: false, noGrid: true, isEditorial: true },
  // CTA - stays light with subtle warmth
  { bg: [248, 244, 236], accent: [38, 48, 38], glow: [40, 52, 42], light: true, intensity: 1.4, noVignette: false, noGrid: false, isEditorial: false },
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

  // Breathing animation for grid with varying line intensity
  useEffect(() => {
    let startTime = Date.now();
    let rafId: number;
    
    const breathe = () => {
      const elapsed = (Date.now() - startTime) % 10000;
      const phase = elapsed / 10000;
      setBreathePhase(phase);
      // Base grid opacity - will be multiplied by light/dark factor
      setGridOpacity(0.12 + Math.sin(phase * Math.PI * 2) * 0.06);
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
    
    // Detect the SINGLE dark→light transition (section 2→3, Klijenti→Kalkulator)
    const isMainTransition = currentSection === 2 && nextSection === 3;
    
    // ULTRA-FAST transition easing for the main dark→light switch
    // Happens ONLY in the narrow gap between sections (0.42 to 0.58)
    let eased: number;
    if (isMainTransition) {
      // Main transition: super fast, happens in narrow window
      if (t < 0.42) {
        eased = 0;
      } else if (t > 0.58) {
        eased = 1;
      } else {
        // Ultra-fast transition in 16% window
        const transitionT = (t - 0.42) / 0.16;
        // Sharp ease-in-out for instant feel
        eased = transitionT < 0.5 
          ? 4 * transitionT * transitionT * transitionT
          : 1 - Math.pow(-2 * transitionT + 2, 3) / 2;
      }
    } else {
      // Other transitions: also fast but less critical
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
    }
    
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
      {(() => {
        const isLightSection = vignetteOpacity < 0.5;
        // Light sections: pure clean background, no dark lerping
        // Dark sections: keep the subtle darkening gradient
        const bgGradient = isLightSection
          ? `linear-gradient(180deg, ${rgbToString(currentBg)} 0%, ${rgbToString(currentBg)} 100%)`
          : `linear-gradient(180deg, ${rgbToString(currentBg)} 0%, ${rgbToString(lerpColor(currentBg, [8, 8, 8], 0.3))} 100%)`;
        
        // Light sections: no colored accent glows (keep it clean)
        const accentOpacity = isLightSection ? 0 : 0.08;
        const glowOpacity1 = isLightSection ? 0 : 0.06;
        const glowOpacity2 = isLightSection ? 0 : 0.05;
        
        return (
          <div 
            className="fixed inset-0 pointer-events-none z-0 transition-colors duration-300"
            style={{
              background: `
                radial-gradient(ellipse 100% 60% at 50% ${-10 + scrollProgress * 20}%, ${rgbToString(currentAccent, accentOpacity)} 0%, transparent 50%),
                radial-gradient(ellipse 80% 50% at ${20 + glowOffset1}% ${30 + scrollProgress * 20}%, ${rgbToString(currentGlow, glowOpacity1)} 0%, transparent 40%),
                radial-gradient(ellipse 60% 40% at ${80 + glowOffset2}% ${60 - scrollProgress * 15}%, ${rgbToString(currentGlow, glowOpacity2)} 0%, transparent 35%),
                ${bgGradient}
              `,
            }}
          />
        );
      })()}

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

      {/* Scroll-reactive grid with breathing - SAME intensity for both dark and light */}
      {(() => {
        // Calculate light mode factor for grid color
        const isLightSection = vignetteOpacity < 0.5;
        // SAME grid intensity for both sections (no multiplier difference)
        const gridIntensityMultiplier = 1.0;
        // Varying line opacity based on breathe phase - creates fade/strengthen effect
        const lineVariation1 = 0.8 + Math.sin(breathePhase * Math.PI * 4) * 0.2;
        const lineVariation2 = 0.8 + Math.cos(breathePhase * Math.PI * 3 + 1) * 0.2;
        const baseOpacity = gridOpacity * gridIntensityMultiplier;
        // Light sections use dark anthracite color, dark sections use accent
        const gridColor = isLightSection 
          ? `rgba(64, 64, 64, ${baseOpacity * lineVariation1})`
          : rgbToString(currentAccent, baseOpacity * lineVariation1 * 0.8);
        const gridColor2 = isLightSection
          ? `rgba(64, 64, 64, ${baseOpacity * lineVariation2})`
          : rgbToString(currentAccent, baseOpacity * lineVariation2 * 0.8);
        
        return (
          <div 
            className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
            style={{
              opacity: gridVisibility,
              backgroundImage: `
                linear-gradient(${gridColor} 1.5px, transparent 1.5px),
                linear-gradient(90deg, ${gridColor2} 1.5px, transparent 1.5px)
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
        );
      })()}

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
      
      {/* LIGHT SECTION VIGNETTE - extra white glow, stronger intensity */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-500"
        style={{
          opacity: 1 - vignetteOpacity,
          background: `
            radial-gradient(
              ellipse ${vignetteSize}% ${vignetteSize * 0.8}% at ${50 + vignetteShift + glowOffset1 * 0.4}% ${50 + glowOffset2 * 0.3}%, 
              transparent 10%, 
              rgba(255, 255, 255, ${vignetteIntensity * 0.7}) 50%,
              rgba(255, 255, 255, ${vignetteIntensity * 1.0}) 70%,
              rgba(255, 255, 255, ${vignetteIntensity * 1.4}) 100%
            )
          `,
        }}
      />
      
      {/* Secondary white vignette layer - orbiting effect (mirror of dark) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-500"
        style={{
          opacity: 1 - vignetteOpacity,
          background: `
            radial-gradient(
              ellipse ${vignetteSize + 15}% ${(vignetteSize + 15) * 0.85}% at ${50 - vignetteShift * 0.8 - glowOffset2 * 0.25}% ${50 - glowOffset1 * 0.2}%, 
              transparent 20%, 
              rgba(255, 255, 255, ${vignetteIntensity * 0.6}) 100%
            )
          `,
        }}
      />
      
      {/* Tertiary white vignette - edge brightening that pulses */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          opacity: 1 - vignetteOpacity,
          background: `
            radial-gradient(
              ellipse 90% 75% at 50% ${50 + breathePhase * 10 - 5}%, 
              transparent 35%, 
              rgba(255, 255, 255, ${0.25 + breathePhase * 0.15}) 100%
            )
          `,
        }}
      />

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
