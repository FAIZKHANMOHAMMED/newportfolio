import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  className?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onLoadingComplete,
  className
}) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentText, setCurrentText] = useState('Developer');

  // Array of text to cycle through
  const textOptions = ['Developer', 'Designer', 'Creator', 'Problem Solver', 'Innovator'];

  useEffect(() => {
    // Cycle through text options
    const textInterval = setInterval(() => {
      setCurrentText(prev => {
        const currentIndex = textOptions.indexOf(prev);
        const nextIndex = (currentIndex + 1) % textOptions.length;
        return textOptions[nextIndex];
      });
    }, 1500);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        // Accelerate progress as it gets closer to 100
        const increment = Math.max(1, Math.floor((100 - prev) / 10));
        const newProgress = Math.min(prev + increment, 100);
        
        if (newProgress === 100) {
          clearInterval(progressInterval);
          
          // Add a small delay before completing
          setTimeout(() => {
            setIsComplete(true);
            if (onLoadingComplete) onLoadingComplete();
          }, 800);
        }
        
        return newProgress;
      });
    }, 100);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onLoadingComplete, textOptions]);

  if (isComplete) {
    return null;
  }

  // Generate particles for background effect
  const particles = Array.from({ length: 40 }, (_, i) => {
    const size = Math.random() * 8 + 2;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10;
    const opacity = Math.random() * 0.5 + 0.1;
    
    // Randomly choose between circle and square shapes
    const isCircle = Math.random() > 0.3;
    
    return (
      <div 
        key={i}
        className={`absolute ${isCircle ? 'rounded-full' : 'rounded-md rotate-45'} animate-float`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          top: `${top}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          opacity: opacity,
          background: i % 5 === 0 ? 'hsl(var(--accent-purple))' : 
                    i % 4 === 0 ? 'hsl(var(--accent-teal))' : 
                    i % 3 === 0 ? 'hsl(var(--accent-orange))' : 
                    i % 2 === 0 ? 'hsl(var(--accent-pink))' : 'hsl(var(--primary))',
          filter: 'blur(1px)',
          transform: `rotate(${Math.random() * 360}deg)`
        }}
      />
    );
  });
  
  // Generate animated lines for background
  const lines = Array.from({ length: 8 }, (_, i) => {
    const width = Math.random() * 150 + 50;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const rotation = Math.random() * 360;
    const delay = Math.random() * 3;
    
    return (
      <div 
        key={`line-${i}`}
        className="absolute bg-gradient-to-r from-primary/10 to-transparent animate-pulse-slow"
        style={{
          width: `${width}px`,
          height: '1px',
          left: `${left}%`,
          top: `${top}%`,
          transform: `rotate(${rotation}deg)`,
          animationDelay: `${delay}s`,
          opacity: 0.3
        }}
      />
    );
  });

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 overflow-hidden",
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100",
        className
      )}
    >
      {/* Background particles and lines */}
      <div className="absolute inset-0 overflow-hidden">
        {particles}
        {lines}
      </div>
      
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background opacity-90" />
      
      {/* Main content container with glass effect */}
      <div className="relative z-10 glass-effect p-10 rounded-xl flex flex-col items-center justify-center animate-float" style={{ animationDuration: '6s' }}>
        {/* Logo with animated elements */}
        <div className="relative mb-8 w-28 h-28 rounded-full border-4 border-primary/30 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse-slow" />
          
          {/* Animated code brackets */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-mono text-primary/80 -ml-5 animate-pulse-slow" style={{ animationDelay: '0.5s' }}>{""}</span>
            <span className="text-5xl font-mono text-primary/80 ml-5 animate-pulse-slow" style={{ animationDelay: '0.8s' }}>{""}</span>
          </div>
          
          <div className="text-4xl font-bold text-primary animate-pulse-slow z-10">FK</div>
          
          {/* Multiple rotating border effects */}
          <div className="absolute inset-0 border-4 border-transparent rounded-full">
            <div 
              className="absolute inset-0 rounded-full border-4 border-primary/60 border-t-transparent border-l-transparent animate-rotate"
              style={{ animationDuration: '2s' }}
            />
          </div>
          <div className="absolute inset-0 border-4 border-transparent rounded-full">
            <div 
              className="absolute inset-0 rounded-full border-4 border-accent-purple/40 border-b-transparent border-r-transparent animate-rotate"
              style={{ animationDuration: '2s', animationDirection: 'reverse' }}
            />
          </div>
        </div>
        
        {/* Name with dynamic gradient */}
        <div className="text-3xl font-bold mb-2 gradient-text animate-fade-in-up">
          Faiz Khan
        </div>
        
        {/* Dynamic changing text with typing effect */}
        <div className="h-8 mb-10 text-xl text-muted-foreground overflow-hidden">
          <div 
            className="animate-textFadeSlide"
            key={currentText} // Key forces re-render and restart animation
          >
            {currentText}
          </div>
        </div>
        
        {/* Animated progress indicator */}
        <div className="relative w-72 h-1.5 bg-muted/50 rounded-full overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-primary via-accent-purple to-accent-teal transition-all duration-300 ease-out"
          />
          
          {/* Animated glow effect */}
          <div 
            style={{ width: `${progress}%`, filter: 'blur(6px)' }}
            className="absolute top-0 left-0 h-full bg-primary/50 transition-all duration-300 ease-out"
          />
          
          {/* Animated shimmer effect */}
          <div 
            className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
            style={{ backgroundSize: '200% 100%' }}
          />
        </div>
        
        {/* Animated loading indicator */}
        <div className="mt-8 flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-8 rounded-full bg-gradient-to-b from-primary to-accent-purple animate-expandLine"
              style={{ 
                animationDelay: `${i * 0.15}s`,
                transformOrigin: 'bottom',
                boxShadow: '0 0 8px rgba(var(--highlight), 0.5)',
                height: `${8 + (i % 2) * 8}px`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
