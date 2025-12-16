import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedCard = ({ children, className = '', delay = 0 }: AnimatedCardProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 touch-optimized ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;