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
  colorful?: boolean;
  colorPalette?: string[];
  interactive?: boolean;
  hubNodes?: boolean;
  particleBursts?: boolean;
}

const MoleculeBackground: React.FC<MoleculeBackgroundProps> = ({
  className,
  nodeCount = 50,
  nodeColor: propNodeColor,
  lineColor: propLineColor,
  speed = 1,
  opacity = 0.25,
  colorful = false,
  colorPalette = [
    '#FF5E5B', // Coral red
    '#39A0ED', // Bright blue
    '#36F1CD', // Turquoise
    '#13CA91', // Green
    '#FFBE0B', // Yellow
    '#FB5607', // Orange
    '#8338EC', // Purple
    '#3A86FF', // Royal blue
    '#FF006E'  // Pink
  ],
  interactive = true,
  hubNodes = true,
  particleBursts = true,
}) => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const mousePosition = useRef<{ x: number; y: number } | null>(null);
  const burstParticles = useRef<any[]>([]);
  const lastBurstTime = useRef<number>(0);
  
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
    
    // Mouse interaction handlers
    const handleMouseMove = (e: MouseEvent) => {
      if (interactive) {
        mousePosition.current = { x: e.clientX, y: e.clientY };
        
        // Create particle burst occasionally on mouse move
        if (particleBursts && Date.now() - lastBurstTime.current > 1000) {
          createParticleBurst(e.clientX, e.clientY, 5, colorful ? getRandomColor() : nodeColor);
          lastBurstTime.current = Date.now();
        }
      }
    };
    
    const handleMouseLeave = () => {
      mousePosition.current = null;
    };
    
    const handleClick = (e: MouseEvent) => {
      if (interactive && particleBursts) {
        createParticleBurst(e.clientX, e.clientY, 15, colorful ? getRandomColor() : nodeColor);
      }
    };
    
    // Create a particle burst
    const createParticleBurst = (x: number, y: number, count: number, color: string) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 3;
        burstParticles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1 + Math.random() * 2,
          color,
          life: 100,
          maxLife: 100
        });
      }
    };
    
    // Helper to get random color from palette
    const getRandomColor = () => {
      return colorPalette[Math.floor(Math.random() * colorPalette.length)];
    };
    
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('click', handleClick);
    }

    // Create nodes
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color?: string;
      pulseDirection?: number;
      pulseValue?: number;
      isHub?: boolean;
      connections?: number;
      orbitRadius?: number;
      orbitSpeed?: number;
      orbitAngle?: number;
      satellites?: any[];
    }[] = [];

    // Create regular nodes
    for (let i = 0; i < nodeCount; i++) {
      const isHub = hubNodes && Math.random() < 0.1; // 10% chance to be a hub node
      const nodeRadius = isHub ? 4 + Math.random() * 3 : Math.random() * 2 + 1;
      
      const node = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed * (isHub ? 0.5 : 1), // Hub nodes move slower
        vy: (Math.random() - 0.5) * speed * (isHub ? 0.5 : 1),
        radius: nodeRadius,
        color: colorful ? colorPalette[Math.floor(Math.random() * colorPalette.length)] : undefined,
        pulseDirection: Math.random() > 0.5 ? 1 : -1,
        pulseValue: Math.random() * 0.02,
        isHub,
        connections: 0,
        satellites: []
      };
      
      // Add satellite particles for hub nodes
      if (isHub) {
        const satelliteCount = Math.floor(Math.random() * 3) + 2;
        for (let j = 0; j < satelliteCount; j++) {
          node.satellites.push({
            orbitRadius: nodeRadius * 2 + Math.random() * 10,
            orbitSpeed: 0.01 + Math.random() * 0.03,
            orbitAngle: Math.random() * Math.PI * 2,
            radius: Math.random() * 1.5 + 0.5,
            color: node.color
          });
        }
      }
      
      nodes.push(node);
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw burst particles
      if (particleBursts) {
        burstParticles.current = burstParticles.current.filter(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.life -= 1;
          
          // Only keep particles that are still alive
          if (particle.life <= 0) return false;
          
          // Draw particle with fading opacity
          const opacity = (particle.life / particle.maxLife) * 0.8;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color.replace(')', `, ${opacity})`);
          ctx.fill();
          
          return true;
        });
      }
      
      // Mouse interaction effect - draw attraction circle
      if (interactive && mousePosition.current) {
        const { x, y } = mousePosition.current;
        
        // Draw subtle attraction area
        ctx.beginPath();
        ctx.arc(x, y, 100, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 100);
        gradient.addColorStop(0, colorful ? 'rgba(255, 255, 255, 0.1)' : 'rgba(var(--highlight), 0.1)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Apply mouse attraction if interactive
        if (interactive && mousePosition.current) {
          const { x, y } = mousePosition.current;
          const dx = x - node.x;
          const dy = y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const force = 0.2 * (1 - distance / 150);
            node.vx += (dx / distance) * force;
            node.vy += (dy / distance) * force;
            
            // Limit velocity
            const maxVel = 2;
            const vel = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
            if (vel > maxVel) {
              node.vx = (node.vx / vel) * maxVel;
              node.vy = (node.vy / vel) * maxVel;
            }
          }
        }
        
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Update pulse effect for radius
        if (node.pulseDirection && node.pulseValue) {
          node.radius += node.pulseDirection * node.pulseValue;
          if (node.isHub) {
            if (node.radius > 7 || node.radius < 4) {
              node.pulseDirection *= -1;
            }
          } else {
            if (node.radius > 3 || node.radius < 1) {
              node.pulseDirection *= -1;
            }
          }
        }
        
        // Update and draw satellite particles for hub nodes
        if (node.isHub && node.satellites) {
          node.satellites.forEach((satellite: any) => {
            satellite.orbitAngle += satellite.orbitSpeed;
            const satX = node.x + Math.cos(satellite.orbitAngle) * satellite.orbitRadius;
            const satY = node.y + Math.sin(satellite.orbitAngle) * satellite.orbitRadius;
            
            // Draw satellite
            ctx.beginPath();
            ctx.arc(satX, satY, satellite.radius, 0, Math.PI * 2);
            ctx.fillStyle = colorful && satellite.color ? satellite.color : nodeColor;
            ctx.fill();
            
            // Draw orbit path (subtle)
            ctx.beginPath();
            ctx.arc(node.x, node.y, satellite.orbitRadius, 0, Math.PI * 2);
            ctx.strokeStyle = colorful && satellite.color 
              ? satellite.color.replace(')', ', 0.1)')
              : 'rgba(var(--highlight), 0.1)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          });
        }
        
        // Draw node with color if colorful mode is enabled
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        
        if (colorful && node.color) {
          ctx.fillStyle = node.color;
          
          // Add glow effect, stronger for hub nodes
          ctx.shadowBlur = node.isHub ? 20 : 15;
          ctx.shadowColor = node.color;
        } else {
          ctx.fillStyle = nodeColor;
          if (node.isHub) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = nodeColor;
          }
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for lines
        
        // Connect nodes that are close enough
        for (let j = i + 1; j < nodes.length; j++) {
          const otherNode = nodes[j];
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            // Create gradient line if in colorful mode
            if (colorful && node.color && otherNode.color) {
              const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y);
              gradient.addColorStop(0, node.color);
              gradient.addColorStop(1, otherNode.color);
              
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 1 * (1 - distance / 150); // Thicker lines that fade out with distance
              ctx.stroke();
            } else {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              ctx.strokeStyle = lineColor;
              ctx.lineWidth = 1 * (1 - distance / 150); // Thicker lines that fade out with distance
              ctx.stroke();
            }
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
      
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('click', handleClick);
      }
    };
  }, [nodeCount, nodeColor, lineColor, speed, colorful, colorPalette, interactive, hubNodes, particleBursts]);
  
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
