// src/pages/FabricDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Loader2, CheckCircle, Ruler, Package } from 'lucide-react';

// Define the storage key for fabric selection (The only key needed here now)
const FABRIC_STORAGE_KEY = 'tempFabricSelection'; 
// The TAILOR_ID_STORAGE_KEY is no longer used for navigation in this file,
// but we keep the variable for consistency.
const TAILOR_ID_STORAGE_KEY = 'tempTailorIdForOrder'; 

const FabricDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [fabric, setFabric] = useState(null);
    const [quantity, setQuantity] = useState(2.0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // --- Data Fetching and Persistence Load ---
    useEffect(() => {
        const fetchFabricDetails = async () => {
            try {
                const res = await axios.get(`/api/fabrics/${id}`);
                setFabric(res.data);
                
                const savedData = localStorage.getItem(FABRIC_STORAGE_KEY);
                if (savedData) {
                    const parsedData = JSON.parse(savedData);
                    // Only load quantity if it matches the current fabric ID
                    if (parsedData.fabricId === id) { 
                        setQuantity(parseFloat(parsedData.quantityNeeded) || 2.0); 
                    }
                }
            } catch (err) {
                console.error("Error fetching fabric details:", err);
                setError("Failed to load fabric details.");
            } finally {
                setLoading(false);
            }
        };

        fetchFabricDetails();
    }, [id]);


    const handleSelectFabric = () => {
        if (!fabric || quantity <= 0 || isNaN(parseFloat(quantity))) {
            setError('Please enter a valid quantity greater than 0.');
            return;
        }

        // FIX: Include ALL necessary fields including imageUrl and pricePerMeter
        const selectionData = {
            fabricId: fabric._id,
            name: fabric.name,
            type: fabric.type,
            imageUrl: fabric.imageUrl, // ADDED
            pricePerMeter: fabric.pricePerMeter, // ADDED
            quantityNeeded: parseFloat(quantity),
        };
        
        // DEBUG: Log what we're saving
        console.log('Saving fabric selection:', selectionData);
        console.log('Image URL:', fabric.imageUrl);
        
        // 1. Save the essential fabric data
        localStorage.setItem(FABRIC_STORAGE_KEY, JSON.stringify(selectionData));
        
        // DEBUG: Verify what was saved
        const saved = localStorage.getItem(FABRIC_STORAGE_KEY);
        console.log('Verified saved data:', saved);
        
        setIsSaving(true);
        
        // --- CRITICAL FIX: Navigate directly to the Find Tailor page ---
        // This is the new, final destination in the selection process.
        navigate('/find-tailor'); 

        // Set isSaving to false immediately as navigation is synchronous
        setIsSaving(false); 
    };

    if (loading) {
        return <div className="p-8 text-center min-h-screen pt-20"><Loader2 className="animate-spin mx-auto text-purple-600" /> Loading...</div>;
    }

    if (error || !fabric) {
        return <div className="p-8 text-center min-h-screen pt-20 text-red-600">{error || "Fabric not found."}</div>;
    }

    return (
        <div className="pt-24 pb-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Back button logic updated to navigate back to the main shop */}
                <button
                    onClick={() => navigate('/fabric-shop')}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-6"
                >
                    <ArrowLeft size={18} /> Back to Fabric Shop
                </button>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
                    <div className="md:flex md:gap-8">
                        {/* Image Section */}
                        <div className="md:w-1/2 mb-6 md:mb-0">
                            <img 
                                src={fabric.imageUrl || 'placeholder.jpg'} 
                                alt={fabric.name} 
                                className="w-full h-80 object-cover rounded-lg shadow-md"
                            />
                        </div>

                        {/* Details and Selection */}
                        <div className="md:w-1/2">
                            <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-2">{fabric.name}</h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2">
                                <Package size={18} className="text-purple-400" /> Type: **{fabric.type}**
                            </p>
                            
                            <h2 className="text-4xl font-extrabold text-green-700 dark:text-green-400 mb-6">
                                ₹{fabric.pricePerMeter} / meter
                            </h2>

                            <p className="text-gray-700 dark:text-gray-300 mb-6">{fabric.description}</p>
                            
                            {/* Quantity Input */}
                            <div className="mb-6">
                                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold mb-2">
                                    <Ruler size={18} /> Required Quantity (in meters)
                                </label>
                                <input
                                    type="number"
                                    min="0.5"
                                    step="0.1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="w-full p-3 border rounded-md text-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                                <p className="text-sm text-gray-500 mt-1">Total Estimated Cost: **₹{(fabric.pricePerMeter * (parseFloat(quantity) || 0)).toFixed(2)}**</p>
                            </div>

                            {/* Selection Button */}
                            <button
                                onClick={handleSelectFabric}
                                disabled={isSaving || quantity <= 0}
                                className={`w-full py-3 rounded-lg font-bold transition duration-300 flex items-center justify-center gap-2 
                                    ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="animate-spin h-5 w-5" /> Saving Selection...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle size={18} /> Select & Proceed
                                    </>
                                )}
                            </button>
                            {isSaving && <p className="text-sm text-center text-green-600 mt-2">Redirecting...</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FabricDetailPage;