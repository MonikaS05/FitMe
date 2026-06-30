// client/src/components/PageWrapper.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Enhanced animations with more creative transitions
const animations = {
  initial: { 
    opacity: 0, 
    y: 30,
    scale: 0.95,
    filter: 'blur(10px)'
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    filter: 'blur(0px)'
  },
  exit: { 
    opacity: 0, 
    y: -30,
    scale: 0.95,
    filter: 'blur(10px)'
  },
};

// Staggered children animation for smooth element reveal
const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {}
};

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative"
    >
      {/* Animated gradient overlay that fades in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(147, 51, 234, 0.03), transparent 50%)',
        }}
      />

      {/* Main content with enhanced animations */}
      <motion.div
        variants={animations}
        transition={{ 
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth feel
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* Decorative animated elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-20 right-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none z-0"
        style={{
          animation: 'float 8s ease-in-out infinite'
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="fixed bottom-20 left-10 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none z-0"
        style={{
          animation: 'float-delayed 10s ease-in-out infinite'
        }}
      />

      {/* Global animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
      `}</style>
    </motion.div>
  );
};

export default PageWrapper;