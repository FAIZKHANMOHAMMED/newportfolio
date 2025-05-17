
import React from 'react';
import { GraduationCap, Calendar, School, Award } from 'lucide-react';
import SectionAnimation from '@/components/animations/SectionAnimation';
import ScrollAnimationWrapper from '@/components/animations/ScrollAnimationWrapper';
import AnimatedText from '@/components/ui/AnimatedText';
import AnimatedCard from '@/components/ui/AnimatedCard';
import DynamicBackground from '@/components/ui/DynamicBackground';
import { educations } from '@/data/Education';

const Education = () => {
  // Using education data from Education.ts file

  return (
    <section id="education" className="section-container relative overflow-hidden">
      <DynamicBackground variant="dots" intensity="light" color="accent-orange" />
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-accent-orange/30 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-40 left-20 w-72 h-72 bg-accent-pink/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-20 w-64 h-64 bg-highlight/15 rounded-full filter blur-3xl"></div>
      </div>
      
      <ScrollAnimationWrapper animation="fade-up">  
        <AnimatedText effect="gradient" as="h2" className="section-title">
          <span className="text-highlight font-mono mr-2">Education</span> 
        </AnimatedText>
      </ScrollAnimationWrapper>

      <div className="max-w-3xl mx-auto">
        <ScrollAnimationWrapper animation="fade-up" delay={200}>
          <div className="flex items-center mb-8 text-slate-light">
            <div className="p-2 rounded-full bg-highlight/10 mr-3">
              <GraduationCap className="w-6 h-6 text-highlight" />
            </div>
            <AnimatedText effect="highlight" as="h3" className="text-xl font-medium">
              Educational Background
            </AnimatedText>
          </div>
        </ScrollAnimationWrapper>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-highlight/30 before:to-transparent">
          {educations.map((edu, index) => (
            <ScrollAnimationWrapper 
              key={edu.id} 
              animation="fade-up" 
              delay={400 + (index * 200)}
              className="relative flex items-start md:items-center group"
            >
              {/* Timeline circle */}
              <div className="absolute left-0 md:left-1/2 mt-1.5 md:mt-0 md:-translate-x-1/2 top-5 md:top-1/2 md:-mt-1.5 h-4 w-4 rounded-full border-2 border-highlight bg-navy shadow-md group-hover:scale-150 group-hover:shadow-highlight/30 group-hover:shadow-lg transition-all duration-500 ease-out"></div>
              
              {/* Timeline pulse effect on hover */}
              <div className="absolute left-0 md:left-1/2 mt-1.5 md:mt-0 md:-translate-x-1/2 top-5 md:top-1/2 md:-mt-1.5 h-4 w-4 rounded-full opacity-0 group-hover:opacity-70 bg-highlight/20 animate-ping"></div>
              
              {/* Education Card */}
              <div className={`ml-12 md:ml-0 ${
                index % 2 === 0 ? 'md:mr-auto md:pr-16 md:text-right' : 'md:ml-auto md:pl-16'
              } pb-5`}>
                <AnimatedCard className="bg-navy-light/50 glass-effect p-6 rounded-lg group/card" hoverEffect="lift">
                  <div className="flex flex-col">
                    <AnimatedText effect="gradient" as="h3" className="text-xl font-semibold group-hover/card:text-highlight transition-colors duration-300">
                      {edu.degree}
                    </AnimatedText>
                    <div className="flex items-center text-highlight font-medium mb-1 group-hover/card:translate-y-[-2px] transition-transform duration-300">
                      <School className="w-4 h-4 mr-2 transform group-hover/card:scale-125 transition-transform duration-300" />
                      <span className="relative overflow-hidden">
                        {edu.institution}
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-highlight/50 transform scale-x-0 group-hover/card:scale-x-100 transition-transform origin-left duration-500 ease-out"></span>
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-slate mb-3 font-mono group-hover/card:text-slate-light transition-colors duration-300">
                      <Calendar className="w-3 h-3 mr-2 group-hover/card:text-accent-orange transition-colors duration-300" />
                      {edu.period}
                    </div>
                    <p className="text-slate/90 group-hover/card:text-slate transition-colors duration-500">{edu.description}</p>
                  </div>
                </AnimatedCard>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
