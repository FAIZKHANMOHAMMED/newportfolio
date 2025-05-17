import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TextScrambleEffectProps {
  phrases: string[];
  className?: string;
}

const TextScrambleEffect: React.FC<TextScrambleEffectProps> = ({
  phrases,
  className,
}) => {
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [phrases.length]);
  
  useEffect(() => {
    setCurrentPhrase(phrases[index]);
  }, [index, phrases]);
  
  return (
    <span 
      className={cn(
        "inline-block font-mono text-highlight",
        className
      )}
    >
      {currentPhrase}
    </span>
  );
};

export default TextScrambleEffect;
