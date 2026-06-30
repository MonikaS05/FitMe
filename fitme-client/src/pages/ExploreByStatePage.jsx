// src/pages/ExploreByStatePage.jsx

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, X, MapPin, ExternalLink, Filter, Sparkles, ChevronRight } from 'lucide-react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { statesData, regions } from '../data/stateOutfitsData.js';
import INDIA_TOPO_JSON from '../data/india-states.json';

// Find the corresponding outfit data for a given state name from the map
const findOutfitDataForState = (stateName) => {
    if (!stateName) return null;
    const normalizedStateName = stateName.replace('&', 'and');
    return statesData.find(
        (data) => data.name.replace('&', 'and').toLowerCase() === normalizedStateName.toLowerCase()
    );
};

const ExploreByStatePage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('all');
    const [hoveredState, setHoveredState] = useState('');
    const [selectedStateData, setSelectedStateData] = useState(null);
    const [mapCenter, setMapCenter] = useState([80, 22]);
    const [mapZoom, setMapZoom] = useState(1);

    // Filter states based on search and region
    const filteredStateNames = useMemo(() => {
        return statesData
            .filter(state => {
                const matchesSearch = state.name.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesRegion = selectedRegion === 'all' || state.region === selectedRegion;
                return matchesSearch && matchesRegion;
            })
            .map(state => state.name.toLowerCase());
    }, [searchQuery, selectedRegion]);

    const handleStateClick = (geo) => {
        const stateName = geo.properties.st_nm;
        const outfitData = findOutfitDataForState(stateName);

        if (outfitData) {
            setSelectedStateData(outfitData);
        } else {
            console.warn(`No outfit data found for state: ${stateName}`);
            setSelectedStateData({ 
                name: stateName, 
                menOutfit: 'N/A', 
                womenOutfit: 'N/A', 
                image: null,
                traditionalDressLink: `https://www.google.com/search?q=${stateName.replace(/ /g, '+')}+traditional+dresses&tbm=isch` 
            });
        }
    };

    const handleZoomReset = () => {
         setMapCenter([80, 22]);
         setMapZoom(1);
    }

    const closeModal = () => {
        setSelectedStateData(null);
        handleZoomReset();
    };

     const openTraditionalDresses = (url) => {
        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            console.error("Invalid or missing traditional dress URL:", url);
        }
     };

    return (
        <div className="relative pt-24 pb-12 bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50 dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900 min-h-screen overflow-hidden">
            
            {/* Animated Background Elements */}
            <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-float-delayed"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-6 transition-colors font-semibold"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    <ArrowLeft size={20} /> Back to Dashboard
                </button>

                {/* Header Section */}
                <div className="text-center mb-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 dark:from-purple-500/20 dark:to-indigo-500/20 backdrop-blur-sm border border-purple-200 dark:border-purple-500/30 rounded-full mb-4">
                        <Sparkles size={16} className="text-purple-600 dark:text-purple-400" />
                        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Discover India
                        </span>
                    </div>

                    <h1 
                        className="text-4xl md:text-5xl font-extrabold mb-3 inline-flex items-center gap-3 justify-center"
                        style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
                    >
                        <MapPin className="text-purple-600 dark:text-purple-400" size={40} />
                        <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
                            Explore by State
                        </span>
                    </h1>
                    <p 
                        className="text-lg text-gray-600 dark:text-gray-400"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Click on a state to discover its traditional attire
                    </p>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col md:flex-row gap-6">

                    {/* Filters Sidebar */}
                    <div className="w-full md:w-1/3 lg:w-1/4">
                        <div className="relative group">
                            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-lg sticky top-24">
                                
                                {/* Search Bar */}
                                <div className="mb-5">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                                        Search States
                                    </label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input 
                                            type="text" 
                                            placeholder="Type state name..." 
                                            value={searchQuery} 
                                            onChange={(e) => setSearchQuery(e.target.value)} 
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300"
                                            style={{ fontFamily: "'Inter', sans-serif" }}
                                        />
                                    </div>
                                </div>

                                {/* Region Filter */}
                                <div className="mb-5">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                                        Filter by Region
                                    </label>
                                    <div className="relative">
                                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <select 
                                            value={selectedRegion} 
                                            onChange={(e) => setSelectedRegion(e.target.value)} 
                                            className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white appearance-none focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 cursor-pointer"
                                            style={{ fontFamily: "'Inter', sans-serif" }}
                                        >
                                            {regions.map(region => (
                                                <option key={region} value={region}>
                                                    {region === 'all' ? 'All Regions' : region === 'UT' ? 'Union Territories' : `${region} India`}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                                            <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M5.516 7.548c.436-.446 1.143-.446 1.579 0L10 10.403l2.905-2.855c.436-.446 1.143-.446 1.579 0 .436.445.436 1.167 0 1.612l-3.694 3.63c-.436.446-1.143.446-1.579 0L5.516 9.16c-.436-.445-.436-1.167 0-1.612z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-xl mb-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                                        Showing <span className="font-bold text-purple-600 dark:text-purple-400">{filteredStateNames.length}</span> matching states
                                    </p>
                                </div>

                                {/* Reset Button */}
                                <button 
                                    onClick={handleZoomReset} 
                                    className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    Reset Map View
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Map Area */}
                    <div className="w-full md:w-2/3 lg:w-3/4">
                        <div className="relative group">
                            <div className="relative h-[60vh] md:h-[70vh] bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden shadow-xl">
                                <ComposableMap
                                    projection="geoMercator"
                                    projectionConfig={{
                                        scale: 800,
                                        center: mapCenter,
                                    }}
                                    width={800}
                                    height={600}
                                    style={{ width: "100%", height: "100%" }}
                                >
                                    <ZoomableGroup center={mapCenter} zoom={mapZoom} onMoveEnd={({ zoom, coordinates }) => { setMapCenter(coordinates); setMapZoom(zoom); }}>
                                        <Geographies geography={INDIA_TOPO_JSON} object="districts">
                                            {({ geographies }) =>
                                                geographies.map((geo) => {
                                                    const stateName = geo.properties.st_nm; 
                                                    const isHovered = hoveredState === stateName;
                                                    const isFiltered = filteredStateNames.includes(stateName?.toLowerCase());
                                                    const hasData = !!findOutfitDataForState(stateName);

                                                    return (
                                                        <Geography
                                                            key={geo.rsmKey}
                                                            geography={geo}
                                                            onClick={() => handleStateClick(geo)}
                                                            onMouseEnter={() => setHoveredState(stateName)}
                                                            onMouseLeave={() => setHoveredState('')}
                                                            style={{
                                                                default: {
                                                                    fill: isFiltered ? (hasData ? "#E9D5FF" : "#E5E7EB") : "#F3F4F6", 
                                                                    stroke: "#9333EA", 
                                                                    strokeWidth: 0.3,
                                                                    outline: "none",
                                                                },
                                                                hover: {
                                                                    fill: "#C084FC", 
                                                                    stroke: "#7C3AED",
                                                                    strokeWidth: 1,
                                                                    outline: "none",
                                                                    cursor: "pointer",
                                                                },
                                                                pressed: {
                                                                    fill: "#A855F7",
                                                                    stroke: "#6B21A8",
                                                                    strokeWidth: 1,
                                                                    outline: "none",
                                                                },
                                                            }}
                                                            className={`transition-colors duration-150 ${!isFiltered ? 'opacity-30 dark:fill-gray-700 dark:stroke-gray-500' : 'dark:fill-purple-900/50 dark:stroke-purple-500' } ${isHovered ? 'dark:!fill-purple-500' : ''}`}
                                                        />
                                                    );
                                                })
                                            }
                                        </Geographies>
                                    </ZoomableGroup>
                                </ComposableMap>
                                
                                {/* Hover Tooltip */}
                                {hoveredState && (
                                    <div className="absolute bottom-4 left-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold rounded-xl shadow-lg backdrop-blur-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                                        {hoveredState}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Modal for State Details - UPDATED CARD STYLE */}
            {selectedStateData && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="relative max-w-4xl w-full bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 animate-scaleIn">
                        
                        {/* 1. Header: State Name Top Center */}
                        <div className="pt-8 pb-4 text-center">
                            <h2 
                                className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                {selectedStateData.name}
                            </h2>
                            <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-500 mx-auto mt-2 rounded-full"></div>
                        </div>

                        {/* Close Button */}
                        <button 
                            onClick={closeModal} 
                            className="absolute top-6 right-6 p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all z-10"
                        >
                            <X size={24} />
                        </button>

                        {/* 2. Content Body: Image (9:16) & Details Side-by-Side */}
                        <div className="flex flex-col md:flex-row p-6 md:p-8 gap-8 items-center">
                            
                            {/* Image Section: 9:16 Vertical Ratio */}
                            <div className="w-full md:w-1/2 aspect-[9/16] max-h-[60vh] relative group">
                                {selectedStateData.image ? (
                                    <img 
                                        src={selectedStateData.image} 
                                        alt={selectedStateData.name} 
                                        className="w-full h-full object-cover rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/900x1600?text=Cultural+Dress';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                                        <Sparkles size={48} className="text-gray-300" />
                                    </div>
                                )}
                            </div>

                            {/* Details Section: Beside the Image */}
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 rounded-2xl border border-purple-100 dark:border-purple-800">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-2">Men's Traditional Attire</h4>
                                    <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-100 font-serif leading-tight">
                                        {selectedStateData.menOutfit || 'N/A'}
                                    </p>
                                </div>

                                <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/10 dark:to-blue-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">Women's Traditional Attire</h4>
                                    <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-100 font-serif leading-tight">
                                        {selectedStateData.womenOutfit || 'N/A'}
                                    </p>
                                </div>
                                
                                <div className="px-4 py-2 inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-500 font-bold uppercase tracking-tighter">
                                    <MapPin size={14} /> Region: {selectedStateData.region}
                                </div>
                            </div>
                        </div>

                        {/* 3. Link Section: Bottom Center */}
                        <div className="pb-8 text-center">
                            <button 
                                onClick={() => openTraditionalDresses(selectedStateData.traditionalDressLink)} 
                                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
                            >
                                <ExternalLink size={20} />
                                View Traditional Dress Gallery
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

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

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes scaleIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }

                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }

                .animate-float-delayed {
                    animation: float-delayed 10s ease-in-out infinite;
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }

                .animate-scaleIn {
                    animation: scaleIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default ExploreByStatePage;