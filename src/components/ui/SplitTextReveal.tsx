import React from 'react';
import { cn } from '@/lib/utils';

interface SplitTextRevealProps {
  text: string;
  className?: string;
}

const SplitTextReveal: React.FC<SplitTextRevealProps> = ({
  text,
  className,
}) => {
  // Split the text into an array of characters
  const characters = text.split('');
  
  return (
    <div className={cn("inline-block", className)}>
      {characters.map((char, index) => (
        <span 
          key={`char-${index}`}
          className="inline-block animate-fade-in-up"
          style={{ 
            animationDelay: `${index * 0.05}s`,
            animationDuration: '0.5s',
            animationFillMode: 'both' 
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default SplitTextReveal;
