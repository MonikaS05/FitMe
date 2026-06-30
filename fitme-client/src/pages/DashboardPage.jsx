// src/pages/DashboardPage.jsx

import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Import all icons needed
import { Ruler, Camera, Shirt, Map, Scissors, Users, UserCheck, Sparkles, TrendingUp, Star, Package } from 'lucide-react'; 
import { motion } from 'framer-motion';

// --- ANIMATION VARIANTS DEFINED IN ACCESSIBLE SCOPE ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  },
};
// --- END ANIMATION VARIANTS ---


const featureData = [
    // ... rest of featureData ...
    {
        icon: <Ruler size={32} />,
        title: 'Fabric Estimator',
        description: 'Calculate the fabric you need for your next project.',
        link: '/fabric-estimator',
        gradient: 'from-purple-500 to-pink-500',
    },
    {
        icon: <Camera size={32} />,
        title: 'Virtual Trial Room',
        description: 'See how outfits look on you before you commit.',
        link: '/virtual-trial',
        gradient: 'from-pink-500 to-rose-500',
    },
    {
        icon: <Shirt size={32} />,
        title: 'Outfit Recommendation',
        description: 'Get style suggestions for any occasion.',
        link: '/outfit-recommendation',
        gradient: 'from-amber-500 to-orange-500',
    },
    {
        icon: <UserCheck size={32} />,
        title: 'Body Shape Analyzer',
        description: 'Find outfits that flatter your unique body shape.',
        link: '/body-shape-outfits',
        gradient: 'from-purple-600 to-indigo-500',
    },
    {
        icon: <Map size={32} />,
        title: 'Explore by State',
        description: 'Discover traditional attire from all over India.',
        link: '/explore-by-state',
        gradient: 'from-teal-500 to-emerald-500',
    },
 // --- NEW FEATURE: FABRIC SHOP ---
    {
        icon: <Package size={32} />,
        title: 'Fabric Shop',
        description: 'Browse and select the perfect fabric for your custom order.',
        link: '/fabric-shop',
        gradient: 'from-amber-400 to-yellow-500',
    },
];

const tailorFeature = {
    icon: <Scissors size={32} />,
    title: 'Tailor Dashboard',
    description: 'Manage your profile, orders, and customer requests.',
    link: '/tailor/dashboard',
    gradient: 'from-violet-500 to-purple-600',
};

const customerFeature = {
    icon: <Users size={32} />,
    title: 'Find a Tailor',
    description: 'Browse local tailors and place stitching orders.',
    link: '/find-tailor',
    gradient: 'from-blue-500 to-cyan-500',
};

const DashboardPage = () => {
    const { user, loading } = useAuth(); 

    // CRITICAL CHECK: Redirect the tailor role to their own dashboard.
    if (!loading && user && user.role === 'tailor') {
        return <Navigate to="/tailor/dashboard" replace />;
    }

    return (
        // The main div retains the static background gradient (from-gray-50 via-purple-50/30 to-gray-50)
        <div className="relative pt-24 pb-12 bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50 dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900 min-h-screen overflow-hidden">
            
            {/* 1. ANIMATED BACKGROUND ELEMENTS REMOVED HERE */}

            <div className="container mx-auto px-6 relative z-10">
                
                {/* Welcome Header */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-12"
                >
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 backdrop-blur-sm border border-purple-200 dark:border-purple-500/30 rounded-full mb-4">
                    <Sparkles size={16} className="text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Dashboard
                    </span>
                  </div>

                  <h1 
                    className="text-5xl md:text-6xl font-extrabold mb-3"
                    style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
                  >
                    <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">
                      Welcome back,
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                      {user && user.name}!
                    </span>
                  </h1>
                  
                  <p 
                    className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    What would you like to create today? Explore our AI-powered fashion tools below.
                  </p>
                </motion.div>
                
                {/* Features Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h2 
                        className="text-3xl font-bold text-gray-800 dark:text-white mb-6"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        Your Fashion Tools
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Render the main features */}
                        {featureData.map((feature, index) => (
                            <motion.div 
                                key={index} 
                                variants={itemVariants}
                            >
                                <Link to={feature.link} className="h-full block group">
                                    <div className="relative h-full">
                                        <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-50 group-hover:opacity-75 blur transition-all duration-300`}></div>
                                        <div className="relative h-full bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-[1.02]">
                                            <div className={`inline-flex p-3 bg-gradient-to-br ${feature.gradient} rounded-xl text-white mb-4 shadow-lg`}>
                                                {feature.icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                {feature.description}
                                            </p>
                                            <div className="mt-4 flex items-center text-purple-600 dark:text-purple-400 font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                                                <span style={{ fontFamily: "'Inter', sans-serif" }}>Explore</span>
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}

                        {/* Render role-specific feature for tailor (Tailor Dashboard) */}
                        {user && user.role === 'tailor' && (
                            <motion.div variants={itemVariants}>
                                <Link to={tailorFeature.link} className="h-full block group">
                                    <div className="relative h-full">
                                        <div className={`absolute -inset-0.5 bg-gradient-to-r ${tailorFeature.gradient} rounded-2xl opacity-50 group-hover:opacity-75 blur transition-all duration-300`}></div>
                                        <div className="relative h-full bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-[1.02]">
                                            <div className={`inline-flex p-3 bg-gradient-to-br ${tailorFeature.gradient} rounded-xl text-white mb-4 shadow-lg`}>
                                                {tailorFeature.icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                                {tailorFeature.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                {tailorFeature.description}
                                            </p>
                                            <div className="mt-4 flex items-center text-purple-600 dark:text-purple-400 font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                                                <span style={{ fontFamily: "'Inter', sans-serif" }}>Explore</span>
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        )}

                        {/* Render role-specific feature for customer (Find a Tailor) */}
                        {user && user.role === 'customer' && (
                            <motion.div variants={itemVariants}>
                                <Link to={customerFeature.link} className="h-full block group">
                                    <div className="relative h-full">
                                        <div className={`absolute -inset-0.5 bg-gradient-to-r ${customerFeature.gradient} rounded-2xl opacity-50 group-hover:opacity-75 blur transition-all duration-300`}></div>
                                        <div className="relative h-full bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-[1.02]">
                                            <div className={`inline-flex p-3 bg-gradient-to-br ${customerFeature.gradient} rounded-xl text-white mb-4 shadow-lg`}>
                                                {customerFeature.icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                                {customerFeature.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                {customerFeature.description}
                                            </p>
                                            <div className="mt-4 flex items-center text-purple-600 dark:text-purple-400 font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                                                <span style={{ fontFamily: "'Inter', sans-serif" }}>Explore</span>
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* 2. CUSTOM ANIMATIONS CSS REMOVED HERE */}
        </div>
    );
};

export default DashboardPage;