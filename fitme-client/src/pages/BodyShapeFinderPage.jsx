import React, { useState, useMemo } from 'react';
import { ArrowLeft, Sparkles, UserCheck, TrendingUp, Star, Zap } from 'lucide-react';

// Mock outfit data for demo
const outfitData = [
  { id: 1, name: "Elegant A-Line Dress", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop", tags: { gender: 'female', occasion: 'formal' }, flatteringFor: ['Triangle', 'Rectangle'] },
  { id: 2, name: "Fitted Blazer", image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&h=600&fit=crop", tags: { gender: 'female', occasion: 'business' }, flatteringFor: ['Hourglass', 'Inverted Triangle'] },
  { id: 3, name: "Wrap Dress", image: "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?w=400&h=600&fit=crop", tags: { gender: 'female', occasion: 'casual' }, flatteringFor: ['Hourglass', 'Triangle'] },
  { id: 4, name: "Peplum Top", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop", tags: { gender: 'female', occasion: 'casual' }, flatteringFor: ['Rectangle', 'Inverted Triangle'] },
  { id: 5, name: "High-Waist Skirt", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=600&fit=crop", tags: { gender: 'female', occasion: 'formal' }, flatteringFor: ['Triangle', 'Hourglass'] },
  { id: 6, name: "Belted Midi Dress", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=600&fit=crop", tags: { gender: 'female', occasion: 'casual' }, flatteringFor: ['Rectangle', 'Inverted Triangle'] },
];

const calculateBodyShape = (bust, waist, hips) => {
    if (!bust || !waist || !hips) return null;
    const b = parseFloat(bust);
    const w = parseFloat(waist);
    const h = parseFloat(hips);

    if (b > (h * 1.05)) return 'Inverted Triangle';
    if (h > (b * 1.05)) return 'Triangle';
    if (Math.abs(b - h) / h < 0.05 && (w / b < 0.75) && (w / h < 0.75)) return 'Hourglass';
    if (Math.abs(b - h) / h < 0.05 && (w / b >= 0.75)) return 'Rectangle';
    return 'Rectangle'; 
};

const shapeDescriptions = {
    'Triangle': "Your hips are wider than your bust. We recommend A-line cuts and tops that highlight your shoulders.",
    'Inverted Triangle': "Your shoulders or bust are wider than your hips. We recommend flared skirts and V-necks.",
    'Rectangle': "Your shoulders, bust, and hips are about the same width. We recommend belted waists and scoop necks.",
    'Hourglass': "Your bust and hips are balanced with a well-defined waist. We recommend form-fitting clothes that accentuate your curves.",
};

const shapeColors = {
    'Triangle': 'from-purple-500 to-pink-500',
    'Inverted Triangle': 'from-amber-500 to-orange-500',
    'Rectangle': 'from-purple-500 to-blue-500',
    'Hourglass': 'from-pink-500 to-purple-600',
};

const BodyShapeFinderPage = () => {
    const [measurements, setMeasurements] = useState({ bust: '', waist: '', hips: '' });
    const [calculatedShape, setCalculatedShape] = useState(null);
    const [error, setError] = useState('');
    const [isCalculating, setIsCalculating] = useState(false);

    const handleMeasurementChange = (e) => {
        setCalculatedShape(null);
        setError('');
        setMeasurements({ ...measurements, [e.target.name]: e.target.value });
    };

    const filteredOutfits = useMemo(() => {
        if (!calculatedShape) return [];
        return outfitData.filter(outfit =>
            outfit.tags.gender === 'female' &&
            outfit.flatteringFor && 
            outfit.flatteringFor.includes(calculatedShape)
        );
    }, [calculatedShape]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const { bust, waist, hips } = measurements;
        if(!bust || !waist || !hips) {
            setError("Please fill in all three measurements.");
            return;
        }
        
        setIsCalculating(true);
        setTimeout(() => {
            const shape = calculateBodyShape(bust, waist, hips);
            setCalculatedShape(shape);
            setIsCalculating(false);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Back Button with Glow */}
                <button
                    onClick={() => window.history.back()}
                    className="group flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl border border-purple-100 dark:border-gray-700 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                    <ArrowLeft size={18} className="text-purple-600 dark:text-purple-400 transition-transform duration-300 group-hover:-translate-x-1" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Back to Dashboard</span>
                </button>

                {/* Header with Animated Sparkles */}
                <div className="text-center mb-12 relative">
                    <div className="inline-flex items-center justify-center gap-3 mb-4 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-amber-500 blur-2xl opacity-20 animate-pulse"></div>
                        <Sparkles size={40} className="text-purple-600 dark:text-purple-400 relative animate-pulse" />
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 bg-clip-text text-transparent relative">
                            Body Shape Analyzer
                        </h1>
                        <Zap size={40} className="text-amber-500 dark:text-amber-400 relative animate-pulse" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Discover your unique shape and find outfits that celebrate you</p>
                </div>

                {/* Input Card with Premium Design */}
                <div className="group relative mb-12">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-purple-100 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-6">
                            <TrendingUp className="text-purple-600 dark:text-purple-400" size={24} />
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Your Measurements</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">Enter your measurements in centimeters to unlock personalized recommendations</p>
                        
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { name: 'bust', label: 'Bust', placeholder: '90', icon: '👗' },
                                    { name: 'waist', label: 'Waist', placeholder: '70', icon: '⭐' },
                                    { name: 'hips', label: 'Hips', placeholder: '95', icon: '💫' }
                                ].map((field) => (
                                    <div key={field.name} className="group/input">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            <span className="text-xl">{field.icon}</span>
                                            {field.label} (cm)
                                        </label>
                                        <div className="relative">
                                            <input 
                                                type="number" 
                                                step="0.1" 
                                                name={field.name} 
                                                value={measurements[field.name]} 
                                                onChange={handleMeasurementChange} 
                                                placeholder={field.placeholder}
                                                className="w-full px-4 py-3 rounded-xl bg-purple-50 dark:bg-gray-700 border-2 border-purple-100 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/20 text-gray-800 dark:text-white font-medium"
                                            />
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover/input:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {error && (
                                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                    <span className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</span>
                                </div>
                            )}
                            
                            <button 
                                onClick={handleSubmit}
                                disabled={isCalculating}
                                className="group/btn relative w-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-amber-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                <span className="relative flex items-center justify-center gap-2">
                                    {isCalculating ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <UserCheck size={20} className="transition-transform duration-300 group-hover/btn:scale-110" />
                                            Calculate My Shape
                                        </>
                                    )}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                {calculatedShape && (
                    <div className="space-y-8 animate-fadeIn">
                        {/* Shape Result Card */}
                        <div className="group relative">
                            <div className={`absolute -inset-1 bg-gradient-to-r ${shapeColors[calculatedShape]} rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse`}></div>
                            <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border-2 border-purple-100 dark:border-gray-700 text-center overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-amber-500/10 rounded-full blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
                                
                                <div className="relative">
                                    <div className="inline-flex items-center gap-2 mb-4">
                                        <Star className="text-amber-500 animate-pulse" size={24} />
                                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Your body shape is</h3>
                                        <Star className="text-amber-500 animate-pulse" size={24} />
                                    </div>
                                    
                                    <h2 className={`text-6xl font-extrabold bg-gradient-to-r ${shapeColors[calculatedShape]} bg-clip-text text-transparent my-4 animate-pulse`}>
                                        {calculatedShape}
                                    </h2>
                                    
                                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                                        {shapeDescriptions[calculatedShape]}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Recommended Outfits */}
                        <div>
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent"></div>
                                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Recommended Outfits</h2>
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent"></div>
                            </div>
                            
                            {filteredOutfits.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredOutfits.map((outfit) => (
                                        <div 
                                            key={outfit.id} 
                                            className="group/card relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-amber-500/0 group-hover/card:from-purple-500/10 group-hover/card:to-amber-500/10 transition-all duration-300"></div>
                                            
                                            <div className="relative overflow-hidden">
                                                <img 
                                                    src={outfit.image} 
                                                    alt={outfit.name} 
                                                    className="w-full h-64 object-cover transition-transform duration-500 group-hover/card:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                            
                                            <div className="relative p-5 border-t-2 border-purple-100 dark:border-gray-700">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                                                    {outfit.name}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-xs font-semibold rounded-full capitalize">
                                                        {outfit.tags.occasion}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center p-12 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-purple-100 dark:border-gray-700">
                                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                                        No outfits in our collection are currently tagged for '{calculatedShape}' shape. Try different measurements!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            
            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default BodyShapeFinderPage;