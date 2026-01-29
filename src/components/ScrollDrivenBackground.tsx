import { useEffect, useState, useCallback, useMemo } from 'react';

/**
 * PREMIUM MULTI-LAYERED BACKGROUND SYSTEM
 * 
 * Each section has unique visual treatment while maintaining cohesive identity:
 * - Hero: Deepest black, minimal noise, radial yellow glow behind title
 * - Features: Dark gradient + soft grid that appears on scroll entry
 * - Testimonials: Cleaner background, more air, yellow light wash behind video
 * - Logos: Calmest, almost static
 * - Calculator: Cockpit/dashboard style with focused light on results
 * - Our Story: Warmer charcoal, stronger vignette
 * - Final CTA: Very clean, deep black, no distractions
 */

// Section-specific background configurations
const sectionConfigs = [
  {
    name: 'hero',
    bg: [6, 6, 8] as [number, number, number],
    accent: [50, 80, 50] as [number, number, number],
    glow: [50, 90, 55] as [number, number, number],
    gridOpacity: 0.12,
    vignetteStrength: 0.35,
    ambientLight: 0.12,
    noiseOpacity: 0.015,
  },
  {
    name: 'features',
    bg: [12, 12, 14] as [number, number, number],
    accent: [48, 75, 48] as [number, number, number],
    glow: [50, 85, 52] as [number, number, number],
    gridOpacity: 0.15,
    vignetteStrength: 0.4,
    ambientLight: 0.08,
    noiseOpacity: 0.02,
  },
  {
    name: 'testimonials',
    bg: [10, 10, 12] as [number, number, number],
    accent: [48, 80, 50] as [number, number, number],
    glow: [50, 90, 55] as [number, number, number],
    gridOpacity: 0.1,
    vignetteStrength: 0.3,
    ambientLight: 0.15,
    noiseOpacity: 0.012,
  },
  {
    name: 'logos',
    bg: [8, 8, 10] as [number, number, number],
    accent: [45, 70, 45] as [number, number, number],
    glow: [48, 75, 48] as [number, number, number],
    gridOpacity: 0.08,
    vignetteStrength: 0.25,
    ambientLight: 0.05,
    noiseOpacity: 0.01,
  },
  {
    name: 'calculator',
    bg: [8, 10, 12] as [number, number, number],
    accent: [145, 70, 45] as [number, number, number],
    glow: [50, 85, 55] as [number, number, number],
    gridOpacity: 0.12,
    vignetteStrength: 0.5,
    ambientLight: 0.1,
    noiseOpacity: 0.025,
  },
  {
    name: 'story',
    bg: [16, 14, 12] as [number, number, number],
    accent: [45, 65, 45] as [number, number, number],
    glow: [48, 75, 50] as [number, number, number],
    gridOpacity: 0.1,
    vignetteStrength: 0.55,
    ambientLight: 0.08,
    noiseOpacity: 0.02,
  },
  {
    name: 'cta',
    bg: [5, 5, 6] as [number, number, number],
    accent: [50, 85, 52] as [number, number, number],
    glow: [52, 90, 58] as [number, number, number],
    gridOpacity: 0.06,
    vignetteStrength: 0.3,
    ambientLight: 0.06,
    noiseOpacity: 0.01,
  },
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

// Smooth easing function
const easeInOutCubic = (t: number) => 
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const ScrollDrivenBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [breathePhase, setBreathePhase] = useState(0);
  const [heroGlowIntensity, setHeroGlowIntensity] = useState(1);
  const [vignettePosition, setVignettePosition] = useState({ x: 50, y: 50 });

  // Memoize section RGB colors
  const sectionColorsRGB = useMemo(() => 
    sectionConfigs.map(section => ({
      ...section,
      bgRgb: section.bg,
      accentRgb: hslToRgb(section.accent[0], section.accent[1], section.accent[2]),
      glowRgb: hslToRgb(section.glow[0], section.glow[1], section.glow[2]),
    })), []);

  // Smooth scroll tracking
  const updateScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, scrollTop / docHeight));
    setScrollY(scrollTop);
    setScrollProgress(progress);
    
    // Hero glow fades out as you scroll
    const heroFade = Math.max(0, 1 - (scrollTop / (window.innerHeight * 0.5)));
    setHeroGlowIntensity(heroFade);
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

  // Slow, elegant breathing animation
  useEffect(() => {
    let startTime = Date.now();
    let rafId: number;
    
    const breathe = () => {
      const elapsed = (Date.now() - startTime) % 16000; // Very slow cycle
      const phase = elapsed / 16000;
      setBreathePhase(phase);
      rafId = requestAnimationFrame(breathe);
    };
    
    rafId = requestAnimationFrame(breathe);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Smooth vignette movement (15-20 second cycle)
  useEffect(() => {
    let startTime = Date.now();
    let rafId: number;
    
    const animateVignette = () => {
      const elapsed = Date.now() - startTime;
      const cycleTime = 18000; // 18 seconds
      const phase = (elapsed % cycleTime) / cycleTime;
      
      // Smooth figure-8 pattern
      const x = 50 + Math.sin(phase * Math.PI * 2) * 8;
      const y = 50 + Math.sin(phase * Math.PI * 4) * 5;
      
      setVignettePosition({ x, y });
      rafId = requestAnimationFrame(animateVignette);
    };
    
    rafId = requestAnimationFrame(animateVignette);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Calculate current section interpolation
  const numSections = sectionColorsRGB.length;
  const sectionProgress = scrollProgress * (numSections - 1);
  const currentSectionIdx = Math.floor(sectionProgress);
  const nextSectionIdx = Math.min(currentSectionIdx + 1, numSections - 1);
  const rawT = sectionProgress - currentSectionIdx;
  
  // Smooth transition in middle of section
  let easedT: number;
  if (rawT < 0.3) {
    easedT = 0;
  } else if (rawT > 0.7) {
    easedT = 1;
  } else {
    easedT = easeInOutCubic((rawT - 0.3) / 0.4);
  }

  const current = sectionColorsRGB[currentSectionIdx];
  const next = sectionColorsRGB[nextSectionIdx];
  
  const currentBg = lerpColor(current.bgRgb, next.bgRgb, easedT);
  const currentGlow = lerpColor(current.glowRgb, next.glowRgb, easedT);
  const currentGridOpacity = lerp(current.gridOpacity, next.gridOpacity, easedT);
  const currentVignette = lerp(current.vignetteStrength, next.vignetteStrength, easedT);
  const currentAmbient = lerp(current.ambientLight, next.ambientLight, easedT);
  const currentNoise = lerp(current.noiseOpacity, next.noiseOpacity, easedT);

  // Grid breathing effect (subtle)
  const gridBreath = 1 + Math.sin(breathePhase * Math.PI * 2) * 0.15;
  const finalGridOpacity = currentGridOpacity * gridBreath;

  // Parallax offset for grid (0.5x intensity, opposite direction)
  const parallaxOffset = scrollY * -0.5;

  // Yellow color for grid lines
  const yellowGridColor = hslToRgb(50, 90, 50);

  return (
    <>
      {/* Layer 1: Base background gradient */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            linear-gradient(180deg, 
              ${rgbToString(currentBg)} 0%, 
              ${rgbToString(lerpColor(currentBg, [3, 3, 4], 0.2))} 50%,
              ${rgbToString(lerpColor(currentBg, [2, 2, 3], 0.3))} 100%
            )
          `,
        }}
      />

      {/* Layer 2: Ambient light washes (section-specific) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 20%, ${rgbToString(currentGlow, currentAmbient * 0.8)} 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 30% 70%, ${rgbToString(currentGlow, currentAmbient * 0.4)} 0%, transparent 50%),
            radial-gradient(ellipse 50% 35% at 75% 60%, ${rgbToString(currentGlow, currentAmbient * 0.3)} 0%, transparent 45%)
          `,
        }}
      />

      {/* Layer 3: Hero-specific radial glow behind title (fades on scroll) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          opacity: heroGlowIntensity,
          background: `
            radial-gradient(ellipse 50% 40% at 50% 35%, 
              ${rgbToString(hslToRgb(50, 90, 55), 0.18)} 0%, 
              ${rgbToString(hslToRgb(50, 85, 50), 0.08)} 30%, 
              transparent 60%
            )
          `,
        }}
      />

      {/* Layer 4: Main yellow geometric grid with parallax */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
        style={{
          opacity: finalGridOpacity,
          backgroundImage: `
            linear-gradient(${rgbToString(yellowGridColor, 0.7)} 1px, transparent 1px),
            linear-gradient(90deg, ${rgbToString(yellowGridColor, 0.7)} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: `0 ${parallaxOffset}px`,
          maskImage: `
            radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 75%)
          `,
          WebkitMaskImage: `
            radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 75%)
          `,
        }}
      />

      {/* Layer 5: Secondary finer yellow grid with parallax */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
        style={{
          opacity: finalGridOpacity * 0.5,
          backgroundImage: `
            linear-gradient(${rgbToString(yellowGridColor, 0.4)} 1px, transparent 1px),
            linear-gradient(90deg, ${rgbToString(yellowGridColor, 0.4)} 1px, transparent 1px)
          `,
          backgroundSize: '15px 15px',
          backgroundPosition: `0 ${parallaxOffset * 0.7}px`,
          maskImage: `
            radial-gradient(ellipse 60% 50% at 50% 45%, black 0%, transparent 65%)
          `,
          WebkitMaskImage: `
            radial-gradient(ellipse 60% 50% at 50% 45%, black 0%, transparent 65%)
          `,
        }}
      />

      {/* Layer 6: Subtle noise texture */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 mix-blend-overlay"
        style={{
          opacity: currentNoise,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 7: Dynamic cinematic vignette with smooth movement */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(
              ellipse 75% 65% at ${vignettePosition.x}% ${vignettePosition.y}%, 
              transparent 20%, 
              rgba(0, 0, 0, ${currentVignette * 0.4}) 60%,
              rgba(0, 0, 0, ${currentVignette * 0.7}) 80%,
              rgba(0, 0, 0, ${currentVignette * 0.95}) 100%
            )
          `,
          transition: 'background 0.5s ease-out',
        }}
      />

      {/* Layer 8: Edge darkening for depth */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            linear-gradient(180deg, ${rgbToString(currentBg, 0.7)} 0%, transparent 8%),
            linear-gradient(0deg, ${rgbToString(currentBg, 0.85)} 0%, transparent 6%)
          `,
        }}
      />

      {/* Layer 9: Calculator cockpit spotlight (only visible in calculator section) */}
      {currentSectionIdx >= 3 && currentSectionIdx <= 5 && (
        <div 
          className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
          style={{
            opacity: currentSectionIdx === 4 ? 0.6 : 0.2,
            background: `
              radial-gradient(ellipse 40% 50% at 70% 50%, 
                ${rgbToString(hslToRgb(50, 85, 55), 0.08)} 0%, 
                transparent 50%
              )
            `,
          }}
        />
      )}
    </>
  );
};

export default ScrollDrivenBackground;