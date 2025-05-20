
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, FileText, Home, User, Code, Briefcase, Layers, GraduationCap, Award, Mail } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import AnimatedButton from '@/components/ui/AnimatedButton';
import AnimatedText from '@/components/ui/AnimatedText';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navItems = [
    { name: 'About', to: 'about' },
    { name: 'Projects', to: 'projects' },
    { name: 'Skills', to: 'skills' },
    { name: 'Experience', to: 'experience' },
    { name: 'Education', to: 'education' },
    { name: 'Achievements', to: 'achievements' },
    { name: 'Contact', to: 'contact' },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Map icons to nav items
  const navIcons = {
    'about': <User size={16} />,
    'projects': <Code size={16} />,
    'skills': <Layers size={16} />,
    'experience': <Briefcase size={16} />,
    'education': <GraduationCap size={16} />,
    'achievements': <Award size={16} />,
    'contact': <Mail size={16} />
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-background/90 backdrop-blur-md shadow-lg py-4' : 'py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <Link
          to="home"
          spy={true}
          smooth={true}
          duration={500}
          className="text-accent text-2xl font-mono cursor-pointer relative group"
        >
          <AnimatedText effect="gradient" className="font-bold">
            FK
          </AnimatedText>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
        </Link>

        {/* Theme Toggle + Mobile Menu Button */}
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          
          <button 
            className="md:hidden text-foreground p-2 rounded-md hover:bg-muted/50 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <ol className="flex space-x-1">
            {navItems.map((item, i) => (
              <li key={i} className="relative overflow-hidden">
                <Link
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  activeClass="nav-active"
                  className="nav-link text-sm group flex items-center"
                  hashSpy={true}
                  spyThrottle={500}
                >
                  <span className="text-accent font-mono mr-1 transition-transform duration-300 group-hover:translate-y-[-2px]"></span>
                  <span className="relative">
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
                  </span>
                  <span className="ml-1 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    {navIcons[item.to]}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <AnimatedButton
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="sm"
            className="ml-4 font-mono"
            icon={<FileText className="h-4 w-4" />}
            iconPosition="left"
          >
            Resume
          </AnimatedButton>
        </nav>

        {/* Mobile Navigation */}
        <div className={`md:hidden fixed inset-0 top-[72px] bg-background/95 backdrop-blur-lg z-50 flex flex-col justify-center items-center transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <nav className="w-full px-12">
            <ol className="flex flex-col space-y-6 items-center">
              {navItems.map((item, i) => (
                <li 
                  key={i} 
                  className={`w-full text-center transition-all duration-300 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{
                    transitionDelay: menuOpen ? `${0.1 + i * 0.05}s` : '0s'
                  }}
                >
                  <Link
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    activeClass="nav-active"
                    className="nav-link text-lg inline-flex items-center justify-center py-2 group"
                    onClick={toggleMenu}
                  >
                    <span className="text-accent font-mono mr-2 transition-transform duration-300 group-hover:translate-y-[-2px]">0{i + 1}.</span>
                    {item.name}
                    <span className="ml-2 opacity-0 scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                      {navIcons[item.to]}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
            <div 
              className={`flex justify-center mt-10 transition-all duration-500 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{
                transitionDelay: menuOpen ? `${0.1 + navItems.length * 0.05}s` : '0s'
              }}
            >
              <AnimatedButton
                href="https://drive.usercontent.google.com/download?id=1storNG1n_KnqKV6MWRlXmOrJcL_fRevj"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="md"
                className="font-mono"
                icon={<FileText className="h-4 w-4" />}
                iconPosition="left"
              >
                Resume
              </AnimatedButton>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
