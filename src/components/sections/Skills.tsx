
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, Code, Database, Server, Terminal, Layout, Palette, Lightbulb, Cpu, Cloud } from 'lucide-react';
import ScrollAnimationWrapper from '@/components/animations/ScrollAnimationWrapper';
import AnimatedCard from '@/components/ui/AnimatedCard';
import AnimatedText from '@/components/ui/AnimatedText';
import DynamicBackground from '@/components/ui/DynamicBackground';
import { skillCategories } from '@/data/Skills';

// Function to map icon string to actual icon component
const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.ElementType> = {
    Layout,
    Server,
    Database,
    Terminal,
    Code,
    Palette,
    Lightbulb,
    Cpu,
    Cloud
  };
  
  return iconMap[iconName] || Layout; // Default to Layout if icon not found
};

const Skills = () => {
  return (
    <section id="skills" className="section-container relative overflow-hidden">
      <DynamicBackground variant="dots" intensity="light" color="accent-purple" />
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-accent-purple/30 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-40 left-20 w-72 h-72 bg-accent-blue/25 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-20 w-64 h-64 bg-highlight/15 rounded-full filter blur-3xl"></div>
      </div>
      
      <ScrollAnimationWrapper animation="fade-up">
        <AnimatedText effect="gradient" as="h2" className="section-title">
          <span className="text-highlight font-mono mr-2">Skills</span> 
        </AnimatedText>
      </ScrollAnimationWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {skillCategories.map((category, index) => {
          const Icon = getIconComponent(category.icon);
          return (
            <ScrollAnimationWrapper 
              key={category.id} 
              animation="fade-up" 
              delay={200 + (index * 100)}
            >
              <div className="h-full">
                <AnimatedCard className="h-full p-6 glass-effect group" hoverEffect="lift">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-6 group-hover:translate-y-[-2px] transition-transform duration-300">
                      <div className="p-3 rounded-lg bg-accent/10 mr-3 group-hover:bg-accent/20 group-hover:shadow-md group-hover:shadow-accent/10 transition-all duration-300 transform group-hover:scale-110">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="text-xl font-semibold relative overflow-hidden group-hover:text-accent transition-colors duration-300">
                        {category.name}
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent/70 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></span>
                      </h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge 
                          key={skill} 
                          variant="outline" 
                          className="bg-background/60 border-accent/20 text-muted-foreground px-3 py-1.5 flex items-center gap-1.5 hover:bg-accent/10 transition-all duration-300 ease-out transform group-hover:border-accent/40 cursor-default"
                        >
                          <Check className="h-3 w-3 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span className="relative overflow-hidden hover:text-accent transition-colors duration-300 group-hover:font-medium">
                            {skill}
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent/50 transform scale-x-0 hover:scale-x-100 transition-transform origin-left duration-300"></span>
                          </span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            </ScrollAnimationWrapper>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
