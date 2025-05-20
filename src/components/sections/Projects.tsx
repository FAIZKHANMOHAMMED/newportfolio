import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Filter, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
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
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;
  
  // Get all available years and categories for filters
  const years = getAllYears();
  const categories = getAllCategories();
  
  // Filter projects based on selected filters
  const filteredProjects = projects.filter(project => {
    const yearMatch = selectedYear ? project.year === selectedYear : true;
    const categoryMatch = selectedCategory ? project.category === selectedCategory : true;
    return yearMatch && categoryMatch;
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedYear, selectedCategory]);

  // State for reveal animations
  const [revealed, setRevealed] = useState(false);

  // Reset filters
  const resetFilters = () => {
    setSelectedYear(null);
    setSelectedCategory(null);
  };
  
  // Pagination controls
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };
  
  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
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
      
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 left-10 w-80 h-80 bg-accent-purple/20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-pink/15 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-highlight/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <ScrollAnimationWrapper animation="fade-up" threshold={0.1}>
        {/* Section header */}
        <div className="text-center mb-16">
          <AnimatedText effect="gradient" as="h2" className="section-title mb-4">
            <span className="text-highlight">Featured Projects</span>
          </AnimatedText>
          <p className="text-gray-700 dark:text-slate/80 max-w-2xl mx-auto">
            A selection of my recent work, showcasing my skills and experience in building digital products and experiences.
          </p>
        </div>
        
        {/* Filter controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <AnimatedButton 
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            size="sm"
            icon={<Filter size={16} />}
            iconPosition="left"
            className="mb-4"
          >
            {showFilters ? 'Hide Filters' : 'Filter Projects'}
          </AnimatedButton>
          
          {(selectedYear || selectedCategory) && (
            <AnimatedButton 
              onClick={resetFilters}
              variant="ghost"
              size="sm"
              className="mb-4"
            >
              Clear Filters
            </AnimatedButton>
          )}
          
          {showFilters && (
            <div className="w-full max-w-3xl mx-auto bg-navy-light/70 backdrop-blur-sm p-6 rounded-lg mb-8 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-slate-light text-sm mb-3 font-medium">Filter by Year</h4>
                  <div className="flex flex-wrap gap-2">
                    {years.map(year => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                        className={`px-3 py-1 text-xs rounded-full transition-all ${selectedYear === year 
                          ? 'bg-highlight text-navy-dark font-medium' 
                          : 'bg-navy-dark/60 text-slate hover:bg-navy-dark/80'}`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-slate-light text-sm mb-3 font-medium">Filter by Category</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                        className={`px-3 py-1 text-xs rounded-full transition-all ${selectedCategory === category 
                          ? 'bg-highlight text-navy-dark font-medium' 
                          : 'bg-navy-dark/60 text-slate hover:bg-navy-dark/80'}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {(selectedYear || selectedCategory) && (
            <div className="text-center text-sm text-gray-600 dark:text-slate/60 mt-6">
              Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
              {selectedYear && ` from ${selectedYear}`}
              {selectedCategory && ` in ${selectedCategory}`}
            </div>
          )}
        </div>
      </ScrollAnimationWrapper>
      
      {/* Projects Display */}
      <div className="mt-8 mb-16">
        {filteredProjects.length > 0 ? (
          <>
            {/* Projects with alternating layout */}
            <div className="space-y-24">
              {currentProjects.map((project, index) => (
                <ScrollAnimationWrapper 
                  key={index}
                  animation="fade-up"
                  delay={200 + (index * 100)}
                  threshold={0.1}
                >
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center transition-all duration-500 hover:transform hover:scale-[1.02]`}>
                    {/* Project image */}
                    <div className="w-full md:w-3/5 relative group">
                      <div className="relative overflow-hidden rounded-xl">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full aspect-video object-cover transition-all duration-700 group-hover:scale-105 group-hover:saturate-[1.2]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-navy-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      </div>
                      
                      {/* Floating tech badges */}
                      <div className="absolute -bottom-3 left-4 right-4 flex flex-wrap justify-center gap-2">
                        {project.tech.slice(0, 5).map((tech, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1 bg-navy-dark/90 backdrop-blur-sm text-white text-xs rounded-full shadow-lg transform translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                            style={{ transitionDelay: `${100 + (i * 50)}ms` }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Project content */}
                    <div className="w-full md:w-2/5">
                      <div className={`text-left ${index % 2 !== 0 ? 'md:text-right' : ''}`}>
                        <p className="text-highlight text-sm mb-2 transition-all duration-300 group-hover:text-accent-purple">{project.category}</p>
                        <h3 className="text-2xl font-bold text-slate-light dark:text-white mb-4 transition-all duration-300 group-hover:text-highlight">
                          {project.title}
                        </h3>
                        
                        <div className="bg-white/90 dark:bg-navy-light/40 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-6 transition-all duration-500 hover:shadow-xl hover:bg-gray-50 dark:hover:bg-navy-light/50 border border-gray-100 dark:border-transparent">
                          <p className="text-gray-700 dark:text-slate/90">
                            {project.description}
                          </p>
                        </div>
                        
                        <div className={`flex gap-4 ${index % 2 !== 0 ? 'md:justify-end' : ''}`}>
                          <AnimatedButton 
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline"
                            size="sm"
                            icon={<Github size={16} />}
                            iconPosition="left"
                          >
                            Code
                          </AnimatedButton>
                          
                          {project.demo && (
                            <AnimatedButton 
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              variant="primary"
                              size="sm"
                              icon={<ExternalLink size={16} />}
                              iconPosition="left"
                            >
                              Live Demo
                            </AnimatedButton>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollAnimationWrapper>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-16">
                {/* Previous button */}
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-md bg-gray-100 dark:bg-navy-light/30 text-gray-700 dark:text-slate-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-gray-200 dark:hover:bg-navy-light/50 hover:shadow-md active:scale-95 border border-gray-200 dark:border-transparent"
                >
                  <ChevronLeft size={18} />
                </button>
                
                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={`w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${currentPage === number ? 'bg-highlight text-gray-800 font-medium' : 'bg-gray-100 dark:bg-navy-light/30 text-gray-700 dark:text-slate-light hover:bg-gray-200 dark:hover:bg-navy-light/50 border border-gray-200 dark:border-transparent'}`}
                  >
                    {number}
                  </button>
                ))}
                
                {/* Next button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-md bg-gray-100 dark:bg-navy-light/30 text-gray-700 dark:text-slate-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-gray-200 dark:hover:bg-navy-light/50 hover:shadow-md active:scale-95 border border-gray-200 dark:border-transparent"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
            
            {/* Projects count */}
            <div className="text-center text-sm text-gray-600 dark:text-slate/60 mt-6">
              Showing {indexOfFirstProject + 1}-{Math.min(indexOfLastProject, filteredProjects.length)} of {filteredProjects.length} projects
              {selectedYear && ` from ${selectedYear}`}
              {selectedCategory && ` in ${selectedCategory}`}
            </div>
          </>
        ) : (
          <ScrollAnimationWrapper animation="fade-up">
            <div className="text-center py-16 bg-white/80 dark:bg-navy-light/30 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-slate/10 shadow-md">
              <p className="text-gray-600 dark:text-slate/70 mb-4">No projects match your current filters.</p>
              <AnimatedButton 
                onClick={resetFilters}
                variant="outline"
                size="sm"
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
