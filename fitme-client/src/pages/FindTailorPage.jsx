// src/pages/FindTailorPage.jsx
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, MapPin, Star, Scissors, Loader2, Phone, MessageSquare, Mail, X, Sparkles, Award, TrendingUp, Package } from 'lucide-react';
import setAuthToken from '../utils/setAuthToken';

const FABRIC_STORAGE_KEY = 'tempFabricSelection'; 
const TAILOR_ID_STORAGE_KEY = 'tempTailorIdForOrder'; 

const WhatsappIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
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

const FindTailorPage = () => {
    const navigate = useNavigate();
    const [tailors, setTailors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedTailor, setSelectedTailor] = useState(null);
    const [savedFabric, setSavedFabric] = useState(null);

    useEffect(() => {
        const fabricData = localStorage.getItem(FABRIC_STORAGE_KEY);
        if (fabricData) {
            setSavedFabric(JSON.parse(fabricData));
        }

        const fetchTailors = async () => {
            if (localStorage.token) {
                setAuthToken(localStorage.token);
            } else {
                setError("You must be logged in to view tailors.");
                setIsLoading(false);
                return;
            }

            try {
                const res = await axios.get('/api/users/tailors');
                setTailors(res.data);
            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 404) {
                    setError('API route not found. (Did the server restart?)');
                } else {
                    setError('Failed to fetch tailors. Please try again later.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchTailors();
    }, []);

    const handleConnectClick = (tailor) => {
        if (!savedFabric) {
            alert("Please select a fabric before placing your order.");
            navigate('/fabric-shop');
            return;
        }

        localStorage.setItem(TAILOR_ID_STORAGE_KEY, tailor._id);
        navigate(`/place-order/${tailor._id}`);
    };

    const handleContactClick = (e, tailor) => {
        e.stopPropagation();
        e.preventDefault();
        setSelectedTailor(tailor);
    };

    const renderStars = (rating) => (
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-full">
            <Star size={16} fill="currentColor" className="text-amber-500" />
            <span className="font-bold text-amber-600 dark:text-amber-400 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                {rating.toFixed(1)}
            </span>
        </div>
    );

    return (
        <div className="relative pt-24 pb-12 bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50 dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900 min-h-screen overflow-hidden">
            
            <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-float-delayed"></div>

            <div className="container mx-auto px-6 relative z-10">
                
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-6 transition-colors font-semibold"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    <ArrowLeft size={20} /> Back to Dashboard
                </button>

                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 dark:from-purple-500/20 dark:to-indigo-500/20 backdrop-blur-sm border border-purple-200 dark:border-purple-500/30 rounded-full mb-4">
                        <Sparkles size={16} className="text-purple-600 dark:text-purple-400" />
                        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Expert Tailors
                        </span>
                    </div>

                    <h1 
                        className="text-4xl md:text-5xl font-extrabold mb-3 inline-flex items-center gap-3"
                        style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
                    >
                        <Scissors className="text-purple-600 dark:text-purple-400" size={40} />
                        <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
                            Find Your Tailor
                        </span>
                    </h1>
                    <p 
                        className="text-lg text-gray-600 dark:text-gray-400"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Connect with skilled professionals for your custom stitching needs
                    </p>
                </motion.div>

                <div className={`mb-8 p-4 rounded-xl shadow-md flex items-center justify-between ${savedFabric ? 'bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500' : 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500'}`}>
                    <div className='flex items-center gap-3'>
                        <Package size={24} className={`${savedFabric ? 'text-emerald-600' : 'text-yellow-600'}`}/>
                        <div>
                            <p className="font-bold text-gray-800 dark:text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                {savedFabric ? `Fabric Selected: ${savedFabric.name}` : 'Fabric Selection Required'}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {savedFabric ? `${savedFabric.quantityNeeded} meters ready for order.` : 'Click below to choose material first.'}
                            </p>
                        </div>
                    </div>
                    <Link to="/fabric-shop" className='text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline'>
                        {savedFabric ? 'Change' : 'Select Fabric'}
                    </Link>
                </div>

                {isLoading ? (
                    <div className="text-center py-20">
                        <Loader2 className="animate-spin h-16 w-16 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400 text-lg font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Loading talented tailors...
                        </p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
                            <X className="text-red-500" size={32} />
                        </div>
                        <p className="text-red-500 text-lg font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>{error}</p>
                    </div>
                ) : tailors.length === 0 ? (
                     <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                            <Scissors className="text-gray-400" size={32} />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                            No tailors have registered yet. Check back soon!
                        </p>
                    </div>
                ) : (
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {tailors.map((tailor) => (
                            <motion.div
                                key={tailor._id}
                                variants={cardVariants}
                            >
                                <div className="group block h-full">
                                    <div className="relative h-full flex flex-col">
                                        <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>
                                        
                                        <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-lg group-hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden">
                                            
                                            <div className="relative p-6 pb-4 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex-1">
                                                        <h2 
                                                            className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
                                                            style={{ fontFamily: "'Poppins', sans-serif" }}
                                                        >
                                                            {tailor.name}
                                                        </h2>
                                                        {renderStars(tailor.rating || 0)}
                                                    </div>
                                                    <div className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md">
                                                        <Scissors className="text-purple-600 dark:text-purple-400" size={20} />
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                        <MapPin size={16} className="text-purple-500" />
                                                        <span style={{ fontFamily: "'Inter', sans-serif" }}>{tailor.location}</span>
                                                    </div>
                                                    {tailor.phoneNumber && (
                                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                            <Phone size={16} className="text-purple-500" />
                                                            <span style={{ fontFamily: "'Inter', sans-serif" }}>{tailor.phoneNumber}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex-1 p-6 pt-4">
                                                <p 
                                                    className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed"
                                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                                >
                                                    {tailor.bio || "Experienced tailor providing quality stitching services."}
                                                </p>
                                                
                                                <div>
                                                    <h4 
                                                        className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1"
                                                        style={{ fontFamily: "'Inter', sans-serif" }}
                                                    >
                                                        <Award size={14} />
                                                        Specializations
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {tailor.specializations && tailor.specializations.length > 0 ? (
                                                            tailor.specializations.slice(0, 4).map((spec) => (
                                                                <span 
                                                                    key={spec} 
                                                                    className="text-xs text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full font-medium border border-purple-200 dark:border-purple-700"
                                                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                                                >
                                                                    {spec}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-xs text-gray-500 dark:text-gray-400 italic" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                                General stitching
                                                            </span>
                                                        )}
                                                        {tailor.specializations && tailor.specializations.length > 4 && (
                                                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                                +{tailor.specializations.length - 4} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-auto grid grid-cols-2 gap-0 border-t-2 border-gray-200 dark:border-gray-700">
                                                <button 
                                                    onClick={(e) => handleContactClick(e, tailor)}
                                                    className="w-full text-center bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-4 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 rounded-bl-2xl flex items-center justify-center gap-2 group/contact"
                                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                                >
                                                    <MessageSquare size={18} className="group-hover/contact:scale-110 transition-transform" />
                                                    Contact
                                                </button>
                                                <button
                                                    onClick={() => handleConnectClick(tailor)}
                                                    className="w-full text-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 px-4 transition-all duration-300 rounded-br-2xl flex items-center justify-center gap-2 group/order"
                                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                                >
                                                    <TrendingUp size={18} className="group-hover/order:scale-110 transition-transform" />
                                                    Place Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Contact Modal */}
            {selectedTailor && (
                <div 
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedTailor(null)}
                >
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="relative max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 relative">
                            <button
                                onClick={() => setSelectedTailor(null)}
                                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                            >
                                <X size={20} className="text-white" />
                            </button>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/20 rounded-full">
                                    <Scissors className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                        {selectedTailor.name}
                                    </h3>
                                    <p className="text-purple-100 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                                        {selectedTailor.location}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-4">
                            <div>
                                <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    Contact Information
                                </h4>
                                <div className="space-y-3">
                                    {selectedTailor.phoneNumber && (
                                        <a
                                            href={`tel:${selectedTailor.phoneNumber}`}
                                            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                                        >
                                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                                <Phone size={18} className="text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-500 dark:text-gray-400" style={{ fontFamily: "'Inter', sans-serif" }}>Phone</p>
                                                <p className="font-semibold text-gray-900 dark:text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                    {selectedTailor.phoneNumber}
                                                </p>
                                            </div>
                                        </a>
                                    )}
                                    
                                    {selectedTailor.email && (
                                        <a
                                            href={`mailto:${selectedTailor.email}`}
                                            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                                        >
                                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                                <Mail size={18} className="text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-500 dark:text-gray-400" style={{ fontFamily: "'Inter', sans-serif" }}>Email</p>
                                                <p className="font-semibold text-gray-900 dark:text-white truncate" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                    {selectedTailor.email}
                                                </p>
                                            </div>
                                        </a>
                                    )}
                                    
                                    {selectedTailor.phoneNumber && (
                                        <a
                                            href={`https://wa.me/${selectedTailor.phoneNumber.replace(/\D/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors group"
                                        >
                                            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                                                <WhatsappIcon />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-500 dark:text-gray-400" style={{ fontFamily: "'Inter', sans-serif" }}>WhatsApp</p>
                                                <p className="font-semibold text-emerald-600 dark:text-emerald-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                    Message on WhatsApp
                                                </p>
                                            </div>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Custom Animations */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
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

export default FindTailorPage;