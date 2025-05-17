import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface MoleculeBackgroundProps {
  className?: string;
  nodeCount?: number;
  nodeColor?: string;
  lineColor?: string;
  speed?: number;
  opacity?: number;
}

const MoleculeBackground: React.FC<MoleculeBackgroundProps> = ({
  className,
  nodeCount = 50,
  nodeColor: propNodeColor,
  lineColor: propLineColor,
  speed = 1,
  opacity = 0.25,
}) => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  
  // Determine colors based on theme
  const nodeColor = propNodeColor || (theme === 'dark' 
    ? 'rgba(210, 230, 255, 0.9)' // Lighter blue-white in dark mode
    : 'rgba(var(--highlight), 0.9)');
    
  const lineColor = propLineColor || (theme === 'dark'
    ? 'rgba(210, 230, 255, 0.5)' // Lighter blue-white in dark mode
    : 'rgba(var(--highlight), 0.5)');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match window
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial setup
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create nodes
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: Math.random() * 2 + 1,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
        
        // Connect nodes that are close enough
        for (let j = i + 1; j < nodes.length; j++) {
          const otherNode = nodes[j];
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1 * (1 - distance / 150); // Thicker lines that fade out with distance
            ctx.stroke();
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [nodeCount, nodeColor, lineColor, speed]);
  
  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "fixed inset-0 z-0 pointer-events-none",
        className
      )}
      style={{ opacity }}
    />
  );
};

export default MoleculeBackground;
