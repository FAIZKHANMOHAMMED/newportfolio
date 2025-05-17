
import React from 'react';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-navy-dark py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="mt-4 flex justify-center space-x-5 mb-6">
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
              className="text-slate hover:text-highlight transition-colors p-2 rounded-full hover:bg-navy-light transform transition-transform hover:scale-110"
            >
              <Github size={18} />
            </a>
            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className="text-slate hover:text-highlight transition-colors p-2 rounded-full hover:bg-navy-light transform transition-transform hover:scale-110"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="https://twitter.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Twitter"
              className="text-slate hover:text-highlight transition-colors p-2 rounded-full hover:bg-navy-light transform transition-transform hover:scale-110"
            >
              <Twitter size={18} />
            </a>
          </div>
          <div className="text-slate text-sm text-center">
            <p className="flex items-center justify-center mb-2">
              Designed & Built with <Heart className="h-4 w-4 mx-1 text-highlight animate-pulse" /> by Faiz Khan
            </p>
            <p>&copy; {currentYear} - All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
