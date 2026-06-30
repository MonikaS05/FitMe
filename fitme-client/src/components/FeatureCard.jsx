// client/src/components/FeatureCard.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="group relative h-full">
      {/* Animated gradient border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
      
      {/* Main Card */}
      <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl border border-purple-100 dark:border-gray-700 h-full flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
        
        {/* Decorative corner gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Icon Section with Gradient Background */}
        <div className="relative mb-6 w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
          {/* Icon with white color */}
          {React.cloneElement(icon, {
            className: "w-8 h-8 text-white",
            strokeWidth: 2.5
          })}
          
          {/* Sparkle effect */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
        </div>

        {/* Title with fancy font */}
        <h3 
          className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3 group-hover:from-purple-600 group-hover:to-pink-600 dark:group-hover:from-purple-400 dark:group-hover:to-pink-400 transition-all duration-300"
          style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
        >
          {title}
        </h3>
        
        {/* Description */}
        <p 
          className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6 flex-grow"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {description}
        </p>
        
        {/* Arrow Button with Gradient */}
        <div className="flex items-center justify-between pt-4 border-t border-purple-100 dark:border-gray-700">
          <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Learn More
          </span>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 shadow-md group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
            <ArrowRight 
              size={18} 
              className="text-white transform group-hover:translate-x-1 transition-transform duration-300" 
              strokeWidth={2.5}
            />
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
    </div>
  );
};

export default FeatureCard;