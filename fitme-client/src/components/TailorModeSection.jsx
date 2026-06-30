// src/components/TailorModeSection.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, ArrowRight, Sparkles, Star, Award, TrendingUp } from 'lucide-react';
import tailorImage from '../assets/tailor-section.png';

const TailorModeSection = () => {
  const navigate = useNavigate();

  const handleFindTailor = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/login');
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-white via-purple-50/20 to-white dark:from-black dark:via-purple-950/20 dark:to-black overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-20 opacity-20">
        <Sparkles className="text-purple-500 animate-pulse" size={24} />
      </div>
      <div className="absolute bottom-10 right-20 opacity-20">
        <Star className="text-amber-500 animate-pulse" size={24} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image on the left with fancy effects */}
          <div className="relative group order-2 lg:order-1">
            {/* Glow effect behind image */}
            <div className="absolute -inset-6 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-amber-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Gradient border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 rounded-3xl opacity-0 group-hover:opacity-75 blur transition-all duration-500"></div>
            
            {/* Image container */}
            <div className="relative bg-white dark:bg-gray-800 p-3 rounded-3xl shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500">
              <img 
                src={tailorImage} 
                alt="Tailor working" 
                className="rounded-2xl w-full h-auto shadow-xl"
              />
              
              {/* Overlay gradient on hover */}
              <div className="absolute inset-3 rounded-2xl bg-gradient-to-t from-purple-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-xl font-bold text-sm flex items-center gap-2 animate-bounce">
                <Award size={16} />
                Expert Craftsmanship
              </div>
            </div>

            {/* Decorative corners */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l-4 border-b-4 border-purple-500 rounded-bl-3xl opacity-50"></div>
            <div className="absolute -top-4 -right-4 w-24 h-24 border-r-4 border-t-4 border-amber-500 rounded-tr-3xl opacity-50"></div>
          </div>

          {/* Content on the right */}
          <div className="order-1 lg:order-2">
            
            {/* Section Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 backdrop-blur-sm border border-purple-200 dark:border-purple-500/30 rounded-full mb-6">
              <Sparkles size={16} className="text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Connect & Create</span>
            </div>

            {/* Main Heading */}
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6"
              style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
            >
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">
                Your Vision,
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                Expertly Stitched.
              </span>
            </h2>
            
            {/* For Customers Card */}
            <div className="group relative mb-8">
              {/* Gradient border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
              
              <div className="relative bg-white dark:bg-gray-900 p-6 rounded-2xl border border-purple-100 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Icon with gradient background */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg shadow-purple-500/30 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Users size={28} className="text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 
                      className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      For Customers
                    </h3>
                  </div>
                </div>
                
                <p 
                  className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-6"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Find skilled local tailors, view their ratings, and place stitching orders online with ease. Upload your measurements and design references to get the perfect outfit crafted just for you.
                </p>

                {/* Stats */}
                <div className="flex gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Star size={16} className="text-amber-500 fill-amber-500" />
                    <span className="font-semibold">Verified Tailors</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <TrendingUp size={16} className="text-purple-500" />
                    <span className="font-semibold">Fast Delivery</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleFindTailor}
                  className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-full shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Find a Tailor
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* For Tailors Card */}
            <div className="group relative">
              {/* Gradient border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
              
              <div className="relative bg-white dark:bg-gray-900 p-6 rounded-2xl border border-amber-100 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Icon with gradient background */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg shadow-amber-500/30 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Briefcase size={28} className="text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 
                      className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Are You a Tailor?
                    </h3>
                  </div>
                </div>
                
                <p 
                  className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-6"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Join our network to connect with new customers and grow your business. Showcase your work and manage stitching requests through our streamlined platform.
                </p>

                {/* Stats */}
                <div className="flex gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Award size={16} className="text-amber-500" />
                    <span className="font-semibold">Build Reputation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <TrendingUp size={16} className="text-green-500" />
                    <span className="font-semibold">Grow Income</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleRegister}
                  className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-full shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Register Now
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default TailorModeSection;