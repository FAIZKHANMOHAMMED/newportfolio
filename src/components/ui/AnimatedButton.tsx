import React, { ReactNode } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'right',
  target,
  rel,
  type = 'button',
  disabled = false,
  ariaLabel,
}) => {
  // Base styles
  const baseStyles = 'relative inline-flex items-center justify-center font-medium transition-all duration-300 overflow-hidden';
  
  // Size styles
  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5 rounded-md',
    md: 'text-base px-4 py-2 rounded-lg',
    lg: 'text-lg px-6 py-3 rounded-lg',
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-highlight text-white hover:bg-highlight-dark hover:shadow-lg hover:shadow-highlight/20',
    secondary: 'bg-navy-light text-slate-light hover:bg-navy hover:shadow-lg',
    outline: 'border border-highlight text-highlight hover:bg-highlight/10 hover:shadow-lg',
    ghost: 'text-highlight hover:bg-highlight/10 hover:shadow-sm',
  };
  
  // Animation styles
  const animationStyles = 'hover:-translate-y-1 active:translate-y-0 active:scale-95';
  
  // Icon styles
  const iconStyles = iconPosition === 'left' ? 'mr-2' : 'ml-2';
  
  // Combined styles
  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${animationStyles} ${className}`;
  
  // Gradient effect for primary variant
  const gradientEffect = variant === 'primary' ? 'gradient-border' : '';
  
  // Button content
  const content = (
    <>
      {icon && iconPosition === 'left' && <span className={`${iconStyles} transition-transform group-hover:translate-x-[-2px]`}>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className={`${iconStyles} transition-transform group-hover:translate-x-[2px]`}>{icon}</span>}
    </>
  );
  
  // Render as link or button
  if (href) {
    return (
      <a
        href={href}
        className={`${combinedStyles} ${gradientEffect} group`}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${combinedStyles} ${gradientEffect} group`}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
};

export default AnimatedButton;
