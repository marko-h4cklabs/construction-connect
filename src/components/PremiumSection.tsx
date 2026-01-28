import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface PremiumSectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'dark' | 'gold' | 'gradient';
  id?: string;
}

const PremiumSection = ({ 
  children, 
  className,
  variant = 'dark',
  id
}: PremiumSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: '-50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Parallax scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, 1 - (rect.top / windowHeight)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getBackgroundStyle = () => {
    switch (variant) {
      case 'gold':
        return {
          background: `linear-gradient(
            180deg, 
            hsl(45 60% 12%) 0%, 
            hsl(42 50% 18%) 30%,
            hsl(40 45% 22%) 50%,
            hsl(42 50% 18%) 70%,
            hsl(45 60% 12%) 100%
          )`,
        };
      case 'gradient':
        return {
          background: `linear-gradient(
            180deg, 
            hsl(0 0% 7%) 0%, 
            hsl(45 30% 10%) 50%,
            hsl(0 0% 7%) 100%
          )`,
        };
      default:
        return {
          background: 'transparent',
        };
    }
  };

  return (
    <div
      ref={sectionRef}
      id={id}
      className={cn(
        "relative min-h-screen flex items-center scroll-mt-0",
        "snap-start snap-always",
        className
      )}
      style={{
        ...getBackgroundStyle(),
      }}
    >
      {/* Premium gradient overlay for gold sections */}
      {variant === 'gold' && (
        <>
          {/* Top fade from previous section */}
          <div 
            className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
            style={{
              background: 'linear-gradient(180deg, hsl(0 0% 7%) 0%, transparent 100%)',
            }}
          />
          {/* Bottom fade to next section */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
            style={{
              background: 'linear-gradient(0deg, hsl(0 0% 7%) 0%, transparent 100%)',
            }}
          />
          {/* Subtle gold glow accents */}
          <div 
            className="absolute top-1/4 left-0 w-1/3 h-1/2 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at left, hsl(45 80% 50% / 0.08) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <div 
            className="absolute top-1/3 right-0 w-1/4 h-1/2 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at right, hsl(45 80% 50% / 0.06) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />
        </>
      )}

      {/* Content wrapper with entrance animation */}
      <div
        className={cn(
          "relative z-20 w-full transition-all duration-1000 ease-out",
          isVisible 
            ? "opacity-100 translate-y-0 blur-0" 
            : "opacity-0 translate-y-12 blur-sm"
        )}
        style={{
          transitionDelay: '100ms',
        }}
      >
        {children}
      </div>

      {/* Subtle parallax background elements for depth */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          transform: `translateY(${scrollProgress * 20}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {variant === 'gold' && (
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]"
            style={{
              background: 'radial-gradient(ellipse at center, hsl(45 50% 20% / 0.3) 0%, transparent 60%)',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PremiumSection;
