import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Calendar, ExternalLink, MapPin, Award, ChevronRight, Building, Code, Star } from 'lucide-react';
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
    <section id="experience" className="section-container relative overflow-hidden min-h-screen py-20">
      <DynamicBackground variant="waves" intensity="light" color="highlight" />
      
      {/* Decorative elements */}
      <div className="absolute top-40 left-10 w-64 h-64 bg-highlight/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-pink/5 rounded-full filter blur-3xl animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-accent-purple/5 rounded-full filter blur-3xl animate-float-slow"></div>
      
      <ScrollAnimationWrapper animation="fade-up">
        <AnimatedText effect="gradient" as="h2" className="section-title mb-16">
          <span className="text-highlight font-mono mr-2">Professional Journey</span>
        </AnimatedText>
      </ScrollAnimationWrapper>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
        {/* Left sidebar with company navigation */}
        <div className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start">
          <ScrollAnimationWrapper animation="fade-right">
            <div className="bg-navy-light/30 glass-effect rounded-xl p-5 mb-6">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-highlight/10 mr-3 animate-pulse-slow">
                  <Building className="w-5 h-5 text-highlight" />
                </div>
                <h3 className="text-lg font-medium text-slate-light">Companies</h3>
              </div>
              
              <div className="space-y-1">
                {uniqueJobs.map((job, index) => (
                  <button
                    key={job.id}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center ${activeIndex === index 
                      ? 'bg-navy-dark text-highlight' 
                      : 'text-slate hover:bg-navy-dark/50 hover:text-slate-light'}`}
                  >
                    <span className={`w-2 h-2 rounded-full mr-3 ${activeIndex === index ? 'bg-highlight' : 'bg-slate/30'}`}></span>
                    <span className="font-medium">{job.company}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <AnimatedButton 
              onClick={toggleDetails}
              variant="outline"
              size="sm"
              icon={expandedDetails ? <ChevronRight size={16} className="rotate-90 transition-transform duration-300" /> : <ChevronRight size={16} />}
              iconPosition="right"
              className="w-full justify-between text-sm font-mono mb-6 transition-all duration-300"
            >
              {expandedDetails ? 'Hide Details' : 'Show Details'}
            </AnimatedButton>
          </ScrollAnimationWrapper>
        </div>

        {/* Main content area with timeline */}
        <div className="lg:col-span-9">
          <div ref={timelineRef} className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-highlight/5 via-highlight/20 to-highlight/5 ml-3 lg:ml-5"></div>
            
            {/* Timeline content */}
            <div className="space-y-16 relative">
              {/* Active job details */}
              <ScrollAnimationWrapper animation="fade-up" className="relative">
                <div className="flex">
                  {/* Timeline node */}
                  <div className={`relative z-10 ${timelineVisible ? 'animate-pulse-slow' : ''}`}>
                    <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-full bg-navy-dark border-2 border-highlight flex items-center justify-center">
                      <Briefcase className="w-3 h-3 lg:w-5 lg:h-5 text-highlight" />
                    </div>
                    <div className="absolute top-7 lg:top-10 bottom-0 left-1/2 w-px bg-highlight/20 -translate-x-1/2"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="ml-5 lg:ml-8 flex-1">
                    <AnimatedCard 
                      className="bg-navy-light/30 glass-effect rounded-xl p-6 lg:p-8 relative overflow-hidden" 
                      hoverEffect="glow"
                    >
                      {/* Decorative elements */}
                      <div className="absolute -top-24 -right-24 w-48 h-48 bg-highlight/5 rounded-full filter blur-xl opacity-70"></div>
                      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent-pink/5 rounded-full filter blur-xl opacity-70"></div>
                      
                      <div className="relative z-10">
                        {/* Job header */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-3">
                          <div>
                            <AnimatedText effect="gradient" as="h3" className="text-xl lg:text-2xl font-bold">
                              {activeJob.title}
                            </AnimatedText>
                            <div className="flex items-center mt-1">
                              <Building className="w-4 h-4 text-highlight mr-2" />
                              <span className="text-slate-light font-medium">{activeJob.company}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-3">
                            <div className="flex items-center font-mono text-sm text-slate bg-navy-dark/50 px-3 py-1 rounded-full">
                              <Calendar className="w-4 h-4 mr-2 text-highlight" />
                              {activeJob.period}
                            </div>
                            
                            <div className="flex items-center font-mono text-sm text-slate bg-navy-dark/50 px-3 py-1 rounded-full">
                              <MapPin className="w-4 h-4 mr-2 text-highlight" />
                              <span>Remote</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Skills tags */}
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2">
                            {skillTags.map((skill, i) => (
                              <span 
                                key={skill.name} 
                                className="bg-navy-dark px-3 py-1 rounded-full text-xs text-slate-light hover:bg-highlight/20 hover:text-highlight transition-all duration-300 flex items-center"
                                style={{ animationDelay: `${i * 100}ms` }}
                              >
                                <span className="mr-1">{skill.icon}</span>
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Responsibilities with expanded details toggle */}
                        <div className="space-y-4">
                          {activeJob.responsibilities.map((resp, i) => (
                            <div 
                              key={`${activeJob.id}-resp-${i}`} 
                              className={`transition-all duration-500 ${i >= 2 && !expandedDetails ? 'hidden' : ''}`}
                              style={{ animationDelay: `${i * 100}ms` }}
                            >
                              <div className="flex group hover:bg-navy-dark/30 p-3 rounded-lg transition-all duration-300 border border-transparent hover:border-navy-light/30">
                                <span className="text-highlight mr-3 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300">▹</span>
                                <span className="text-slate/90 group-hover:text-slate-light transition-colors duration-300">{resp}</span>
                              </div>
                            </div>
                          ))}
                          
                          {activeJob.responsibilities.length > 2 && !expandedDetails && (
                            <div className="text-center pt-2">
                              <button 
                                onClick={toggleDetails}
                                className="text-highlight text-sm hover:text-highlight/80 transition-colors duration-300 flex items-center mx-auto"
                              >
                                <span>View More</span>
                                <ChevronRight size={16} className="ml-1 animate-bounce-x" />
                              </button>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-navy-light/30 flex justify-between items-center">
                          <AnimatedButton 
                            href="#"
                            variant="ghost"
                            size="sm"
                            icon={<ExternalLink size={16} />}
                            iconPosition="right"
                            className="text-sm font-mono hover:text-highlight transition-colors duration-300"
                          >
                            Visit Company
                          </AnimatedButton>
                          
                          <div className="text-xs text-slate/50 font-mono">{activeJob.year}</div>
                        </div>
                      </div>
                    </AnimatedCard>
                  </div>
                </div>
              </ScrollAnimationWrapper>
              
              {/* Previous experience timeline nodes (simplified) */}
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
                        className="w-7 h-7 lg:w-10 lg:h-10 rounded-full bg-navy-dark border border-highlight/30 flex items-center justify-center cursor-pointer hover:border-highlight transition-all duration-300"
                        onClick={() => setActiveIndex(uniqueJobs.findIndex(j => j.id === job.id))}
                      >
                        <Briefcase className="w-3 h-3 lg:w-4 lg:h-4 text-highlight/50" />
                      </div>
                    </div>
                    
                    {/* Simplified content */}
                    <div className="ml-5 lg:ml-8 flex-1">
                      <div 
                        className="bg-navy-dark/30 rounded-xl p-4 cursor-pointer hover:bg-navy-light/30 transition-all duration-300"
                        onClick={() => setActiveIndex(uniqueJobs.findIndex(j => j.id === job.id))}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <h4 className="text-slate-light font-medium">{job.title}</h4>
                            <div className="text-slate/70 text-sm">{job.company}</div>
                          </div>
                          <div className="text-xs font-mono text-slate/50">{job.period}</div>
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
      
      {/* Mobile pagination dots */}
      <div className="flex justify-center mt-12 lg:hidden">
        {uniqueJobs.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-highlight w-4' : 'bg-slate/30 hover:bg-slate/50'}`}
            aria-label={`Go to experience ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;
