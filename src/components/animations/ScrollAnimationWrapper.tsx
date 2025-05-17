import React, { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'none';
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
}) => {
  const [ref, isVisible] = useScrollAnimation({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const getAnimationClass = () => {
    if (animation === 'none') return '';
    
    const baseClass = 'transition-all duration-700';
    const delayClass = delay > 0 ? ` delay-[${delay}ms]` : '';
    
    const animationClasses = {
      'fade-up': 'translate-y-10 opacity-0',
      'fade-down': 'translate-y-[-10px] opacity-0',
      'fade-left': 'translate-x-[-10px] opacity-0',
      'fade-right': 'translate-x-10 opacity-0',
      'zoom-in': 'scale-95 opacity-0',
    };

    return isVisible
      ? `${baseClass}${delayClass}`
      : `${baseClass}${delayClass} ${animationClasses[animation]}`;
  };

  return (
    <div ref={ref} className={cn(getAnimationClass(), className)}>
      {children}
    </div>
  );
};

export default ScrollAnimationWrapper;
