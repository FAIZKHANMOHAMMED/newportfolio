
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { ArrowDown, Download, Github, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import SectionAnimation from '@/components/animations/SectionAnimation';
import AnimatedButton from '@/components/ui/AnimatedButton';
import AnimatedText from '@/components/ui/AnimatedText';
import DynamicBackground from '@/components/ui/DynamicBackground';
import TypewriterEffect from '@/components/ui/TypewriterEffect';
import TextScrambleEffect from '@/components/ui/TextScrambleEffect';
import SplitTextReveal from '@/components/ui/SplitTextReveal';

const Hero = () => {
  const [activeRole, setActiveRole] = useState(0);
  const roles = [
    { text: "Full Stack Developer", color: "text-highlight", delay: 600 },
    { text: "UI/UX Designer", color: "text-accent-purple", delay: 1700 },
    { text: "Programmer", color: "text-accent-teal", delay: 2600 }
  ];
  
  useEffect(() => {
    // Initial typing animations will play through once
    const cycleTimeout = setTimeout(() => {
      // After initial animations, start cycling through roles
      const interval = setInterval(() => {
        setActiveRole(prev => (prev + 1) % roles.length);
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
        <SectionAnimation animation="fade-up" className="space-y-6">
          {/* Animated greeting with TextScrambleEffect */}
          <div className="mb-3 font-mono text-highlight">
            <TextScrambleEffect 
              phrases={[
                "Hi, my name is",
                "Welcome to my portfolio",
                "Nice to meet you",
                "Let's build something amazing"
              ]}
              className="text-lg"
            />
          </div>
          
          {/* Name with gradient text */}
          <h1 className="text-5xl md:text-7xl font-bold mb-5 leading-tight gradient-text animate-fade-in-up">
            FAIZ KHAN MOHAMMED
          </h1>
          
          {/* Role with TypewriterEffect */}
          <div className="text-4xl md:text-6xl font-bold text-slate/90 mb-8 leading-tight h-16">
            <TypewriterEffect
              words={[
                { text: "Full Stack Developer", className: "text-highlight" },
                { text: "UI/UX Designer", className: "text-accent-purple" },
                { text: "Programmer", className: "text-accent-teal" },
                { text: "Problem Solver", className: "text-accent-orange" },
                { text: "Creative Thinker", className: "text-accent-pink" }
              ]}
              typingSpeed={100}
              deletingSpeed={80}
              delayBetweenWords={2000}
              cursorClassName="bg-highlight"
            />
          </div>
          
          <AnimatedText effect="fade" as="p" className="text-slate/90 max-w-md mb-10 text-lg leading-relaxed" delay={1000}>
            With a relentless passion for learning and a versatile skill set, I am driven to tackle new challenges and deliver high-quality results. My dedication, positive attitude, and growth mindset fuel my journey toward making meaningful contributions.
          </AnimatedText>
          
          <div className="flex gap-6 mb-10">
            <a href="https://github.com/FAIZKHANMOHAMMED" target="_blank" rel="noopener noreferrer" className="text-slate/80 hover:text-highlight transition-all duration-300 hover:scale-110">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/faizkhanmohammed8074/" target="_blank" rel="noopener noreferrer" className="text-slate/80 hover:text-highlight transition-all duration-300 hover:scale-110">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate/80 hover:text-highlight transition-all duration-300 hover:scale-110">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#/" target="_blank" rel="noopener noreferrer" className="text-slate/80 hover:text-highlight transition-all duration-300 hover:scale-110">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#/" target="_blank" rel="noopener noreferrer" className="text-slate/80 hover:text-highlight transition-all duration-300 hover:scale-110">
              <Facebook className="h-5 w-5" />
            </a>
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
                Check out my work
              </AnimatedButton>
            </Link>
            
            <AnimatedButton 
              href="https://drive.usercontent.google.com/download?id=1storNG1n_KnqKV6MWRlXmOrJcL_fRevj"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              icon={<Download className="h-4 w-4" />}
            >
              Download Resume
            </AnimatedButton>
          </div>
        </SectionAnimation>
      </div>
    </section>
  );
};

export default Hero;
