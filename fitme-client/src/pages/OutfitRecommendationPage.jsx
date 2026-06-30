// client/src/pages/OutfitRecommendationPage.jsx

import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, SlidersHorizontal, Layers, Heart, X, Sparkles, Filter } from 'lucide-react';
import TinderCard from 'react-tinder-card';
import { outfitData, occasions, seasons, genders } from '../data/outfitData';

const OutfitRecommendationPage = () => {
    const navigate = useNavigate();

    // Filter states
    const [selectedOccasion, setSelectedOccasion] = useState('all');
    const [selectedSeason, setSelectedSeason] = useState('all');
    const [selectedGender, setSelectedGender] = useState('all');

    // Wishlist State
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('fitmeWishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });
    const [showWishlist, setShowWishlist] = useState(false);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('fitmeWishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    // Memoized filtering logic
    const availableOutfits = useMemo(() => {
        let filtered = outfitData.filter(outfit => {
            const { tags } = outfit;
            return (
                (selectedOccasion === 'all' || tags.occasion === selectedOccasion) &&
                (selectedSeason === 'all' || tags.season === selectedSeason || tags.season === 'all') &&
                (selectedGender === 'all' || tags.gender === selectedGender)
            );
        });
        return filtered;
    }, [selectedOccasion, selectedSeason, selectedGender]);

    const [currentStack, setCurrentStack] = useState([]);
    useEffect(() => {
        setCurrentStack(availableOutfits);
    }, [availableOutfits]);

    // Handle Swipe
    const onSwipe = (direction, swipedOutfit) => {
        console.log(`You swiped ${direction} on ${swipedOutfit.name}`);
        if (direction === 'right') {
            setWishlist(prevWishlist => {
                if (!prevWishlist.some(item => item.id === swipedOutfit.id)) {
                    return [...prevWishlist, swipedOutfit];
                }
                return prevWishlist;
            });
        }
    };

    const onCardLeftScreen = (identifier) => {
        console.log(`${identifier} left the screen`);
        setCurrentStack(prev => prev.filter(outfit => outfit.id !== identifier));
    };

    // Wishlist Functions
    const removeFromWishlist = (outfitId) => {
        setWishlist(prev => prev.filter(item => item.id !== outfitId));
    };

    const toggleWishlistDisplay = () => {
        setShowWishlist(prev => !prev);
    };

    const renderFilterSelect = (label, value, onChange, options) => (
        <div className="flex-1 min-w-[120px]">
            <label 
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                {label}
            </label>
            <select 
                value={value} 
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 cursor-pointer appearance-none"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                {options.map(option => (
                    <option key={option} value={option} className="capitalize">
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="relative pt-24 pb-12 bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50 dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900 min-h-screen overflow-hidden">
            
            {/* Animated Background Elements */}
            <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-float-delayed"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl relative z-10">
                
                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-6 transition-colors font-semibold"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    <ArrowLeft size={20} /> Back to Dashboard
                </button>

                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-8">
                    <div>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 dark:from-purple-500/20 dark:to-indigo-500/20 backdrop-blur-sm border border-purple-200 dark:border-purple-500/30 rounded-full mb-4">
                            <Sparkles size={16} className="text-purple-600 dark:text-purple-400" />
                            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                                AI Powered
                            </span>
                        </div>

                        <h1 
                            className="text-3xl md:text-4xl font-extrabold inline-flex items-center gap-3"
                            style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
                        >
                            <Layers className="text-purple-600 dark:text-purple-400" size={36} />
                            <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
                                Outfit Finder
                            </span>
                        </h1>
                    </div>

                    {/* Wishlist Toggle Button */}
                    <button
                        onClick={toggleWishlistDisplay}
                        className="relative p-3 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 border-2 border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 hover:scale-110"
                        aria-label="Toggle Wishlist"
                    >
                        <Heart size={24} className={wishlist.length > 0 ? 'fill-current' : ''} />
                        {wishlist.length > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-lg">
                                {wishlist.length}
                            </span>
                        )}
                    </button>
                </div>

                {/* Filters Section */}
                {!showWishlist && (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-lg mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Filter size={20} className="text-purple-600 dark:text-purple-400" />
                            <h3 
                                className="text-lg font-bold text-gray-800 dark:text-white"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                Filters
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {renderFilterSelect("Occasion", selectedOccasion, setSelectedOccasion, occasions)}
                            {renderFilterSelect("Season", selectedSeason, setSelectedSeason, seasons)}
                            {renderFilterSelect("Gender", selectedGender, setSelectedGender, genders)}
                        </div>
                    </div>
                )}

                {/* Conditional Display: Wishlist or Card Stack */}
                {showWishlist ? (
                    // Wishlist Display
                    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl border-2 border-purple-200 dark:border-purple-700 shadow-xl">
                        <h2 
                            className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent text-center"
                            style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
                        >
                            Your Wishlist
                        </h2>
                        {wishlist.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                                {wishlist.map(item => (
                                    <div key={item.id} className="relative group">
                                        <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-purple-400 dark:group-hover:border-purple-500 transition-all duration-300">
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="w-full h-auto aspect-[2/3] object-cover"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                                                <p 
                                                    className="text-white text-sm font-semibold truncate"
                                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                                >
                                                    {item.name}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromWishlist(item.id)}
                                            className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
                                            aria-label="Remove from wishlist"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                                    <Heart size={40} className="text-purple-400" />
                                </div>
                                <p 
                                    className="text-gray-500 dark:text-gray-400 mb-2"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    Your wishlist is empty
                                </p>
                                <p 
                                    className="text-sm text-gray-400 dark:text-gray-500"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    Swipe right on outfits you like!
                                </p>
                            </div>
                        )}
                        <button
                            onClick={toggleWishlistDisplay}
                            className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 hover:from-purple-700 hover:via-indigo-600 hover:to-blue-600 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Back to Swiping
                        </button>
                    </div>
                ) : (
                    // Card Stack Area
                    <div>
                        <div className="relative w-full h-[550px] flex items-center justify-center mb-6">
                            {currentStack.length > 0 ? (
                                currentStack.map((outfit) => (
                                    <TinderCard
                                        key={outfit.id}
                                        onSwipe={(dir) => onSwipe(dir, outfit)}
                                        onCardLeftScreen={() => onCardLeftScreen(outfit.id)}
                                        preventSwipe={['up', 'down']}
                                        className="absolute cursor-grab active:cursor-grabbing"
                                    >
                                        {/* Card Content */}
                                        <div 
                                            style={{ backgroundImage: `url(${outfit.image})` }}
                                            className="relative w-[320px] h-[480px] bg-cover bg-center rounded-2xl shadow-2xl overflow-hidden border-4 border-white dark:border-gray-700"
                                        >
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                            
                                            {/* Content */}
                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <h3 
                                                    className="text-2xl font-bold text-white mb-3"
                                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                                >
                                                    {outfit.name}
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    <span 
                                                        className="px-3 py-1 bg-purple-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full capitalize"
                                                        style={{ fontFamily: "'Inter', sans-serif" }}
                                                    >
                                                        {outfit.tags.occasion}
                                                    </span>
                                                    <span 
                                                        className="px-3 py-1 bg-indigo-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full capitalize"
                                                        style={{ fontFamily: "'Inter', sans-serif" }}
                                                    >
                                                        {outfit.tags.season}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Swipe Indicators */}
                                            <div className="absolute top-8 left-8 opacity-0 rotate-[-20deg]" id="left-indicator">
                                                <div className="px-6 py-3 border-4 border-red-500 rounded-xl">
                                                    <span className="text-3xl font-bold text-red-500">NOPE</span>
                                                </div>
                                            </div>
                                            <div className="absolute top-8 right-8 opacity-0 rotate-[20deg]" id="right-indicator">
                                                <div className="px-6 py-3 border-4 border-green-500 rounded-xl">
                                                    <span className="text-3xl font-bold text-green-500">LIKE</span>
                                                </div>
                                            </div>
                                        </div>
                                    </TinderCard>
                                ))
                            ) : (
                                // No more cards message
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                                        <Layers size={40} className="text-gray-400" />
                                    </div>
                                    <h3 
                                        className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
                                        style={{ fontFamily: "'Poppins', sans-serif" }}
                                    >
                                        {availableOutfits.length === 0 ? "No Outfits Found!" : "No More Cards!"}
                                    </h3>
                                    <p 
                                        className="text-gray-600 dark:text-gray-400"
                                        style={{ fontFamily: "'Inter', sans-serif" }}
                                    >
                                        {availableOutfits.length === 0 ? "Try adjusting your filters." : "You've seen all outfits for these filters."}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Helper Text */}
                        {currentStack.length > 0 && (
                            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-xl p-4">
                                <p 
                                    className="text-center text-gray-700 dark:text-gray-300 text-sm font-medium"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    👈 Swipe left to dismiss • Swipe right to add to wishlist 👉
                                </p>
                            </div>
                        )}
                    </div>
                )}
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
        </div>
    );
};

export default OutfitRecommendationPage;