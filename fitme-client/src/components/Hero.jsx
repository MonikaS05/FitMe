// src/components/Hero.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import HeroImage from '../assets/hero-background.jpg';

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Animated Background Image with Parallax Effect */}
      <div className="absolute top-0 left-0 w-full h-full">
        <img 
          src={HeroImage} 
          alt="Fashion background" 
          className="absolute top-0 left-0 w-full h-full object-cover scale-110 animate-slow-zoom" 
        />
        
        {/* Gradient Overlay - Multiple layers for depth */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/70 via-gray-900/60 to-amber-900/70"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>

      {/* Animated Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-float-delayed"></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center text-white px-4">
        
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full animate-fade-in">
          <Sparkles size={16} className="text-amber-400" />
          <span className="text-sm font-semibold">AI-Powered Fashion Assistant</span>
        </div>

        {/* Main Heading with Gradient */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-6 animate-slide-up">
          <span className="block bg-gradient-to-r from-white via-purple-200 to-amber-200 bg-clip-text text-transparent">
            Stitch Smart.
          </span>
          <span className="block bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
            Dress Smarter.
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10 max-w-3xl leading-relaxed animate-slide-up-delayed" style={{ fontFamily: "'Inter', sans-serif" }}>
          Your personal guide to <span className="text-purple-300 font-semibold">perfect fitting</span> and <span className="text-amber-300 font-semibold">style</span>, from fabric estimation to virtual trials.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up-more-delayed">
          <button 
            onClick={handleGetStarted}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold rounded-full text-lg shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <a 
            href="#features"
            className="group px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white/30 hover:border-white/50 text-white font-bold rounded-full text-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <span className="flex items-center gap-2">
              Explore Features
              <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
            </span>
          </a>
        </div>

        {/* Stats or Features */}
        <div className="absolute bottom-10 left-0 right-0 flex flex-wrap justify-center gap-8 px-4 animate-fade-in-delayed">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-300">1</div>
            <div className="text-sm text-gray-300">Happy Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-300">5</div>
            <div className="text-sm text-gray-300">Perfect Fits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-300">AI-Powered</div>
            <div className="text-sm text-gray-300">Smart Sizing</div>
          </div>
        </div>
      </div>

      {/* Custom Animations - Add to your CSS file */}
      <style jsx>{`
        @keyframes slow-zoom {
          0%, 100% { transform: scale(1.1); }
          50% { transform: scale(1.15); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delayed {
          animation: fade-in 1.5s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-slide-up-delayed {
          animation: slide-up 1s ease-out;
        }

        .animate-slide-up-more-delayed {
          animation: slide-up 1.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Hero;