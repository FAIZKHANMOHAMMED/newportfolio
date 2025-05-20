
import React, { useState } from 'react';
import { Award, FileCheck, Calendar, Building, Star, Zap, ExternalLink } from 'lucide-react';
import ScrollAnimationWrapper from '@/components/animations/ScrollAnimationWrapper';
import AnimatedText from '@/components/ui/AnimatedText';
import AnimatedCard from '@/components/ui/AnimatedCard';
import DynamicBackground from '@/components/ui/DynamicBackground';
import { achievements as achievementData } from '@/data/Achievements';

const Achievements = () => {
  const [activeType, setActiveType] = useState<'all' | 'certification' | 'achievement'>('all');
  
  // Separate certifications and achievements
  const certifications = achievementData.filter(item => item.type === 'certification');
  const achievements = achievementData.filter(item => item.type === 'achievement');
  
  // Filter items based on active type
  const filteredItems = activeType === 'all' 
    ? achievementData 
    : activeType === 'certification' 
      ? certifications 
      : achievements;
  
  return (
    <section id="achievements" className="section-container relative overflow-hidden py-24 min-h-screen flex flex-col items-center justify-center">
      {/* Enhanced background with multiple layers */}
      <DynamicBackground variant="gradient" intensity="medium" color="accent-purple" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] opacity-20" />
      
      {/* Floating accent elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-60 h-60 bg-accent-purple/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>
      
      {/* Section header with enhanced animation */}
      <div className="pt-10 sm:pt-16 relative z-10 w-full">
        <ScrollAnimationWrapper animation="fade-up">
          <AnimatedText effect="gradient" as="h2" className="section-title mb-6 text-center text-4xl sm:text-5xl font-bold">
            <span className="text-highlight font-mono">Achievements & Certifications</span>
          </AnimatedText>
          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-sm sm:text-base text-center mb-12 leading-relaxed">
            Recognition and professional qualifications earned throughout my career journey.
          </p>
        </ScrollAnimationWrapper>
      </div>
      
      {/* Enhanced filter controls */}
      <div className="mb-12 relative z-10 w-full max-w-2xl mx-auto">
        <ScrollAnimationWrapper animation="fade-up" delay={100}>
          <div className="flex justify-center gap-3 p-2 bg-card/50 backdrop-blur-sm rounded-full border border-border/50 shadow-lg">
            <button
              onClick={() => setActiveType('all')}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeType === 'all' 
                ? 'bg-primary text-primary-foreground shadow-md scale-105' 
                : 'hover:bg-muted/80 text-muted-foreground hover:text-foreground'}`}
            >
              <Zap className="w-4 h-4" /> All Items
            </button>
            <button
              onClick={() => setActiveType('achievement')}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeType === 'achievement' 
                ? 'bg-accent text-accent-foreground shadow-md scale-105' 
                : 'hover:bg-muted/80 text-muted-foreground hover:text-foreground'}`}
            >
              <Star className="w-4 h-4" /> Achievements
            </button>
            <button
              onClick={() => setActiveType('certification')}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeType === 'certification' 
                ? 'bg-accent-purple text-white shadow-md scale-105' 
                : 'hover:bg-muted/80 text-muted-foreground hover:text-foreground'}`}
            >
              <FileCheck className="w-4 h-4" /> Certifications
            </button>
          </div>
        </ScrollAnimationWrapper>
      </div>
      
      {/* Enhanced card grid */}
      <div className="relative z-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => {
            const delay = 100 + (index * 50);
            
            return (
              <ScrollAnimationWrapper
                key={item.id}
                animation="fade-up"
                delay={delay}
                className="h-full"
              >
                <div className="group h-full flex flex-col bg-card/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-border/50 transition-all duration-500 hover:shadow-2xl hover:border-primary/30 hover:translate-y-[-4px] hover:bg-card">
                  {/* Enhanced card header */}
                  <div className={`h-2 w-full ${item.type === 'certification' ? 'bg-accent-purple' : 'bg-accent'} transition-all duration-300 group-hover:h-3`}></div>
                  
                  <div className="flex-grow p-6 sm:p-7 flex flex-col">
                    <div className="mb-5">
                      <h4 className="text-base sm:text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h4>
                      
                      {item.issuer && (
                        <div className="flex items-center text-muted-foreground text-sm mb-2 group-hover:text-foreground/80 transition-colors duration-300">
                          <Building className="w-4 h-4 mr-2 opacity-70" />
                          <span>{item.issuer}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center text-muted-foreground text-xs font-mono group-hover:text-foreground/70 transition-colors duration-300">
                        <Calendar className="w-3 h-3 mr-1.5 opacity-70" />
                        {item.date}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground/90 text-sm leading-relaxed flex-grow mb-5 group-hover:text-foreground/80 transition-colors duration-300">
                      {item.description}
                    </p>
                    
                    <div className="mt-auto flex justify-between items-center">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground backdrop-blur-sm transition-colors duration-300 group-hover:bg-muted group-hover:text-foreground">
                        {item.type === 'certification' ? (
                          <>
                            <FileCheck className="w-3.5 h-3.5 text-accent-purple" />
                            <span>Certification</span>
                          </>
                        ) : (
                          <>
                            <Award className="w-3.5 h-3.5 text-accent" />
                            <span>Achievement</span>
                          </>
                        )}
                      </div>
                      
                      {item.featured && (
                        <div className="flex items-center gap-1.5 text-xs text-primary group-hover:scale-110 transition-transform duration-300">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-medium">Featured</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            );
          })}
        </div>
        
        {/* Enhanced empty state */}
        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 mb-6 rounded-full bg-muted/50 backdrop-blur-sm flex items-center justify-center animate-pulse">
              <FileCheck className="w-10 h-10 text-muted-foreground" />
            </div>
            <h4 className="text-xl font-semibold text-foreground mb-3">No items to display</h4>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              Try changing your filter selection to see more achievements and certifications.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Achievements;
