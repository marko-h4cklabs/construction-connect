import { useEffect, useState, useCallback, useMemo, useRef } from 'react';

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
 * 
 * BREATHING VIGNETTE: Centered, static position with ultra-slow breathing effect
 * - No translation movement
 * - Desynchronized opacity/blur/shape animations
 * - 30-60s ultra-slow loops with ease-in-out
 * - Reduced intensity on mobile
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

// Premium ease-in-out function for ultra-smooth animations
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

// Smooth easing function for section transitions
const easeInOutCubic = (t: number) => 
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Detect mobile for reduced motion
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

const ScrollDrivenBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [breathePhase, setBreathePhase] = useState(0);
  const [heroGlowIntensity, setHeroGlowIntensity] = useState(1);
  
  // Breathing vignette state - desynchronized parameters
  const [vignetteOpacity, setVignetteOpacity] = useState(0.5);
  const [vignetteBlur, setVignetteBlur] = useState(1);
  const [vignetteScale, setVignetteScale] = useState(1);
  
  // Animation start times for desynchronization
  const animationRef = useRef({
    opacityStart: 0,
    blurStart: 0,
    scaleStart: 0,
  });

  // Memoize section RGB colors
  const sectionColorsRGB = useMemo(() => 
    sectionConfigs.map(section => ({
      ...section,
      bgRgb: section.bg,
      accentRgb: hslToRgb(section.accent[0], section.accent[1], section.accent[2]),
      glowRgb: hslToRgb(section.glow[0], section.glow[1], section.glow[2]),
    })), []);

  // Optimized scroll tracking with throttling
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
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          updateScroll();
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [updateScroll]);

  // Slow, elegant breathing animation for grid
  useEffect(() => {
    let startTime = Date.now();
    let rafId: number;
    
    const breathe = () => {
      const elapsed = (Date.now() - startTime) % 16000;
      const phase = elapsed / 16000;
      setBreathePhase(phase);
      rafId = requestAnimationFrame(breathe);
    };
    
    rafId = requestAnimationFrame(breathe);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // PREMIUM BREATHING VIGNETTE - Ultra-slow, desynchronized animations
  useEffect(() => {
    // Initialize with random offsets for desynchronization
    const now = performance.now();
    animationRef.current = {
      opacityStart: now,
      blurStart: now + 12000, // 12s offset
      scaleStart: now + 24000, // 24s offset
    };
    
    let rafId: number;
    let lastUpdate = 0;
    const updateInterval = isMobile ? 100 : 50; // Slower updates on mobile
    
    // Different cycle times for each parameter (desynchronized)
    const opacityCycle = 45000; // 45 seconds
    const blurCycle = 38000; // 38 seconds
    const scaleCycle = 52000; // 52 seconds
    
    // Intensity multiplier (reduced on mobile)
    const intensityMult = isMobile ? 0.4 : 1;
    
    const animateBreathing = (currentTime: number) => {
      if (currentTime - lastUpdate >= updateInterval) {
        const { opacityStart, blurStart, scaleStart } = animationRef.current;
        
        // Opacity animation: 0.35 - 0.65 range
        const opacityElapsed = currentTime - opacityStart;
        const opacityPhase = (opacityElapsed % opacityCycle) / opacityCycle;
        const opacityValue = 0.5 + easeInOutSine(opacityPhase) * 0.15 * intensityMult;
        setVignetteOpacity(opacityValue);
        
        // Blur animation: 0.8 - 1.2 range (affects gradient spread)
        const blurElapsed = currentTime - blurStart;
        const blurPhase = (blurElapsed % blurCycle) / blurCycle;
        const blurValue = 1 + (easeInOutSine(blurPhase) - 0.5) * 0.4 * intensityMult;
        setVignetteBlur(blurValue);
        
        // Scale animation: 0.95 - 1.05 range (subtle organic deformation)
        const scaleElapsed = currentTime - scaleStart;
        const scalePhase = (scaleElapsed % scaleCycle) / scaleCycle;
        const scaleValue = 1 + (easeInOutSine(scalePhase) - 0.5) * 0.1 * intensityMult;
        setVignetteScale(scaleValue);
        
        lastUpdate = currentTime;
      }
      rafId = requestAnimationFrame(animateBreathing);
    };
    
    rafId = requestAnimationFrame(animateBreathing);
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

  // Vignette spotlight grid brightness multiplier
  const spotlightGridMultiplier = 3.5;
  
  // Breathing vignette dimensions (centered, organic shape)
  const vignetteWidth = 75 * vignetteScale;
  const vignetteHeight = 65 * vignetteBlur;

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

      {/* Layer 4: Base yellow geometric grid (always visible) with parallax */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          opacity: Math.max(finalGridOpacity, 0.06),
          backgroundImage: `
            linear-gradient(${rgbToString(yellowGridColor, 0.5)} 1px, transparent 1px),
            linear-gradient(90deg, ${rgbToString(yellowGridColor, 0.5)} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: `0 ${parallaxOffset}px`,
        }}
      />

      {/* Layer 5: Breathing vignette-revealed brighter grid (centered, static position) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          opacity: finalGridOpacity * spotlightGridMultiplier * vignetteOpacity,
          backgroundImage: `
            linear-gradient(${rgbToString(yellowGridColor, 0.9)} 1.5px, transparent 1.5px),
            linear-gradient(90deg, ${rgbToString(yellowGridColor, 0.9)} 1.5px, transparent 1.5px)
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: `0 ${parallaxOffset}px`,
          maskImage: `
            radial-gradient(ellipse ${vignetteWidth}% ${vignetteHeight}% at 50% 50%, black 0%, transparent 70%)
          `,
          WebkitMaskImage: `
            radial-gradient(ellipse ${vignetteWidth}% ${vignetteHeight}% at 50% 50%, black 0%, transparent 70%)
          `,
          willChange: 'opacity, mask-image',
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

      {/* Layer 7: Secondary finer yellow grid (always visible base) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          opacity: Math.max(finalGridOpacity * 0.3, 0.03),
          backgroundImage: `
            linear-gradient(${rgbToString(yellowGridColor, 0.3)} 1px, transparent 1px),
            linear-gradient(90deg, ${rgbToString(yellowGridColor, 0.3)} 1px, transparent 1px)
          `,
          backgroundSize: '15px 15px',
          backgroundPosition: `0 ${parallaxOffset * 0.7}px`,
        }}
      />

      {/* Layer 8: Secondary finer grid (breathing vignette-revealed brighter) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          opacity: finalGridOpacity * spotlightGridMultiplier * 0.6 * vignetteOpacity,
          backgroundImage: `
            linear-gradient(${rgbToString(yellowGridColor, 0.6)} 1px, transparent 1px),
            linear-gradient(90deg, ${rgbToString(yellowGridColor, 0.6)} 1px, transparent 1px)
          `,
          backgroundSize: '15px 15px',
          backgroundPosition: `0 ${parallaxOffset * 0.7}px`,
          maskImage: `
            radial-gradient(ellipse ${vignetteWidth * 0.9}% ${vignetteHeight * 0.85}% at 50% 50%, black 0%, transparent 65%)
          `,
          WebkitMaskImage: `
            radial-gradient(ellipse ${vignetteWidth * 0.9}% ${vignetteHeight * 0.85}% at 50% 50%, black 0%, transparent 65%)
          `,
          willChange: 'opacity, mask-image',
        }}
      />

      {/* Layer 9: Premium breathing cinematic vignette (centered, static position) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(
              ellipse ${vignetteWidth}% ${vignetteHeight}% at 50% 50%, 
              transparent 25%, 
              rgba(0, 0, 0, ${currentVignette * 0.35 * vignetteOpacity}) 55%,
              rgba(0, 0, 0, ${currentVignette * 0.6 * vignetteOpacity}) 75%,
              rgba(0, 0, 0, ${currentVignette * 0.85}) 100%
            )
          `,
          willChange: 'background',
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