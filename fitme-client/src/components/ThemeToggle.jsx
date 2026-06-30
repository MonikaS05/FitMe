// src/components/ThemeToggle.jsx

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="group relative p-3 rounded-full bg-purple-50 dark:bg-gray-800 shadow-lg hover:shadow-xl border border-purple-100 dark:border-gray-700 transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label="Toggle theme"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-amber-500 opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30 blur transition-opacity duration-300"></div>
      
      {/* Icon with perfect colors for both modes */}
      {theme === 'light' ? (
        <Moon 
          size={20} 
          className="relative text-purple-600 dark:text-purple-400 transition-transform duration-300 group-hover:rotate-12" 
        />
      ) : (
        <Sun 
          size={20} 
          className="relative text-amber-500 dark:text-amber-400 transition-transform duration-300 group-hover:rotate-90" 
        />
      )}
    </button>
  );
};

export default ThemeToggle;