import { useEffect, useRef, useState } from 'react';

interface SectionDividerProps {
  className?: string;
}

const SectionDivider = ({ className = '' }: SectionDividerProps) => {
  const dividerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (dividerRef.current) {
      observer.observe(dividerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={dividerRef}
      className={`relative h-16 md:h-24 flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Gradient fade line that draws in */}
      <div 
        className={`absolute inset-x-0 h-[2px] transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%, 
            hsl(50 100% 50% / 0.15) 15%,
            hsl(50 100% 50% / 0.4) 35%,
            hsl(50 100% 50% / 0.6) 50%,
            hsl(50 100% 50% / 0.4) 65%,
            hsl(50 100% 50% / 0.15) 85%,
            transparent 100%
          )`,
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'center',
        }}
      />
      
      {/* Soft glow that fades in */}
      <div 
        className={`absolute inset-x-0 h-16 md:h-20 transition-all duration-1200 delay-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(ellipse 60% 100% at 50% 50%, 
            hsl(50 100% 50% / 0.08) 0%, 
            transparent 70%
          )`,
        }}
      />
    </div>
  );
};

export default SectionDivider;
