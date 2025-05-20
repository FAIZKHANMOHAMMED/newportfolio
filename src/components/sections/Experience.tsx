import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Calendar, ExternalLink, MapPin, Building, Code, Star, ChevronDown } from 'lucide-react';
import ScrollAnimationWrapper from '@/components/animations/ScrollAnimationWrapper';
import AnimatedCard from '@/components/ui/AnimatedCard';
import AnimatedText from '@/components/ui/AnimatedText';
import AnimatedButton from '@/components/ui/AnimatedButton';
import DynamicBackground from '@/components/ui/DynamicBackground';
import { jobs } from '@/data/Experience';

const Experience = () => {
  // Get unique jobs and sort by year (newest first)
  const uniqueJobs = Array.from(new Map(jobs.map(job => [job.company, job])).values())
    .sort((a, b) => b.year - a.year);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedDetails, setExpandedDetails] = useState(false);
  const activeJob = uniqueJobs[activeIndex];
  
  // For timeline animations
  const timelineRef = useRef(null);
  const [timelineVisible, setTimelineVisible] = useState(false);
  
  // For skill tags
  const skillTags = [
    { name: 'React', icon: <Code size={12} /> },
    { name: 'TypeScript', icon: <Code size={12} /> },
    { name: 'Node.js', icon: <Code size={12} /> },
    { name: 'GraphQL', icon: <Code size={12} /> },
    { name: 'UI/UX', icon: <Star size={12} /> },
    { name: 'Performance', icon: <Star size={12} /> }
  ];
  
  // Observe timeline element to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimelineVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }
    
    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);
  
  // Toggle expanded details
  const toggleDetails = () => {
    setExpandedDetails(prev => !prev);
  };

  return (
    <section id="experience" className="section-container relative overflow-hidden min-h-screen py-24 flex flex-col justify-center">
      {/* Enhanced background with multiple layers */}
      <DynamicBackground variant="gradient" intensity="medium" color="highlight" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] opacity-20" />
      
      {/* Floating accent elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-highlight/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent-purple/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-accent-pink/10 rounded-full blur-3xl animate-float-slow" />
      </div>
      
      <ScrollAnimationWrapper animation="fade-up">
        <AnimatedText effect="gradient" as="h2" className="section-title mb-16 text-center text-4xl sm:text-5xl font-bold">
          <span className="text-highlight font-mono mr-2">Professional Journey</span>
        </AnimatedText>
      </ScrollAnimationWrapper>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto relative z-10">
        {/* Left sidebar with company navigation */}
        <div className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start">
          <ScrollAnimationWrapper animation="fade-right">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 lg:p-6 mb-5 sm:mb-6 border border-border/50 shadow-lg">
              <div className="flex items-center mb-5">
                <div className="p-2 rounded-full bg-primary/10 mr-3 animate-pulse-slow">
                  <Building className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-foreground">Companies</h3>
              </div>
              
              <div className="space-y-2.5">
                {uniqueJobs.map((job, index) => (
                  <button
                    key={job.id}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center ${activeIndex === index 
                      ? 'bg-primary/10 text-primary shadow-sm' 
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}
                  >
                    <span className={`w-2 h-2 rounded-full mr-3 ${activeIndex === index ? 'bg-primary' : 'bg-muted'}`}></span>
                    <span className="font-medium text-sm sm:text-base">{job.company}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <AnimatedButton 
              onClick={toggleDetails}
              variant="outline"
              size="sm"
              icon={expandedDetails ? 
                <ChevronDown size={16} className="rotate-180 transition-transform duration-300" /> : 
                <ChevronDown size={16} />}
              iconPosition="right"
              className="w-full justify-between text-sm font-medium mb-5 sm:mb-6 transition-all duration-300 bg-card/80 backdrop-blur-sm border-border/50"
            >
              {expandedDetails ? 'Hide Details' : 'Show All Details'}
            </AnimatedButton>
          </ScrollAnimationWrapper>
        </div>

        {/* Main content area with timeline */}
        <div className="lg:col-span-9">
          <div ref={timelineRef} className="relative">
            {/* Timeline line - enhanced with gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/5 via-primary/30 to-primary/5 ml-3.5 lg:ml-5"></div>
            
            {/* Timeline content */}
            <div className="space-y-12 relative">
              {/* Active job details */}
              <ScrollAnimationWrapper animation="fade-up" className="relative">
                <div className="flex">
                  {/* Timeline node - enhanced with animation */}
                  <div className={`relative z-10 ${timelineVisible ? 'animate-pulse-slow' : ''}`}>
                    <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-full bg-card border-2 border-primary flex items-center justify-center shadow-md shadow-primary/10">
                      <Briefcase className="w-3 h-3 lg:w-5 lg:h-5 text-primary" />
                    </div>
                    <div className="absolute top-7 lg:top-10 bottom-0 left-1/2 w-px bg-primary/20 -translate-x-1/2"></div>
                  </div>
                  
                  {/* Content - enhanced card */}
                  <div className="ml-5 lg:ml-8 flex-1">
                    <AnimatedCard 
                      className="bg-card/80 backdrop-blur-sm rounded-xl p-5 sm:p-7 lg:p-8 relative overflow-hidden border border-border/50 shadow-lg" 
                      hoverEffect="glow"
                    >
                      {/* Subtle decorative elements */}
                      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full filter blur-xl opacity-70"></div>
                      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent-pink/5 rounded-full filter blur-xl opacity-70"></div>
                      
                      <div className="relative z-10">
                        {/* Job header - improved layout */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 sm:mb-7 gap-3 sm:gap-4">
                          <div>
                            <AnimatedText effect="gradient" as="h3" className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                              {activeJob.title}
                            </AnimatedText>
                            <div className="flex items-center">
                              <Building className="w-4 h-4 text-primary mr-2" />
                              <span className="text-foreground font-medium">{activeJob.company}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-3">
                            <div className="flex items-center font-mono text-sm bg-muted/50 px-4 py-1.5 rounded-full border border-border/50">
                              <Calendar className="w-4 h-4 mr-2 text-primary" />
                              {activeJob.period}
                            </div>
                            
                            <div className="flex items-center font-mono text-sm bg-muted/50 px-4 py-1.5 rounded-full border border-border/50">
                              <MapPin className="w-4 h-4 mr-2 text-primary" />
                              <span>Remote</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Skills tags - enhanced with better styling */}
                        <div className="mt-6 mb-8">
                          <div className="flex flex-wrap gap-2">
                            {skillTags.map((skill, i) => (
                              <span 
                                key={skill.name} 
                                className="bg-muted/70 px-3.5 py-1.5 rounded-full text-xs font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 flex items-center border border-border/30"
                                style={{ animationDelay: `${i * 100}ms` }}
                              >
                                <span className="mr-1.5">{skill.icon}</span>
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Responsibilities with improved styling */}
                        <div className="space-y-3 mb-6">
                          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Responsibilities</h4>
                          {activeJob.responsibilities.map((resp, i) => (
                            <div 
                              key={`${activeJob.id}-resp-${i}`} 
                              className={`transition-all duration-500 ${i >= 2 && !expandedDetails ? 'hidden' : ''}`}
                              style={{ animationDelay: `${i * 100}ms` }}
                            >
                              <div className="flex group hover:bg-muted/50 p-3.5 rounded-lg transition-all duration-300 border border-transparent hover:border-border/50">
                                <span className="text-primary mr-3 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300">▹</span>
                                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{resp}</span>
                              </div>
                            </div>
                          ))}
                          
                          {activeJob.responsibilities.length > 2 && !expandedDetails && (
                            <div className="text-center pt-2">
                              <button 
                                onClick={toggleDetails}
                                className="text-primary text-sm hover:text-primary/80 transition-colors duration-300 flex items-center mx-auto bg-muted/30 px-4 py-2 rounded-full"
                              >
                                <span>View More</span>
                                <ChevronDown size={16} className="ml-1.5 animate-bounce-slow" />
                              </button>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-border/30 flex justify-between items-center">
                          <AnimatedButton 
                            href="#"
                            variant="outline"
                            size="sm"
                            icon={<ExternalLink size={16} />}
                            iconPosition="right"
                            className="text-sm font-medium hover:text-primary transition-colors duration-300 bg-transparent"
                          >
                            Visit Company
                          </AnimatedButton>
                          
                          <div className="text-xs text-muted-foreground font-mono bg-muted/30 px-3 py-1 rounded-full">{activeJob.year}</div>
                        </div>
                      </div>
                    </AnimatedCard>
                  </div>
                </div>
              </ScrollAnimationWrapper>
              
              {/* Previous experience timeline nodes - enhanced with better styling */}
              {uniqueJobs.filter((_, idx) => idx !== activeIndex).map((job, i) => (
                <ScrollAnimationWrapper 
                  key={job.id} 
                  animation="fade-up" 
                  delay={100 + (i * 100)}
                  className="relative"
                >
                  <div className="flex">
                    {/* Timeline node */}
                    <div>
                      <div 
                        className="w-7 h-7 lg:w-10 lg:h-10 rounded-full bg-card border border-primary/30 flex items-center justify-center cursor-pointer hover:border-primary hover:shadow-md transition-all duration-300"
                        onClick={() => setActiveIndex(uniqueJobs.findIndex(j => j.id === job.id))}
                      >
                        <Briefcase className="w-3 h-3 lg:w-4 lg:h-4 text-primary/50" />
                      </div>
                    </div>
                    
                    {/* Simplified content with better hover effects */}
                    <div className="ml-5 lg:ml-8 flex-1">
                      <div 
                        className="bg-card/60 backdrop-blur-sm rounded-xl p-5 cursor-pointer hover:bg-card/80 transition-all duration-300 border border-border/30 hover:border-border/50 hover:shadow-md group"
                        onClick={() => setActiveIndex(uniqueJobs.findIndex(j => j.id === job.id))}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div>
                            <h4 className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">{job.title}</h4>
                            <div className="text-muted-foreground text-sm">{job.company}</div>
                          </div>
                          <div className="text-xs font-mono text-muted-foreground bg-muted/30 px-3 py-1 rounded-full group-hover:bg-primary/10 transition-all duration-300">{job.period}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollAnimationWrapper>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced mobile pagination dots */}
      <div className="flex justify-center mt-12 lg:hidden">
        <div className="bg-card/60 backdrop-blur-sm rounded-full px-4 py-2 border border-border/30 flex items-center space-x-2">
          {uniqueJobs.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2.5 h-2.5 mx-1 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-primary w-5' : 'bg-muted hover:bg-muted-foreground'}`}
              aria-label={`Go to experience ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
