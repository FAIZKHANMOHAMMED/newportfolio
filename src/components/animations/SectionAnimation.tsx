import React, { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface SectionAnimationProps {
  children: ReactNode;
  delay?: number;
  threshold?: number;
  animation?: 'fade-up' | 'fade-right' | 'fade-left' | 'zoom-in' | 'none';
  className?: string;
  rootMargin?: string;
  fallbackTimeout?: number;
  smoothScroll?: boolean;
}

const SectionAnimation: React.FC<SectionAnimationProps> = ({
  children,
  delay = 0,
  threshold = 0.1,
  animation = 'fade-up',
  className = '',
  rootMargin = '-50px 0px',
  fallbackTimeout = 800,
  smoothScroll = true,
}) => {
  const [ref, isVisible] = useScrollAnimation({
    threshold,
    rootMargin,
    triggerOnce: true
  });

  // Animation classes based on type
  const getAnimationClasses = () => {
    const baseClasses = smoothScroll 
      ? 'transition-all duration-700 ease-out scroll-smooth-section' 
      : 'transition-all duration-700 ease-out';
    
    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return `${baseClasses} opacity-0 translate-y-8`;
        case 'fade-right':
          return `${baseClasses} opacity-0 -translate-x-8`;
        case 'fade-left':
          return `${baseClasses} opacity-0 translate-x-8`;
        case 'zoom-in':
          return `${baseClasses} opacity-0 scale-95`;
        case 'none':
          return `${baseClasses} opacity-0`;
        default:
          return `${baseClasses} opacity-0`;
      }
    }
    
    return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100`;
  };

  return (
    <div ref={ref} className={`${getAnimationClasses()} ${className}`}>
      {children}
    </div>
  );
};

export default SectionAnimation;
