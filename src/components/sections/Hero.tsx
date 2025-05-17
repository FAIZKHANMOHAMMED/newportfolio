
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { ArrowDown, Download, Github, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import ScrollAnimationWrapper from '@/components/animations/ScrollAnimationWrapper';
import AnimatedButton from '@/components/ui/AnimatedButton';
import AnimatedText from '@/components/ui/AnimatedText';
import DynamicBackground from '@/components/ui/DynamicBackground';
import TypewriterEffect from '@/components/ui/TypewriterEffect';
import TextScrambleEffect from '@/components/ui/TextScrambleEffect';
import SplitTextReveal from '@/components/ui/SplitTextReveal';
import { heroInfo } from '@/data/Hero';

const Hero = () => {
  const [activeRole, setActiveRole] = useState(0);
  
  useEffect(() => {
    // Initial typing animations will play through once
    const cycleTimeout = setTimeout(() => {
      // After initial animations, start cycling through roles
      const interval = setInterval(() => {
        setActiveRole(prev => (prev + 1) % heroInfo.roles.length);
      }, 5000); // Change role every 5 seconds
      
      return () => clearInterval(interval);
    }, 4000); // Start cycling after initial animations complete
    
    return () => clearTimeout(cycleTimeout);
  }, []);
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dynamic animated background */}
      <DynamicBackground variant="particles" intensity="medium" color="highlight" />
      {/* Subtle gradient orbs in background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-40 left-20 w-80 h-80 bg-highlight/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-40 right-20 w-72 h-72 bg-accent-purple/20 rounded-full filter blur-3xl animate-float"></div>
      </div>
      <div className="max-w-6xl mx-auto px-4 z-10">
        <ScrollAnimationWrapper animation="fade-up" className="space-y-6">
          {/* Animated greeting with TextScrambleEffect */}
          <div className="mb-3 font-mono text-highlight">
            <TextScrambleEffect 
              phrases={heroInfo.greetings}
              className="text-lg"
            />
          </div>
          
          {/* Name with gradient text */}
          <h1 className="text-5xl md:text-7xl font-bold mb-5 leading-tight gradient-text animate-fade-in-up">
            {heroInfo.name.toUpperCase()}
          </h1>
          
          {/* Role with TypewriterEffect */}
          <div className="text-4xl md:text-6xl font-bold text-slate/90 mb-8 leading-tight h-16">
            <TypewriterEffect
              words={heroInfo.roles.map(role => ({ text: role.text, className: role.color }))}
              typingSpeed={100}
              deletingSpeed={80}
              delayBetweenWords={2000}
              cursorClassName="bg-highlight"
            />
          </div>
          
          <AnimatedText effect="fade" as="p" className="text-slate/90 max-w-md mb-10 text-lg leading-relaxed" delay={1000}>
            {heroInfo.description}
          </AnimatedText>
          
          <div className="flex gap-6 mb-10">
            {heroInfo.socialLinks.map(social => {
              // Map string icon names to actual icon components
              const iconMap = {
                Github,
                Linkedin,
                Twitter,
                Instagram,
                Facebook
              };
              const IconComponent = iconMap[social.icon as keyof typeof iconMap];
              
              return (
                <a 
                  key={social.id}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate/80 hover:text-highlight transition-all duration-300 hover:scale-110"
                >
                  <IconComponent className="h-5 w-5" />
                </a>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="projects"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className="inline-block"
            >
              <AnimatedButton 
                variant="primary" 
                size="md"
                icon={<ArrowDown className="h-4 w-4" />}
              >
                {heroInfo.ctaText}
              </AnimatedButton>
            </Link>
            
            <AnimatedButton 
              href={heroInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              icon={<Download className="h-4 w-4" />}
            >
              Download Resume
            </AnimatedButton>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};

export default Hero;
