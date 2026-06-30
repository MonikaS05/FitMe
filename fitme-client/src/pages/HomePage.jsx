// src/pages/HomePage.jsx

import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features'; 
import FeatureExplainer from '../components/FeatureExplainer';
import TailorModeSection from '../components/TailorModeSection';
import Footer from '../components/Footer';
import { ArrowUp, Sparkles } from 'lucide-react';

const HomePage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / windowHeight) * 100;
      
      setScrollProgress(progress);
      setShowScrollTop(scrolled > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Main Content with Smooth Transitions */}
      <div className="relative">
        {/* Hero Section */}
        <section className="animate-fadeIn">
          <Hero />
        </section>

        {/* Decorative Divider */}
        <div className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent dark:via-purple-900/10"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-purple-500"></div>
              <Sparkles className="text-purple-500 animate-pulse" size={24} />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-purple-500"></div>
            </div>
          </div>
        </div>

        {/* Features Section with Stagger Animation */}
        <section className="animate-fadeInUp animation-delay-200">
          <Features />
        </section>

        {/* Decorative Wave Divider */}
        <div className="relative h-24 overflow-hidden">
          <svg 
            className="absolute bottom-0 w-full h-24" 
            viewBox="0 0 1440 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" 
              className="fill-purple-50/50 dark:fill-purple-900/10"
            />
          </svg>
        </div>

        {/* Feature Explainer Section */}
        <section className="animate-fadeInUp animation-delay-400">
          <FeatureExplainer />
        </section>

        {/* Decorative Gradient Divider */}
        <div className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-amber-50/30 to-gray-50 dark:from-gray-900 dark:via-amber-900/10 dark:to-gray-900"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500"></div>
                <div className="px-4 py-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 backdrop-blur-sm border border-amber-200 dark:border-amber-500/30 rounded-full">
                  <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">For Tailors</span>
                </div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500"></div>
              </div>
              <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl">
                Join our network of talented tailors and grow your business
              </p>
            </div>
          </div>
        </div>

        {/* Tailor Mode Section */}
        <section className="animate-fadeInUp animation-delay-600">
          <TailorModeSection />
        </section>

        {/* Pre-Footer CTA Section */}
        <section className="relative py-24 overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-amber-500">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float-delayed"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full mb-6">
              <Sparkles size={16} className="text-white" />
              <span className="text-sm font-semibold text-white">Ready to Transform Your Style?</span>
            </div>

            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6"
              style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
            >
              Start Your Fashion Journey Today
            </h2>

            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of fashion enthusiasts using AI to discover their perfect style
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/signup"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-bold rounded-full text-lg shadow-2xl hover:shadow-white/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <span style={{ fontFamily: "'Poppins', sans-serif" }}>Get Started Free</span>
                <ArrowUp size={20} className="rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <a
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white/10 transition-all duration-300"
              >
                <span style={{ fontFamily: "'Poppins', sans-serif" }}>Learn More</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">No Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Instant Access</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-110 z-40 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-5deg); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default HomePage;