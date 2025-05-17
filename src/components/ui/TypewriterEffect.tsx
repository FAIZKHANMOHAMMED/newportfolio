import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterEffectProps {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
  loop?: boolean;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  words,
  className,
  cursorClassName,
  loop = true,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 1500,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBlinking, setIsBlinking] = useState(true);
  const isMounted = useRef(false);

  // Handle the typing effect
  useEffect(() => {
    isMounted.current = true;
    
    // Set blinking state based on whether we're typing or between words
    setIsBlinking(!isDeleting && currentText === words[currentWordIndex].text);
    
    let timeout: NodeJS.Timeout;
    
    // Calculate the delay based on current state
    let delay = isDeleting 
      ? deletingSpeed 
      : currentText === words[currentWordIndex].text 
        ? delayBetweenWords 
        : typingSpeed;
    
    timeout = setTimeout(() => {
      if (!isMounted.current) return;
      
      // If not deleting and the current text is not complete
      if (!isDeleting && currentText !== words[currentWordIndex].text) {
        setCurrentText(words[currentWordIndex].text.substring(0, currentText.length + 1));
      } 
      // If not deleting and the current text is complete
      else if (!isDeleting && currentText === words[currentWordIndex].text) {
        setIsDeleting(true);
      } 
      // If deleting and there's still text
      else if (isDeleting && currentText !== '') {
        setCurrentText(currentText.substring(0, currentText.length - 1));
      } 
      // If deleting and all text is gone
      else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((currentWordIndex + 1) % words.length);
        
        // If we've gone through all words and loop is false, stop
        if (currentWordIndex === words.length - 1 && !loop) {
          return;
        }
      }
    }, delay);
    
    return () => {
      clearTimeout(timeout);
      isMounted.current = false;
    };
  }, [currentText, currentWordIndex, isDeleting, words, loop, typingSpeed, deletingSpeed, delayBetweenWords]);
  
  return (
    <div className={cn("inline-flex items-center", className)}>
      <span className="inline-block">
        {currentText}
        <span 
          className={cn(
            "ml-1 inline-block w-[3px] h-5 bg-primary animate-blink",
            isBlinking ? "opacity-100" : "opacity-0",
            cursorClassName
          )}
          style={{
            verticalAlign: "middle",
            marginBottom: "0.25rem"
          }}
        />
      </span>
    </div>
  );
};

export default TypewriterEffect;
