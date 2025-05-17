import React, { useEffect, useRef } from 'react';

interface DynamicBackgroundProps {
  variant?: 'dots' | 'gradient' | 'particles' | 'waves';
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
  color?: 'highlight' | 'accent-purple' | 'accent-teal' | 'accent-orange';
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({
  variant = 'dots',
  className = '',
  intensity = 'medium',
  color = 'highlight'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Intensity values
  const intensityValues = {
    light: 0.3,
    medium: 0.6,
    strong: 1
  };
  
  // Base styles
  const baseStyles = 'absolute inset-0 -z-10 overflow-hidden';
  
  // Combined styles
  const combinedStyles = `${baseStyles} ${className}`;

  // Particles animation
  useEffect(() => {
    if (variant !== 'particles' || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle settings
    const particleCount = Math.floor(window.innerWidth / 20) * intensityValues[intensity];
    const particles: Particle[] = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    // Animation loop
    let animationFrame: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(var(--${color}), ${particle.opacity})`;
        ctx.fill();
      });
      
      // Draw connections
      ctx.strokeStyle = `hsla(var(--${color}), 0.1)`;
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, [variant, intensity, color]);

  // Render different background variants
  const renderBackground = () => {
    switch (variant) {
      case 'dots':
        return (
          <div 
            className={`${combinedStyles} bg-dots`}
            style={{
              backgroundImage: `radial-gradient(hsla(var(--${color}), ${intensityValues[intensity] * 0.2}) 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}
          />
        );
        
      case 'gradient':
        return (
          <div className={combinedStyles}>
            <div 
              className="absolute top-0 left-1/4 w-1/2 h-1/2 rounded-full filter blur-3xl animate-pulse-slow"
              style={{
                background: `radial-gradient(circle, hsla(var(--${color}), ${intensityValues[intensity] * 0.15}) 0%, transparent 70%)`,
              }}
            />
            <div 
              className="absolute bottom-0 right-1/4 w-1/2 h-1/2 rounded-full filter blur-3xl animate-pulse-slow"
              style={{
                animationDelay: '1s',
                background: `radial-gradient(circle, hsla(var(--accent-purple), ${intensityValues[intensity] * 0.1}) 0%, transparent 70%)`,
              }}
            />
          </div>
        );
        
      case 'particles':
        return <canvas ref={canvasRef} className={combinedStyles} />;
        
      case 'waves':
        return (
          <div className={combinedStyles}>
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(
                    135deg, 
                    hsla(var(--${color}), ${intensityValues[intensity] * 0.05}) 25%, 
                    transparent 25%, 
                    transparent 50%, 
                    hsla(var(--${color}), ${intensityValues[intensity] * 0.05}) 50%, 
                    hsla(var(--${color}), ${intensityValues[intensity] * 0.05}) 75%, 
                    transparent 75%, 
                    transparent
                  )
                `,
                backgroundSize: '40px 40px',
                animation: 'shimmer 30s linear infinite'
              }}
            />
          </div>
        );
        
      default:
        return null;
    }
  };

  return renderBackground();
};

// Particle type for animation
interface Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export default DynamicBackground;
