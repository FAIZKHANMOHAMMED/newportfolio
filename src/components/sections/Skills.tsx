
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, Code, Database, Server, Terminal, Layout, Palette, Lightbulb, Cpu, Cloud } from 'lucide-react';
import SectionAnimation from '@/components/animations/SectionAnimation';
import AnimatedCard from '@/components/ui/AnimatedCard';
import AnimatedText from '@/components/ui/AnimatedText';
import DynamicBackground from '@/components/ui/DynamicBackground';

interface SkillCategory {
  name: string;
  icon: React.ElementType;
  skills: string[];
}

const Skills = () => {
  const categories: SkillCategory[] = [
    {
      name: "Frontend Development",
      icon: Layout,
      skills: ["React", "TypeScript", "Next.js", "Redux", "HTML5", "CSS3/SCSS", "TailwindCSS", "Material UI", "Framer Motion", "Responsive Design", "SPA", "PWA"]
    },
    {
      name: "Backend Development",
      icon: Server,
      skills: ["Node.js", "Express", "NestJS", "Django", "Flask", "RESTful APIs", "GraphQL", "WebSockets", "Microservices", "API Gateway", "Authentication"]
    },
    {
      name: "Databases & Storage",
      icon: Database,
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "Supabase", "Prisma ORM", "TypeORM", "SQL", "NoSQL", "Data Modeling"]
    },
    {
      name: "DevOps & Deployment",
      icon: Terminal,
      skills: ["Git", "GitHub Actions", "Docker", "Kubernetes", "CI/CD", "AWS", "Azure", "Vercel", "Netlify", "Linux", "Shell Scripting"]
    },
    {
      name: "Programming Languages",
      icon: Code,
      skills: ["JavaScript", "TypeScript", "Python", "Java", "C++", "Bash", "PHP", "Go", "Rust", "C#"]
    },
    {
      name: "UI/UX Design",
      icon: Palette,
      skills: ["Figma", "Adobe XD", "Sketch", "Wireframing", "Prototyping", "User Research", "Accessibility", "Color Theory", "Typography"]
    },
    {
      name: "Testing & Quality",
      icon: Lightbulb,
      skills: ["Jest", "React Testing Library", "Cypress", "Selenium", "TDD", "BDD", "Unit Testing", "Integration Testing", "E2E Testing"]
    },
    {
      name: "Cloud Services",
      icon: Cloud,
      skills: ["AWS", "Azure", "Google Cloud", "Firebase", "Serverless", "Lambda", "S3", "EC2", "RDS", "DynamoDB"]
    },
    {
      name: "Performance & Optimization",
      icon: Cpu,
      skills: ["Web Vitals", "Lighthouse", "Webpack", "Vite", "Code Splitting", "Lazy Loading", "Caching Strategies", "Memory Management", "SEO"]
    }
  ];
  
  // State for reveal animations
  const [revealed, setRevealed] = useState(false);
  
  // Trigger reveal animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="skills" className="section-container relative overflow-hidden">
      <DynamicBackground variant="dots" intensity="light" color="accent-teal" />
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-20 right-40 w-96 h-96 bg-accent-teal/30 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent-orange/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-accent-purple/15 rounded-full filter blur-3xl"></div>
      </div>
      
      <SectionAnimation animation="fade-up">
        <AnimatedText effect="gradient" as="h2" className="section-title">
          <span className="text-accent font-mono mr-2">Skills & Expertise</span> 
        </AnimatedText>
      </SectionAnimation>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-between max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <SectionAnimation
            key={category.name}
            animation="fade-up"
            delay={200 + (index * 100)}
            threshold={0.1}
          >
            <div
              style={{
                transform: revealed ? 'translateY(0)' : 'translateY(40px)',
                opacity: revealed ? 1 : 0,
                transition: 'transform 0.7s ease-out, opacity 0.7s ease-out',
                transitionDelay: `${200 + (index * 150)}ms`
              }}
              className="h-full"
            >
              <AnimatedCard className="h-full p-6 glass-effect group" hoverEffect="lift">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-6 group-hover:translate-y-[-2px] transition-transform duration-300">
                    <div className="p-3 rounded-lg bg-accent/10 mr-3 group-hover:bg-accent/20 group-hover:shadow-md group-hover:shadow-accent/10 transition-all duration-300 transform group-hover:scale-110">
                      {React.createElement(category.icon, { className: "h-6 w-6 text-accent" })}
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
                        style={{
                          opacity: revealed ? 1 : 0,
                          transform: revealed ? 'scale(1)' : 'scale(0.8)',
                          transitionDelay: `${300 + (index * 100) + (skillIndex * 50)}ms`
                        }}
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
          </SectionAnimation>
        ))}
      </div>
    </section>
  );
};

export default Skills;
