import React, { ReactNode, useState } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'glow' | 'border' | 'scale' | 'none';
  onClick?: () => void;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  hoverEffect = 'lift',
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Base styles
  const baseStyles = 'relative rounded-lg overflow-hidden transition-all duration-300';
  
  // Hover effect styles
  const hoverStyles = {
    lift: 'hover-lift',
    glow: 'hover:shadow-lg hover:shadow-highlight/20',
    border: 'hover:border-highlight/50',
    scale: 'hover:scale-[1.02]',
    none: ''
  };
  
  // Combined styles
  const combinedStyles = `${baseStyles} ${hoverStyles[hoverEffect]} ${className}`;
  
  return (
    <div 
      className={combinedStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Optional glow effect */}
      {isHovered && hoverEffect === 'glow' && (
        <div className="absolute inset-0 -z-10 bg-highlight/5 blur-xl rounded-lg"></div>
      )}
      
      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Optional gradient border */}
      {hoverEffect === 'border' && (
        <div className={`absolute inset-0 -z-10 rounded-lg transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-highlight/30 via-accent-purple/30 to-highlight/30 blur-sm"></div>
        </div>
      )}
    </div>
  );
};

export default AnimatedCard;
