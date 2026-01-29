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
      className={`relative h-16 md:h-24 w-full flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Gradient fade line - centered using flexbox, no absolute positioning */}
      <div 
        className={`w-[50%] md:w-[40%] h-[1px] transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%, 
            hsl(50 100% 50% / 0.2) 20%,
            hsl(50 100% 50% / 0.5) 50%,
            hsl(50 100% 50% / 0.2) 80%,
            transparent 100%
          )`,
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'center',
        }}
      />
      
      {/* Soft glow - absolutely positioned but truly centered */}
      <div 
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div 
          className="w-[40%] md:w-[30%] h-12 md:h-16"
          style={{
            background: `radial-gradient(ellipse 100% 100% at 50% 50%, 
              hsl(50 100% 50% / 0.06) 0%, 
              transparent 70%
            )`,
          }}
        />
      </div>
    </div>
  );
};

export default SectionDivider;
