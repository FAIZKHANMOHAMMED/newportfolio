import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme based on user preference or system setting
  useEffect(() => {
    const isDark = 
      localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && 
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDarkMode(isDark);
    updateTheme(isDark);
  }, []);

  // Update theme in DOM and localStorage
  const updateTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    updateTheme(!isDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-muted/30 hover:bg-muted/50 transition-all duration-300 hover:scale-110 active:scale-90"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div
        className={`relative w-6 h-6 transition-transform duration-300 ${isDarkMode ? 'rotate-45' : 'rotate-0'}`}
      >
        {isDarkMode ? (
          <Moon className="absolute inset-0 text-highlight transition-all" />
        ) : (
          <Sun className="absolute inset-0 text-highlight transition-all" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
