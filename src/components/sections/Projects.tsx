import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';
import ScrollAnimationWrapper from '@/components/animations/ScrollAnimationWrapper';
import AnimatedCard from '@/components/ui/AnimatedCard';
import AnimatedButton from '@/components/ui/AnimatedButton';
import AnimatedText from '@/components/ui/AnimatedText';
import DynamicBackground from '@/components/ui/DynamicBackground';
import { projects, getAllYears, getAllCategories } from '@/data/Projects';

const Projects = () => {
  // State for filters
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get all available years and categories for filters
  const years = getAllYears();
  const categories = getAllCategories();
  
  // Filter projects based on selected filters
  const filteredProjects = projects.filter(project => {
    const yearMatch = selectedYear ? project.year === selectedYear : true;
    const categoryMatch = selectedCategory ? project.category === selectedCategory : true;
    return yearMatch && categoryMatch;
  });

  // State for reveal animations
  const [revealed, setRevealed] = useState(false);

  // Reset filters
  const resetFilters = () => {
    setSelectedYear(null);
    setSelectedCategory(null);
  };
  
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
      
      <ScrollAnimationWrapper animation="fade-up" threshold={0.1}>
        <AnimatedText effect="gradient" as="h2" className="section-title">
          <span className="text-highlight font-mono mr-2">Some Things I've Built</span> 
        </AnimatedText>
        
        <div className="flex flex-col items-center justify-center mt-8 mb-12">
          <AnimatedButton 
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            size="sm"
            icon={<Filter size={16} />}
            iconPosition="left"
            className="mb-4"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </AnimatedButton>
          
          {showFilters && (
            <div className="bg-navy-light/70 glass-effect p-6 rounded-lg w-full max-w-2xl mx-auto mb-4 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-slate-light text-sm mb-2 font-medium">Filter by Year</h4>
                  <div className="flex flex-wrap gap-2">
                    {years.map(year => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                        className={`px-3 py-1 text-xs rounded-full transition-all ${selectedYear === year 
                          ? 'bg-highlight text-navy-dark font-medium' 
                          : 'bg-navy-dark text-slate hover:bg-navy-dark/80'}`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-slate-light text-sm mb-2 font-medium">Filter by Category</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                        className={`px-3 py-1 text-xs rounded-full transition-all ${selectedCategory === category 
                          ? 'bg-highlight text-navy-dark font-medium' 
                          : 'bg-navy-dark text-slate hover:bg-navy-dark/80'}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {(selectedYear || selectedCategory) && (
                <button
                  onClick={resetFilters}
                  className="mt-4 text-xs text-highlight hover:text-highlight/80 underline underline-offset-2"
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}
          
          <div className="text-sm text-slate/70">
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            {selectedYear && ` from ${selectedYear}`}
            {selectedCategory && ` in ${selectedCategory}`}
          </div>
        </div>
      </ScrollAnimationWrapper>
      
      <div className="space-y-32">
        {filteredProjects.length > 0 ? filteredProjects.map((project, index) => (
          <ScrollAnimationWrapper 
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
                <ScrollAnimationWrapper
                  animation={index % 2 === 0 ? 'fade-left' : 'fade-right'}
                  delay={300 + (index * 200)}
                >
                  <AnimatedCard className="relative overflow-hidden rounded-xl group shadow-md hover:shadow-xl transition-all duration-500" hoverEffect="scale">
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-navy/90 to-navy/70 group-hover:from-transparent group-hover:to-transparent transition-all duration-500"></div>
                      
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
                </ScrollAnimationWrapper>
              </div>
              
              {/* Project Content */}
              <div 
                className={`md:col-span-6 relative z-10 ${
                  index % 2 === 0 ? 'md:col-start-1 md:text-left' : 'md:col-start-7 md:text-right'
                }`}
              >
                <ScrollAnimationWrapper
                  animation="fade-up"
                  delay={200 + (index * 150)}
                >
                  <p className="font-mono text-highlight text-sm mb-2">Featured Project</p>
                  <h3 className="text-2xl font-bold text-slate-light mb-4">
                    {project.title}
                  </h3>
                </ScrollAnimationWrapper>
                
                <ScrollAnimationWrapper
                  animation="fade-up"
                  delay={400 + (index * 150)}
                >
                  <AnimatedCard className="bg-navy-light/70 glass-effect mb-5 p-6" hoverEffect="glow">
                    <p className="text-slate/90">{project.description}</p>
                  </AnimatedCard>
                </ScrollAnimationWrapper>
                
                <ScrollAnimationWrapper
                  animation="fade-up"
                  delay={500 + (index * 150)}
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
                </ScrollAnimationWrapper>
                
                <ScrollAnimationWrapper
                  animation="fade-up"
                  delay={600 + (index * 150)}
                  className={`flex gap-4 ${
                    index % 2 === 0 ? '' : 'md:justify-end'
                  }`}
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
                </ScrollAnimationWrapper>
              </div>
            </div>
          </ScrollAnimationWrapper>
        )) : (
          <ScrollAnimationWrapper animation="fade-up">
            <div className="text-center py-16">
              <p className="text-slate/70">No projects match your current filters.</p>
              <AnimatedButton 
                onClick={resetFilters}
                variant="outline"
                size="sm"
                className="mt-4"
              >
                Reset Filters
              </AnimatedButton>
            </div>
          </ScrollAnimationWrapper>
        )}
      </div>
    </section>
  );
};

export default Projects;
