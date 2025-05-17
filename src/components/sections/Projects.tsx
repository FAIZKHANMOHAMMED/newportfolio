
import React, { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import SectionAnimation from '@/components/animations/SectionAnimation';
import AnimatedCard from '@/components/ui/AnimatedCard';
import AnimatedButton from '@/components/ui/AnimatedButton';
import AnimatedText from '@/components/ui/AnimatedText';
import DynamicBackground from '@/components/ui/DynamicBackground';

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  image: string;
}

const Projects = () => {
  const projects: Project[] = [
    {
      title: "CreativeAI Studio",
      description: "An advanced AI-powered content creation platform that generates high-quality blog posts, marketing copy, and social media content with customizable tone and style preferences. Features include content scheduling, SEO optimization, and multi-platform publishing.",
      tech: ["React", "TypeScript", "Node.js", "Express", "OpenAI API", "MongoDB", "Tailwind CSS", "Redux"],
      github: "https://github.com/FAIZKHANMOHAMMED/creative-ai-studio",
      demo: "https://creative-ai-studio.vercel.app",
      image: "/images/projects/creative-ai.jpg"
    },
    {
      title: "E-Commerce Analytics Dashboard",
      description: "A comprehensive analytics dashboard for e-commerce businesses that provides real-time insights into sales performance, inventory management, customer behavior, and marketing campaign effectiveness. Includes customizable widgets and exportable reports.",
      tech: ["Next.js", "TypeScript", "GraphQL", "MongoDB", "Recharts", "Tailwind CSS", "Auth0", "Stripe API"],
      github: "https://github.com/FAIZKHANMOHAMMED/ecommerce-analytics",
      demo: "https://ecommerce-analytics-dashboard.vercel.app",
      image: "/images/projects/ecommerce-dashboard.jpg"
    },
    {
      title: "CollabSpace",
      description: "A feature-rich real-time collaboration platform that combines messaging, file sharing, and project management tools. Includes video conferencing, screen sharing, kanban boards, and integrated calendar. Designed for remote teams and cross-functional collaboration.",
      tech: ["React", "Socket.io", "Express", "PostgreSQL", "Redis", "WebRTC", "Firebase", "Styled Components"],
      github: "https://github.com/FAIZKHANMOHAMMED/collab-space",
      demo: "https://collab-space.netlify.app",
      image: "/images/projects/collab-space.jpg"
    },
    {
      title: "FinTrack Pro",
      description: "A comprehensive personal finance management application that helps users track expenses, set and monitor budgets, analyze spending patterns, and plan for financial goals. Features include bank account integration, receipt scanning, and customizable reports.",
      tech: ["React Native", "TypeScript", "Firebase", "Chart.js", "Plaid API", "Redux", "Jest"],
      github: "https://github.com/FAIZKHANMOHAMMED/fintrack-pro",
      image: "/images/projects/fintrack-pro.jpg"
    },
    {
      title: "HealthHub",
      description: "A holistic health and wellness platform that combines fitness tracking, nutrition planning, and mental wellbeing features. Includes workout routines, meal planning, meditation guides, and progress tracking with detailed analytics and personalized recommendations.",
      tech: ["React", "Node.js", "MongoDB", "Express", "TensorFlow.js", "PWA", "Tailwind CSS", "Jest"],
      github: "https://github.com/FAIZKHANMOHAMMED/health-hub",
      demo: "https://health-hub-wellness.vercel.app",
      image: "/images/projects/health-hub.jpg"
    },
    {
      title: "DevPortal",
      description: "A developer-focused knowledge sharing platform with integrated documentation tools, code snippet library, and community forums. Features include syntax highlighting, version control integration, and an interactive playground for testing code examples.",
      tech: ["Vue.js", "TypeScript", "Node.js", "PostgreSQL", "GraphQL", "Docker", "Algolia", "Markdown"],
      github: "https://github.com/FAIZKHANMOHAMMED/dev-portal",
      image: "/images/projects/dev-portal.jpg"
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
    <section id="projects" className="section-container relative overflow-hidden">
      <DynamicBackground variant="gradient" intensity="medium" color="accent-purple" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-60 left-10 w-80 h-80 bg-accent-purple/30 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-pink/25 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-highlight/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <SectionAnimation animation="fade-up">
        <AnimatedText effect="gradient" as="h2" className="section-title">
          <span className="text-highlight font-mono mr-2">Some Things I've Built</span> 
        </AnimatedText>
      </SectionAnimation>
      
      <div className="space-y-32">
        {projects.map((project, index) => (
          <SectionAnimation 
            key={index}
            animation="fade-up"
            delay={200 + (index * 150)}
            threshold={0.15}
            className="relative"
          >
            <div className={`grid md:grid-cols-12 gap-6 items-center hover-lift ${
              index % 2 === 0 ? '' : 'md:text-right'
            }`}>
              {/* Project Image */}
              <div 
                className={`md:col-span-7 ${
                  index % 2 === 0 ? 'md:col-start-6' : 'md:col-start-1 order-first'
                }`}
              >
                <div
                  className="relative transform transition-all duration-1000 ease-in-out"
                  style={{
                    transform: revealed ? 'translateX(0)' : index % 2 === 0 ? 'translateX(100px)' : 'translateX(-100px)',
                    opacity: revealed ? 1 : 0,
                    transitionDelay: `${300 + (index * 200)}ms`
                  }}
                >
                  <AnimatedCard className="relative overflow-hidden rounded-xl group shadow-md hover:shadow-xl transition-all duration-500" hoverEffect="scale">
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-navy/90 to-navy/70 group-hover:from-navy/60 group-hover:to-navy/40 transition-all duration-500"></div>
                      
                      {/* Animated border on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 border-2 border-highlight/0 group-hover:border-highlight/70 rounded-xl transform scale-90 group-hover:scale-95 transition-all duration-700 ease-out"></div>
                      </div>
                      
                      {/* Overlay with project links */}
                      <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-highlight/90 text-white p-3 rounded-full hover:bg-highlight transition-all duration-300 transform hover:scale-125 hover:-translate-y-2 hover:shadow-lg hover:shadow-highlight/30"
                          aria-label={`GitHub repository for ${project.title}`}
                        >
                          <Github size={20} className="transform group-hover:animate-pulse-slow" />
                        </a>
                        {project.demo && (
                          <a 
                            href={project.demo} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-highlight/90 text-white p-3 rounded-full hover:bg-highlight transition-all duration-300 transform hover:scale-125 hover:-translate-y-2 hover:shadow-lg hover:shadow-highlight/30"
                            aria-label={`Live demo for ${project.title}`}
                          >
                            <ExternalLink size={20} className="transform group-hover:animate-pulse-slow" />
                          </a>
                        )}
                      </div>
                    </div>
                  </AnimatedCard>
                </div>
              </div>
              
              {/* Project Content */}
              <div 
                className={`md:col-span-6 relative z-10 ${
                  index % 2 === 0 ? 'md:col-start-1 md:text-left' : 'md:col-start-7 md:text-right'
                }`}
              >
                <div
                  className="transform transition-all duration-700 ease-out"
                  style={{
                    transform: revealed ? 'translateY(0)' : 'translateY(20px)',
                    opacity: revealed ? 1 : 0,
                    transitionDelay: `${200 + (index * 150)}ms`
                  }}
                >
                  <p className="font-mono text-highlight text-sm mb-2">Featured Project</p>
                  <h3 className="text-2xl font-bold text-slate-light mb-4">
                    {project.title}
                  </h3>
                </div>
                
                <div
                  className="transform transition-all duration-700 ease-out"
                  style={{
                    transform: revealed ? 'translateY(0)' : 'translateY(30px)',
                    opacity: revealed ? 1 : 0,
                    transitionDelay: `${400 + (index * 150)}ms`
                  }}
                >
                  <AnimatedCard className="bg-navy-light/70 glass-effect mb-5 p-6" hoverEffect="glow">
                    <p className="text-slate/90">{project.description}</p>
                  </AnimatedCard>
                </div>
                
                <div
                  className="transform transition-all duration-700 ease-out"
                  style={{
                    transform: revealed ? 'translateY(0)' : 'translateY(40px)',
                    opacity: revealed ? 1 : 0,
                    transitionDelay: `${500 + (index * 150)}ms`
                  }}
                >
                  <ul className={`flex flex-wrap text-xs font-mono mb-6 gap-3 text-slate ${
                    index % 2 === 0 ? '' : 'md:justify-end'
                  }`}>
                    {project.tech.map((tech, i) => (
                      <li 
                        key={i} 
                        className="bg-navy-dark px-3 py-1 rounded transform transition-all duration-500 ease-out"
                        style={{
                          opacity: revealed ? 1 : 0,
                          transform: revealed ? 'scale(1)' : 'scale(0.9)',
                          transitionDelay: `${600 + (index * 100) + (i * 50)}ms`
                        }}
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div 
                  className={`flex gap-4 ${
                    index % 2 === 0 ? '' : 'md:justify-end'
                  }`}
                  style={{
                    transform: revealed ? 'translateY(0)' : 'translateY(50px)',
                    opacity: revealed ? 1 : 0,
                    transition: 'transform 0.7s ease-out, opacity 0.7s ease-out',
                    transitionDelay: `${600 + (index * 150)}ms`
                  }}
                >
                  <AnimatedButton 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                    size="sm"
                    icon={<Github size={18} />}
                    iconPosition="left"
                    ariaLabel={`GitHub repository for ${project.title}`}
                  >
                    Code
                  </AnimatedButton>
                  
                  {project.demo && (
                    <AnimatedButton 
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="ghost"
                      size="sm"
                      icon={<ExternalLink size={18} />}
                      iconPosition="left"
                      ariaLabel={`Live demo for ${project.title}`}
                    >
                      Demo
                    </AnimatedButton>
                  )}
                </div>
              </div>
            </div>
          </SectionAnimation>
        ))}
      </div>
    </section>
  );
};

export default Projects;
