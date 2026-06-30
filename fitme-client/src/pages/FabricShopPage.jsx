// src/pages/FabricShopPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Component for displaying a single fabric item
const FabricCard = ({ fabric }) => (
    <div className="border rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-xl transition duration-300">
        <img 
            src={fabric.imageUrl || 'placeholder.jpg'} 
            alt={fabric.name} 
            className="w-full h-48 object-cover mb-4 rounded"
        />
        <h3 className="text-xl font-semibold text-gray-800">{fabric.name}</h3>
        <p className="text-sm text-gray-600 mt-1">Type: {fabric.type}</p>
        <p className="text-2xl font-bold text-green-700 mt-3">₹{fabric.pricePerMeter} / meter</p>
        <Link 
            to={`/fabric-shop/${fabric._id}`} 
            className="mt-4 bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 transition"
        >
            Select Fabric
        </Link>
    </div>
);


const FabricShopPage = () => {
    // FIX 1: Ensure fabrics is initialized as an empty array
    const [fabrics, setFabrics] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFabrics = async () => {
            try {
                // Calls the new public endpoint
                const res = await axios.get('/api/fabrics');
                
                // FIX 2: Validate that the received data is an array before setting state
                if (Array.isArray(res.data)) {
                    setFabrics(res.data);
                } else {
                    console.error("API did not return an array:", res.data);
                    setError("Data format error: Expected a list of fabrics.");
                }
                
                setLoading(false);
            } catch (err) {
                console.error("Error fetching fabrics:", err);
                setError("Failed to load fabric shop data. Ensure backend is running.");
                setLoading(false);
            }
        };
        fetchFabrics();
    }, []);

    if (loading) return <div className="p-8 text-center">Loading Fabric Shop...</div>;
    if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-10 text-center text-purple-700">🛍️ The Fabric Shop</h1>
            <p className="text-center text-lg mb-8 text-gray-600">Browse and select the perfect material for your custom garment.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {/* FIX 3: Add explicit check that fabrics is an array and has length before mapping */}
                {Array.isArray(fabrics) && fabrics.length > 0 ? (
                    fabrics.map(fabric => (
                        <FabricCard key={fabric._id} fabric={fabric} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        {/* Only show this message if loading is complete */}
                        No fabrics are currently available.
                    </p>
                )}
            </div>
        </div>
    );
};

export default FabricShopPage;