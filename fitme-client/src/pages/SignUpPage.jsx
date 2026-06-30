// src/pages/SignUpPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Briefcase, Sparkles, ArrowRight } from 'lucide-react';

const SignUpPage = () => {
  return (
    <div className="relative pt-24 pb-12 bg-gradient-to-b from-gray-50 via-purple-50/30 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen flex items-center overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      
      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 backdrop-blur-sm border border-purple-200 dark:border-purple-500/30 rounded-full mb-6">
          <Sparkles size={16} className="text-purple-600 dark:text-purple-400" />
          <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Start Your Journey</span>
        </div>

        {/* Title with Gradient */}
        <h1 
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4"
          style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
        >
          <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">
            Join FitMe
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Choose your account type to get started and experience the <span className="text-purple-600 dark:text-purple-400 font-semibold">future of fashion</span>
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          
          {/* Customer Card */}
          <Link 
            to="/register-customer" 
            className="group relative block p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            {/* Gradient border effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 rounded-3xl opacity-0 group-hover:opacity-75 blur transition-all duration-500"></div>
            
            {/* Card content */}
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 transform group-hover:scale-[1.02] transition-all duration-500">
              
              {/* Icon with gradient background */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 shadow-xl shadow-purple-500/30 mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <User size={32} className="text-white" strokeWidth={2.5} />
              </div>

              {/* Title */}
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
              >
                I'm a Customer
              </h2>

              {/* Description */}
              <p 
                className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Sign up to get outfit recommendations, estimate fabric, and use the virtual trial room.
              </p>

              {/* Arrow icon */}
              <div className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold group-hover:gap-3 transition-all duration-300">
                <span>Get Started</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Decorative sparkle */}
              <div className="absolute top-4 right-4">
                <Sparkles className="text-purple-400 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500" size={20} />
              </div>
            </div>

            {/* Glow effect behind card */}
            <div className="absolute -inset-4 bg-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
          </Link>

          {/* Tailor Card */}
          <Link 
            to="/register-tailor" 
            className="group relative block p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            {/* Gradient border effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-75 blur transition-all duration-500"></div>
            
            {/* Card content */}
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 transform group-hover:scale-[1.02] transition-all duration-500">
              
              {/* Icon with gradient background */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-pink-500 shadow-xl shadow-amber-500/30 mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Briefcase size={32} className="text-white" strokeWidth={2.5} />
              </div>

              {/* Title */}
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
              >
                I'm a Tailor
              </h2>

              {/* Description */}
              <p 
                className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Sign up to grow your business, showcase your skills, and connect with new clients.
              </p>

              {/* Arrow icon */}
              <div className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold group-hover:gap-3 transition-all duration-300">
                <span>Get Started</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Decorative sparkle */}
              <div className="absolute top-4 right-4">
                <Sparkles className="text-amber-400 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500" size={20} />
              </div>
            </div>

            {/* Glow effect behind card */}
            <div className="absolute -inset-4 bg-amber-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
          </Link>

        </div>

        {/* Decorative bottom element */}
        <div className="mt-16 flex justify-center">
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 rounded-full"></div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SignUpPage;