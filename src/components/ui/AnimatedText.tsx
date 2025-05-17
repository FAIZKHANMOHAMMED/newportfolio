import React, { useState, useEffect, ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  effect?: 'gradient' | 'highlight' | 'typing' | 'fade' | 'none';
  delay?: number;
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  className = '',
  effect = 'none',
  delay = 0,
  duration = 500,
  as = 'div'
}) => {
  const [isVisible, setIsVisible] = useState(effect !== 'typing' && effect !== 'fade');
  const [displayText, setDisplayText] = useState('');
  const text = children?.toString() || '';
  
  // Handle typing effect
  useEffect(() => {
    if (effect !== 'typing') return;
    
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;
    
    const typeNextChar = () => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
        timeout = setTimeout(typeNextChar, duration / text.length);
      }
    };
    
    timeout = setTimeout(() => {
      typeNextChar();
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, effect, delay, duration]);
  
  // Handle fade effect
  useEffect(() => {
    if (effect !== 'fade') return;
    
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [effect, delay]);
  
  // Get effect styles
  const getEffectStyles = () => {
    switch (effect) {
      case 'gradient':
        return 'gradient-text';
      case 'highlight':
        return 'relative inline-block';
      case 'fade':
        return `transition-opacity duration-${duration} ${isVisible ? 'opacity-100' : 'opacity-0'}`;
      default:
        return '';
    }
  };
  
  // Combined styles
  const combinedStyles = `${getEffectStyles()} ${className}`;
  
  // Highlight effect markup
  const renderHighlightEffect = () => {
    return (
      <>
        {children}
        <span 
          className="absolute bottom-0 left-0 w-full h-[30%] bg-highlight/20 -z-10 transform skew-x-12"
          style={{ 
            transitionDelay: `${delay}ms`,
            animationDelay: `${delay}ms` 
          }}
        />
      </>
    );
  };
  
  // Render the component with the appropriate HTML tag
  const Component = as;
  
  return (
    <Component className={combinedStyles}>
      {effect === 'typing' ? displayText : 
       effect === 'highlight' ? renderHighlightEffect() : 
       children}
    </Component>
  );
};

export default AnimatedText;
