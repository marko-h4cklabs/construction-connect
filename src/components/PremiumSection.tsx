import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface PremiumSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const PremiumSection = ({ 
  children, 
  className,
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
      { threshold: 0.1, rootMargin: '-10px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Track section-specific scroll progress for parallax
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, 1 - (rect.top / windowHeight)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      id={id}
      className={cn(
        "relative min-h-screen flex items-center scroll-mt-0",
        "snap-start snap-always",
        className
      )}
    >
      {/* Content wrapper with premium entrance animation */}
      <div
        className={cn(
          "relative z-20 w-full transition-all duration-500 ease-out",
          isVisible 
            ? "opacity-100 translate-y-0 blur-0" 
            : "opacity-0 translate-y-8 blur-sm"
        )}
        style={{
          transitionDelay: '50ms',
        }}
      >
        {children}
      </div>

      {/* Subtle parallax layer for depth */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden z-10"
        style={{
          transform: `translateY(${scrollProgress * 30}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      />
    </div>
  );
};

export default PremiumSection;
