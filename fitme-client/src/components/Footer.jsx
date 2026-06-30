// src/components/Footer.jsx

import React from 'react';
import { Twitter, Instagram, Facebook, Mail, MapPin, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-black dark:from-black dark:via-gray-900 dark:to-black text-white overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500"></div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Branding Section */}
          <div className="text-center md:text-left">
            {/* Logo with Gradient */}
            <Link to="/" className="inline-block group">
              <h3 
                className="text-4xl font-bold tracking-wide mb-3"
                style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
              >
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-amber-300 transition-all duration-300">
                  Fit
                </span>
                <span 
                  className="bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent group-hover:from-amber-300 group-hover:via-rose-300 group-hover:to-purple-300 transition-all duration-300"
                  style={{ fontFamily: "'Dancing Script', 'Pacifico', cursive" }}
                >
                  Me
                </span>
              </h3>
            </Link>
            
            <p 
              className="text-gray-400 mb-6 leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="text-purple-400 font-semibold">Stitch Smart.</span><br />
              <span className="text-amber-400 font-semibold">Dress Smarter.</span>
            </p>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-3 font-semibold">Stay Updated</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/30">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Quick Links Section */}
          <div className="text-center md:text-left">
            <h4 
              className="text-lg font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Features', href: '#features' },
                { label: 'Fabric Estimator', href: '/dashboard' },
                { label: 'Virtual Trial Room', href: '/dashboard' },
                { label: 'Outfit Recommendations', href: '/dashboard' },
                { label: 'Explore by State', href: '/dashboard' }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-4 transition-all duration-300"></span>
                    <span style={{ fontFamily: "'Inter', sans-serif" }}>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources Section */}
          <div className="text-center md:text-left">
            <h4 
              className="text-lg font-bold mb-6 bg-gradient-to-r from-pink-400 to-amber-400 bg-clip-text text-transparent"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Resources
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '#' },
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
                { label: 'FAQ', href: '#' },
                { label: 'Support', href: '#' }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-pink-500 to-amber-500 group-hover:w-4 transition-all duration-300"></span>
                    <span style={{ fontFamily: "'Inter', sans-serif" }}>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info Section */}
          <div className="text-center md:text-left">
            <h4 
              className="text-lg font-bold mb-6 bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Get in Touch
            </h4>
            
            {/* Contact Items */}
            <div className="space-y-4">
              {/* Location */}
              <div className="flex items-start gap-3 text-center md:text-left justify-center md:justify-start">
                <div className="mt-1 p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
                  <MapPin size={18} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Mysore, Karnataka<br />
                    India
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 text-center md:text-left justify-center md:justify-start">
                <div className="mt-1 p-2 bg-gradient-to-br from-pink-500/20 to-amber-500/20 rounded-lg">
                  <Mail size={18} className="text-pink-400" />
                </div>
                <div>
                  <a 
                    href="mailto:fitme.ai0507@gmail.com"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    fitme.ai0507@gmail.com
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-4">
                <p className="text-sm text-gray-500 mb-3 font-semibold">Follow Us</p>
                <div className="flex space-x-3 justify-center md:justify-start">
                  {[
                    { Icon: Twitter, href: '#', gradient: 'from-blue-500 to-cyan-500' },
                    { Icon: Instagram, href: '#', gradient: 'from-pink-500 to-rose-500' },
                    { Icon: Facebook, href: '#', gradient: 'from-blue-600 to-indigo-600' }
                  ].map(({ Icon, href, gradient }, index) => (
                    <a 
                      key={index}
                      href={href} 
                      className="group relative p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95"
                    >
                      <Icon size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300`}></div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider with gradient */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="px-4 bg-gradient-to-r from-transparent via-gray-900 to-transparent">
              <Sparkles className="text-purple-500" size={20} />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p style={{ fontFamily: "'Inter', sans-serif" }}>
            &copy; {new Date().getFullYear()} <span className="text-purple-400 font-semibold">FitMe</span>. All rights reserved.
          </p>
          
          <p className="flex items-center gap-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Made with <Heart size={16} className="text-red-500 fill-red-500 animate-pulse" /> in India
          </p>
          
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
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
    </footer>
  );
};

export default Footer;