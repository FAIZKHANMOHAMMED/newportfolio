
import React from 'react';
import { Award, FileCheck, Calendar, Building } from 'lucide-react';
import ScrollAnimationWrapper from '@/components/animations/ScrollAnimationWrapper';
import AnimatedText from '@/components/ui/AnimatedText';
import AnimatedCard from '@/components/ui/AnimatedCard';
import DynamicBackground from '@/components/ui/DynamicBackground';
import { achievements as achievementData } from '@/data/Achievements';

const Achievements = () => {
  // Separate certifications and achievements
  const certifications = achievementData.filter(item => item.type === 'certification');
  const achievements = achievementData.filter(item => item.type === 'achievement');

  return (
    <section id="achievements" className="section-container relative overflow-hidden">
      <DynamicBackground variant="dots" intensity="light" color="accent-purple" />
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-40 left-20 w-80 h-80 bg-accent-pink/30 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-highlight/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-accent-purple/15 rounded-full filter blur-3xl"></div>
      </div>
      
      <ScrollAnimationWrapper animation="fade-up">
        <AnimatedText effect="gradient" as="h2" className="section-title">
          <span className="text-highlight font-mono mr-2">Achievements & Certifications</span> 
        </AnimatedText>
      </ScrollAnimationWrapper>

      <div className="grid md:grid-cols-2 gap-10 mt-12">
        <ScrollAnimationWrapper animation="fade-right" delay={200}>
          <div className="flex items-center mb-6 group hover:translate-y-[-2px] transition-transform duration-300">
            <div className="p-2 rounded-full bg-highlight/10 mr-3 group-hover:bg-highlight/20 group-hover:shadow-md group-hover:shadow-highlight/10 transition-all duration-300 transform group-hover:scale-110">
              <Award className="text-highlight h-6 w-6 group-hover:animate-pulse-slow" />
            </div>
            <AnimatedText effect="highlight" as="h3" className="text-slate-light text-xl font-semibold relative overflow-hidden group-hover:text-highlight transition-colors duration-300">
              Achievements
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-highlight/70 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></span>
            </AnimatedText>
          </div>
          <div className="space-y-5">
            {achievements.map((item, index) => (
              <ScrollAnimationWrapper
                key={item.id}
                animation="fade-up"
                delay={300 + (index * 100)}
              >
                <AnimatedCard 
                  className="bg-navy-light/50 glass-effect p-6 rounded-lg group/card" 
                  hoverEffect="lift"
                >
                  <div className="flex flex-col">
                    <AnimatedText effect="gradient" as="h4" className="text-lg font-semibold mb-1 group-hover/card:text-highlight transition-colors duration-300">
                      {item.title}
                    </AnimatedText>
                    <div className="flex items-center text-sm text-slate mb-3 font-mono group-hover/card:text-slate-light transition-colors duration-300">
                      <Calendar className="w-3 h-3 mr-2 group-hover/card:text-accent-orange transition-colors duration-300" />
                      {item.date}
                    </div>
                    <p className="text-slate/90 group-hover/card:text-slate transition-colors duration-500">{item.description}</p>
                    
                    {/* Animated border on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 border-2 border-highlight/0 group-hover/card:border-highlight/30 rounded-lg transform scale-90 group-hover/card:scale-95 transition-all duration-700 ease-out"></div>
                    </div>
                  </div>
                </AnimatedCard>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </ScrollAnimationWrapper>
        
        <ScrollAnimationWrapper animation="fade-left" delay={300}>
          <div className="flex items-center mb-6 group hover:translate-y-[-2px] transition-transform duration-300">
            <div className="p-2 rounded-full bg-highlight/10 mr-3 group-hover:bg-highlight/20 group-hover:shadow-md group-hover:shadow-highlight/10 transition-all duration-300 transform group-hover:scale-110">
              <FileCheck className="text-highlight h-6 w-6 group-hover:animate-pulse-slow" />
            </div>
            <AnimatedText effect="highlight" as="h3" className="text-slate-light text-xl font-semibold relative overflow-hidden group-hover:text-highlight transition-colors duration-300">
              Certifications
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-highlight/70 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></span>
            </AnimatedText>
          </div>
          <div className="space-y-5">
            {certifications.map((item, index) => (
              <ScrollAnimationWrapper
                key={item.id}
                animation="fade-up"
                delay={400 + (index * 100)}
              >
                <AnimatedCard 
                  className="bg-navy-light/50 glass-effect p-6 rounded-lg group/card" 
                  hoverEffect="lift"
                >
                  <div className="flex flex-col">
                    <AnimatedText effect="gradient" as="h4" className="text-lg font-semibold mb-1 group-hover/card:text-highlight transition-colors duration-300">
                      {item.title}
                    </AnimatedText>
                    {item.issuer && (
                      <div className="flex items-center text-highlight text-sm mb-1 group-hover/card:translate-y-[-2px] transition-transform duration-300">
                        <Building className="w-3 h-3 mr-2 transform group-hover/card:scale-125 transition-transform duration-300" />
                        <span className="relative overflow-hidden">
                          {item.issuer}
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-highlight/50 transform scale-x-0 group-hover/card:scale-x-100 transition-transform origin-left duration-500 ease-out"></span>
                        </span>
                      </div>
                    )}
                    <div className="flex items-center text-sm text-slate mb-3 font-mono group-hover/card:text-slate-light transition-colors duration-300">
                      <Calendar className="w-3 h-3 mr-2 group-hover/card:text-accent-orange transition-colors duration-300" />
                      {item.date}
                    </div>
                    <p className="text-slate/90 group-hover/card:text-slate transition-colors duration-500">{item.description}</p>
                    
                    {/* Animated border on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 border-2 border-highlight/0 group-hover/card:border-highlight/30 rounded-lg transform scale-90 group-hover/card:scale-95 transition-all duration-700 ease-out"></div>
                    </div>
                  </div>
                </AnimatedCard>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};

export default Achievements;
