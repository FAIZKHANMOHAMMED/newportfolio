import React, { useState, useEffect, useRef } from 'react';
import { Cpu, BookOpen, Bookmark, BarChart } from 'lucide-react';
import ScrollAnimationWrapper from '@/components/animations/ScrollAnimationWrapper';
import AnimatedText from '@/components/ui/AnimatedText';
import AnimatedCard from '@/components/ui/AnimatedCard';
import DynamicBackground from '@/components/ui/DynamicBackground';
import { skillCategories } from '@/data/Skills';
import {
  Code, Database, Server, Terminal, Layout, Palette, Lightbulb, Cpu as CpuIcon, Cloud, Star, BarChart3,
  Sparkles, Layers, Zap, Hexagon, CircleOff, CircleDot, Award, Gauge, Braces, Globe, Laptop, Workflow,
  Atom, BarChart as BarIcon, Bookmark as BookmarkIcon, BookOpen as BookOpenIcon, Monitor
} from 'lucide-react';

import '@/styles/animations.css';

const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.ElementType> = {
    Layout, Server, Database, Terminal, Code, Palette, Lightbulb, Cpu: CpuIcon, Cloud, Star,
    BarChart3, Sparkles, Layers, Zap, Hexagon, CircleOff, CircleDot, Award, Gauge,
    Braces, Globe, Laptop, Workflow, Atom, BarChart: BarIcon, Bookmark: BookmarkIcon,
    BookOpen: BookOpenIcon, Monitor,
  };
  return iconMap[iconName] || Layout;
};

const getSkillIcon = (skill: string): React.ElementType => {
  const skillIconMap: Record<string, React.ElementType> = {
    React: Atom, TypeScript: Code, "Next.js": Globe, Redux: Workflow, HTML5: Code,
    "CSS3/SCSS": Palette, TailwindCSS: Palette, "Material UI": Layout,
    "Framer Motion": Sparkles, "Responsive Design": Layout, SPA: Laptop, PWA: Globe,
    "Node.js": Server, Express: Server, NestJS: Server, Django: Server, Flask: Server,
    "RESTful APIs": Workflow, GraphQL: Hexagon, WebSockets: Zap, Microservices: Layers,
    "API Gateway": Workflow, Authentication: CircleDot,
    MongoDB: Database, PostgreSQL: Database, MySQL: Database, Redis: Database,
    Firebase: Database, Supabase: Database, "Prisma ORM": Database, TypeORM: Database,
    SQL: Database, NoSQL: Database, "Data Modeling": Database,
    Git: Braces, "GitHub Actions": Workflow, Docker: Layers, Kubernetes: Layers,
    "CI/CD": Workflow, AWS: Cloud, Azure: Cloud, Vercel: Globe, Netlify: Globe,
    Linux: Terminal, "Shell Scripting": Terminal,
    JavaScript: Code, Python: Code, Java: Code, "C++": Code, Bash: Terminal,
    PHP: Code, Go: Code, Rust: Code, "C#": Code,
    Figma: Palette, "Adobe XD": Palette, Sketch: Palette, Wireframing: Layout,
    Prototyping: Layout, "User Research": Lightbulb, Accessibility: CircleDot,
    "Color Theory": Palette, Typography: Palette,
    "Google Cloud": Cloud, Serverless: Cloud, Lambda: Cloud, S3: Cloud, EC2: Cloud,
    RDS: Database, DynamoDB: Database, Heroku: Cloud,
  };
  return skillIconMap[skill] || Globe;
};

const getSkillProficiency = (skill: string): number => {
  const hash = skill.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return Math.max(70, Math.min(98, (hash % 30) + 70));
};

const getCardGradient = (skill: string): string => {
  const skillGradientMap: Record<string, string> = {
    React: 'from-teal-400 to-teal-500', TypeScript: 'from-orange-400 to-orange-500',
    "Next.js": 'from-blue-400 to-blue-500', Redux: 'from-pink-400 to-pink-500',
    HTML5: 'from-teal-400 to-teal-500', "CSS3/SCSS": 'from-blue-400 to-blue-500',
    TailwindCSS: 'from-orange-400 to-orange-500', "Material UI": 'from-orange-400 to-orange-500',
    "Framer Motion": 'from-blue-400 to-blue-500', "Responsive Design": 'from-cyan-400 to-cyan-500',
    SPA: 'from-orange-400 to-orange-500', PWA: 'from-teal-700 to-teal-800'
  };
  const defaultGradients = [
    'from-purple-500 to-purple-600', 'from-blue-500 to-blue-600',
    'from-cyan-500 to-cyan-600', 'from-teal-500 to-teal-600',
    'from-orange-500 to-orange-600', 'from-pink-500 to-pink-600'
  ];
  const hash = skill.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return skillGradientMap[skill] || defaultGradients[hash % defaultGradients.length];
};

const getAnimationDelay = (index: number) => {
  return { animationDelay: `${index * 0.05}s` };
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const toggleSkillExpansion = (skill: string) => {
    setExpandedSkill(expandedSkill === skill ? null : skill);
  };

  return (
    <section id="skills" className="section-container relative overflow-hidden py-24 min-h-screen">
      <DynamicBackground variant="dots" intensity="light" color="accent-teal" />
      <div className="pt-16">
        <ScrollAnimationWrapper animation="fade-up">
          <AnimatedText effect="gradient" as="h2" className="section-title mb-4">
            <span className="text-highlight">My Technical Skills</span>
          </AnimatedText>
          <p className="text-gray-700 dark:text-slate/80 max-w-2xl mx-auto">
            Expertise across various technologies and frameworks that I've mastered over the years.
          </p>
        </ScrollAnimationWrapper>
      </div>

      <ScrollAnimationWrapper animation="fade-up" delay={200}>
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12">
          <div className="md:w-1/4 lg:w-1/5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-2 mb-4 md:mb-0">
            {skillCategories.map((category) => {
              const isActive = activeCategory === category.id;
              const Icon = getIconComponent(category.icon);
              return (
                <button
                  key={category.id}
                  className={`flex items-center justify-between px-2 sm:px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-highlight text-navy-dark' : 'bg-navy-dark/60 text-slate hover:bg-navy-dark/80'} w-full`}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setExpandedSkill(null);
                  }}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                    <span className="font-medium text-xs sm:text-sm md:text-base">{category.name}</span>
                  </div>
                  <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ml-1.5 sm:ml-2 md:ml-0 ${isActive ? 'bg-navy-dark/50 text-white' : 'bg-navy-dark/80 text-slate'}`}>{category.skills.length}</span>
                </button>
              );
            })}
          </div>

          <div className="md:w-3/4 lg:w-4/5 fade-in-transition">
            {skillCategories.map(category => {
              if (category.id !== activeCategory) return null;
              return (
                <div key={category.id}>
                  <div className="flex items-center mb-6">
                    <div className="bg-highlight/20 p-2 rounded-lg mr-3">
                      {React.createElement(getIconComponent(category.icon), { className: "h-6 w-6 text-highlight" })}
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">{category.name}</h2>
                    <div className="ml-auto text-sm text-muted-foreground">{category.skills.length} skills</div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
                    {category.skills.map((skill, index) => {
                      const isExpanded = expandedSkill === skill;
                      return (
                        <div
                          key={index}
                          className="skill-card bg-card hover:bg-card/90 rounded-lg shadow-md transition-all duration-300 flex items-center"
                          style={{
                            ...getAnimationDelay(index),
                            background: getCardGradient(skill),
                            borderRadius: '12px',
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                            minHeight: '60px',
                            padding: '0.5rem',
                            width: '100%'
                          }}
                          onClick={() => toggleSkillExpansion(skill)}
                        >
                          <div className="bg-primary/10 rounded-full p-1.5 mr-1.5 flex-shrink-0">
                            {React.createElement(getSkillIcon(skill), {
                              className: "skill-icon h-5 w-5 text-primary"
                            })}
                          </div>
                          <h3 className="font-medium text-foreground text-xs sm:text-sm md:text-base flex-1 break-words">
                            {skill}
                          </h3>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollAnimationWrapper>
    </section>
  );
};

export default Skills;


