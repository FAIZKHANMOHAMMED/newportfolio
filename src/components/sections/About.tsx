
import React, { useState, useEffect } from 'react';
import SectionAnimation from '@/components/animations/SectionAnimation';
import AnimatedText from '@/components/ui/AnimatedText';
import AnimatedCard from '@/components/ui/AnimatedCard';
import DynamicBackground from '@/components/ui/DynamicBackground';
import profile from '../../assets/images/profileimg.png';
const About = () => {
  const skills = [
    'JavaScript (ES6+)', 'TypeScript', 'React', 'Node.js', 
    'Next.js', 'Express', 'GraphQL', 'Tailwind CSS',
    'MongoDB', 'PostgreSQL', 'AWS', 'Docker',
    'UI/UX Design', 'Responsive Design', 'RESTful APIs'
  ];
  
  const personalInfo = {
    name: "Faiz Khan Mohammed",
    title: "Full Stack Developer & UI/UX Designer",
    location: "Hyderabad, India",
    education: "Bachelor's in Computer Science",
    experience: "5+ years of development experience",
    interests: ["Web Development", "UI/UX Design", "Open Source", "Tech Innovation"]
  };
  
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
      
      <SectionAnimation animation="fade-up">
        <AnimatedText effect="gradient" as="h2" className="section-title">
          <span className="text-highlight font-mono mr-2">About Me</span> 
        </AnimatedText>
      </SectionAnimation>

      <div className="grid md:grid-cols-3 gap-12 items-center">
        <SectionAnimation 
          animation="fade-up" 
          delay={200} 
          className="md:col-span-2 space-y-5">
          <AnimatedText effect="fade" as="p" className="text-lg" delay={300}>
            Hello! I'm <span className="text-highlight font-medium">{personalInfo.name}</span>, a passionate {personalInfo.title} based in {personalInfo.location}. 
            With a relentless drive for creating exceptional digital experiences, I combine technical expertise with creative design thinking 
            to build solutions that are both functional and visually compelling.
          </AnimatedText>
          <AnimatedText effect="fade" as="p" className="text-lg" delay={500}>
            With {personalInfo.experience}, I've had the opportunity to work on diverse projects ranging from 
            <a href="#" className="text-highlight font-medium hover:underline underline-animation"> enterprise applications</a>, 
            <a href="#" className="text-highlight font-medium hover:underline underline-animation"> e-commerce platforms</a>, 
            <a href="#" className="text-highlight font-medium hover:underline underline-animation"> interactive web applications</a>, and 
            <a href="#" className="text-highlight font-medium hover:underline underline-animation"> mobile-responsive interfaces</a>. 
            My approach combines clean code, intuitive design, and performance optimization to deliver seamless user experiences 
            that exceed expectations.
          </AnimatedText>
          <AnimatedText effect="fade" as="p" className="text-lg" delay={700}>
            Beyond coding, I'm deeply interested in {personalInfo.interests.join(", ")}. I believe in continuous learning 
            and staying at the forefront of technology trends. When I'm not immersed in development, you'll find me exploring new 
            technologies, contributing to open-source projects, or sharing knowledge with the developer community.
          </AnimatedText>

          <AnimatedText effect="highlight" as="h3" className="text-slate-light font-semibold text-xl mt-8 mb-4" delay={900}>
            Technologies I've been working with:
          </AnimatedText>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-3">
            {skills.map((skill, i) => (
              <li 
                key={i} 
                className="flex items-center opacity-0 translate-y-3 transition-all duration-500 ease-out hover:translate-x-1 group cursor-default"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? 'translateY(0)' : 'translateY(0.75rem)',
                  transitionDelay: `${900 + (i * 100)}ms`
                }}
              >
                <span className="text-highlight mr-2 transform transition-transform duration-300 group-hover:scale-125">▹</span>
                <span className="font-mono text-sm relative overflow-hidden group-hover:text-highlight transition-colors duration-300">
                  {skill}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-highlight/70 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </span>
              </li>
            ))}
          </ul>
        </SectionAnimation>

        <SectionAnimation 
          animation="fade-left" 
          delay={400} 
          className="relative group">
          <AnimatedCard className="gradient-border group" hoverEffect="glow">
            <div className="relative rounded-lg overflow-hidden bg-highlight/5 w-full aspect-square">
              <div 
                className="absolute inset-0 bg-navy z-10 transform-gpu transition-transform duration-1000 ease-in-out"
                style={{
                  transform: revealed ? 'translateX(100%)' : 'translateX(0)',
                  transitionDelay: '600ms'
                }}
              />
              <img 
                src={profile} 
                alt="Faiz Khan Mohammed profile" 
                className="mix-blend-luminosity grayscale group-hover:filter-none group-hover:scale-105 transition-all duration-700 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-highlight/20 to-accent-purple/10 group-hover:from-highlight/10 group-hover:to-transparent transition-all duration-500"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 border-2 border-highlight/0 group-hover:border-highlight/40 rounded-lg transform scale-90 group-hover:scale-95 transition-all duration-700 ease-out"></div>
              </div>
            </div>
          </AnimatedCard>
        </SectionAnimation>
      </div>
    </section>
  );
};

export default About;
