import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  variant?: 'dark' | 'light';
  id?: string;
}

const SectionWrapper = ({ 
  children, 
  className,
  variant = 'dark',
  id
}: SectionWrapperProps) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      id={id}
      className={cn(
        "relative transition-all duration-700 ease-out scroll-mt-24",
        variant === 'light' 
          ? "bg-primary text-primary-foreground" 
          : "bg-transparent",
        className
      )}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      }}
    >
      {/* Subtle top border for light sections */}
      {variant === 'light' && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/30 to-transparent" />
      )}
      
      {children}
      
      {/* Subtle bottom border for light sections */}
      {variant === 'light' && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/30 to-transparent" />
      )}
    </div>
  );
};

export default SectionWrapper;
