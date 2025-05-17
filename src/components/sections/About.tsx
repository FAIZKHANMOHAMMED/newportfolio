
import React, { useState, useEffect } from 'react';
import ScrollAnimationWrapper from '@/components/animations/ScrollAnimationWrapper';
import AnimatedText from '@/components/ui/AnimatedText';
import AnimatedCard from '@/components/ui/AnimatedCard';
import DynamicBackground from '@/components/ui/DynamicBackground';
import profile from '../../assets/images/profileimg.png';
import { aboutInfo } from '@/data/About';
const About = () => {
  
  // State for reveal animation
  const [revealed, setRevealed] = useState(false);
  
  // Trigger reveal animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" className="section-container relative overflow-hidden">
      <DynamicBackground variant="dots" intensity="light" color="accent-teal" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 right-20 w-72 h-72 bg-accent-teal/30 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent-purple/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-accent-orange/15 rounded-full filter blur-3xl"></div>
      </div>
      
      <ScrollAnimationWrapper animation="fade-up">
        <AnimatedText effect="gradient" as="h2" className="section-title">
          <span className="text-highlight font-mono mr-2">About Me</span> 
        </AnimatedText>
      </ScrollAnimationWrapper>

      <div className="grid md:grid-cols-3 gap-12 items-center">
        <ScrollAnimationWrapper 
          animation="fade-up" 
          delay={200} 
          className="md:col-span-2 space-y-5">
          {aboutInfo.bio.map((paragraph, index) => (
            <AnimatedText 
              key={index}
              effect="fade" 
              as="p" 
              className="text-lg" 
              delay={300 + (index * 200)}
            >
              {index === 0 && (
                <>
                  Hello! I'm <span className="text-highlight font-medium">{aboutInfo.name}</span>, a passionate {aboutInfo.title} based in {aboutInfo.location}. {paragraph}
                </>
              )}
              {index !== 0 && paragraph}
            </AnimatedText>
          ))}

          <AnimatedText effect="highlight" as="h3" className="text-slate-light font-semibold text-xl mt-8 mb-4" delay={900}>
            Technologies I've been working with:
          </AnimatedText>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-3">
            {aboutInfo.skills.map((skill, i) => (
              <li 
                key={i} 
                className="flex items-center hover:translate-x-1 group cursor-default transition-all duration-300"
              >
                <span className="text-highlight mr-2 transform transition-transform duration-300 group-hover:scale-125">▹</span>
                <span className="font-mono text-sm relative overflow-hidden group-hover:text-highlight transition-colors duration-300">
                  {skill}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-highlight/70 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </span>
              </li>
            ))}
          </ul>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper 
          animation="fade-left" 
          delay={400} 
          className="relative group">
          <AnimatedCard className="gradient-border group" hoverEffect="glow">
            <div className="relative rounded-lg overflow-hidden bg-highlight/5 w-full aspect-square">
              <img 
                src={profile} 
                alt={`${aboutInfo.name} profile`} 
                className="mix-blend-luminosity grayscale group-hover:filter-none group-hover:scale-105 transition-all duration-700 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-highlight/20 to-accent-purple/10 group-hover:from-highlight/10 group-hover:to-transparent transition-all duration-500"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 border-2 border-highlight/0 group-hover:border-highlight/40 rounded-lg transform scale-90 group-hover:scale-95 transition-all duration-700 ease-out"></div>
              </div>
            </div>
          </AnimatedCard>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};

export default About;
