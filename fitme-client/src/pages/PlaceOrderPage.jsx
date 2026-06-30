// src/pages/PlaceOrderPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Loader2, Send, CheckCircle, Shirt, AlertTriangle } from 'lucide-react'; 
import setAuthToken from '../utils/setAuthToken';
import { useAuth } from '../context/AuthContext';

// Define the storage key for fabric selection
const FABRIC_STORAGE_KEY = 'tempFabricSelection';

// Helper function to get the correct image URL
const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/placeholder.jpg';
    
    // If it's already a full URL (http/https), return as-is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
    }
    
    // If it's a src/assets path, convert it to import from public
    if (imageUrl.startsWith('src/assets/')) {
        // Remove 'src/assets/' and prepend '/'
        return '/' + imageUrl.replace('src/assets/', '');
    }
    
    // If it already starts with /, it's a public path
    if (imageUrl.startsWith('/')) {
        return imageUrl;
    }
    
    // Otherwise, assume it's in public folder
    return '/' + imageUrl;
};

const PlaceOrderPage = () => {
    const navigate = useNavigate();
    const { tailorId } = useParams();
    const { user: customer } = useAuth();

    const [tailor, setTailor] = useState(null);
    const [formData, setFormData] = useState({
        garmentType: 'Kurta',
        measurements: '',
        designReference: '',
    });
    
    const [selectedFabric, setSelectedFabric] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { garmentType, measurements, designReference } = formData;

    // --- useEffect 1: Load Tailor Info ---
    useEffect(() => {
        const fetchTailorInfo = async () => {
            try {
                if (localStorage.token) {
                    setAuthToken(localStorage.token);
                }
                const res = await axios.get('/api/users/tailors'); 
                const foundTailor = res.data.find(t => t._id === tailorId);
                
                if (foundTailor) {
                    setTailor(foundTailor);
                } else {
                    setError('Tailor not found.');
                }
            } catch (err) {
                setError('Failed to fetch tailor details.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTailorInfo();
    }, [tailorId]);


    // --- useEffect 2: Load Fabric Selection from Local Storage ---
    useEffect(() => {
        const fabricData = localStorage.getItem(FABRIC_STORAGE_KEY);
        console.log('Raw localStorage data:', fabricData);
        
        if (fabricData) {
            const parsed = JSON.parse(fabricData);
            console.log('Parsed fabric data:', parsed);
            console.log('Original Image URL:', parsed.imageUrl);
            console.log('Converted Image URL:', getImageUrl(parsed.imageUrl));
            setSelectedFabric(parsed);
        } else {
            console.log('No fabric data found in localStorage');
        }
    }, []);

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!garmentType || !measurements) {
            setError('Please fill in Garment Type and Measurements.');
            return;
        }

        if (!selectedFabric || !selectedFabric.fabricId || !selectedFabric.quantityNeeded) {
            setError('Please select a fabric and specify the required quantity.');
            return;
        }

        setIsSubmitting(true);

        try {
            if (localStorage.token) {
                setAuthToken(localStorage.token);
            }

            const payload = { 
                garmentType, 
                measurements, 
                designReference,
                fabric: {
                    fabricId: selectedFabric.fabricId,
                    name: selectedFabric.name,
                    imageUrl: selectedFabric.imageUrl,
                    pricePerMeter: selectedFabric.pricePerMeter,
                    quantityNeeded: selectedFabric.quantityNeeded,
                }
            };
            
            const res = await axios.post(
                `/api/orders/${tailorId}`,
                payload
            );

            console.log('Order placed:', res.data);
            
            localStorage.removeItem(FABRIC_STORAGE_KEY); 

            setSuccess('Order request sent successfully!'); 
            setIsSubmitting(false);

        } catch (err) {
            console.error(err.response?.data);
            setError(err.response?.data?.msg || 'Failed to place order.');
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="pt-24 pb-12 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin h-12 w-12 text-emerald-500" />
            </div>
        );
    }

    const submitDisabled = isSubmitting || !selectedFabric;
    const submitButtonText = isSubmitting 
        ? 'Sending Request...' 
        : !selectedFabric 
        ? 'Select Fabric to Proceed' 
        : 'Send Stitching Request';

    return (
        <div className="pt-24 pb-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto px-6 max-w-lg">
                <button
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-6"
                >
                    <ArrowLeft size={18} /> Back to Tailor List
                </button>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                    {success ? (
                        <div className="text-center">
                            <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                Request Sent!
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                {tailor.name} has received your request and will get back to you soon.
                            </p>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="w-full bg-emerald-500 text-white font-bold py-3 rounded-md hover:bg-emerald-600 transition duration-300"
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
                                Place Order
                            </h2>
                            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                                Sending request to <span className="font-semibold">{tailor ? tailor.name : '...'}</span>
                            </p>

                            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                            
                            {/* --- FABRIC SELECTION WITH IMAGE --- */}
                            <div className={`mb-6 p-4 rounded-lg border-2 ${selectedFabric ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-900/30' : 'border-red-400 bg-red-50 dark:bg-red-900/30'}`}>
                                <h3 className="flex items-center gap-2 text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                                    <Shirt size={20} /> 1. Selected Fabric
                                </h3>
                                
                                {selectedFabric ? (
                                    <div className="flex gap-4">
                                        {/* Fabric Image */}
                                        <div className="flex-shrink-0">
                                            <img 
                                                src={getImageUrl(selectedFabric.imageUrl)} 
                                                alt={selectedFabric.name}
                                                className="w-24 h-24 object-cover rounded-md shadow-sm border-2 border-gray-200"
                                                onError={(e) => {
                                                    console.error('Image failed to load:', selectedFabric.imageUrl);
                                                    e.target.src = '/placeholder.jpg';
                                                    e.target.onerror = null; // Prevent infinite loop
                                                }}
                                                onLoad={() => console.log('Image loaded successfully')}
                                            />
                                        </div>
                                        
                                        {/* Fabric Details */}
                                        <div className="flex-1">
                                            <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
                                                {selectedFabric.name}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                Type: {selectedFabric.type}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                Price: ₹{selectedFabric.pricePerMeter}/meter
                                            </p>
                                            <p className="text-gray-800 dark:text-gray-200 font-medium mt-1">
                                                Quantity: {selectedFabric.quantityNeeded} meters
                                            </p>
                                            <p className="text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
                                                Total: ₹{(selectedFabric.pricePerMeter * selectedFabric.quantityNeeded).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center text-red-700 dark:text-red-300">
                                        <AlertTriangle size={18} className="mr-2" />
                                        Please visit the Fabric Shop to choose your material.
                                    </div>
                                )}
                                
                                <Link 
                                    to="/fabric-shop" 
                                    className="text-indigo-600 dark:text-indigo-400 hover:underline mt-3 inline-block font-medium text-sm"
                                >
                                    {selectedFabric ? 'Change Selection' : 'Go to Fabric Shop'}
                                </Link>
                            </div>

                            <form onSubmit={onSubmit}>
                                
                                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                                    2. Garment Details
                                </h3>

                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Garment Type</label>
                                    <select 
                                        name="garmentType" 
                                        value={garmentType} 
                                        onChange={onChange} 
                                        required 
                                        className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    >
                                        <option>Kurta</option>
                                        <option>Shirt</option>
                                        <option>Lehenga</option>
                                        <option>Blouse</option>
                                        <option>Pants</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Measurements</label>
                                    <textarea 
                                        name="measurements" 
                                        value={measurements} 
                                        onChange={onChange} 
                                        rows="5" 
                                        placeholder="e.g.,&#10;Chest: 95cm&#10;Waist: 80cm&#10;..." 
                                        required 
                                        className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    ></textarea>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Design Reference URL (Optional)</label>
                                    <input 
                                        type="url" 
                                        name="designReference" 
                                        value={designReference} 
                                        onChange={onChange} 
                                        placeholder="e.g., https://pinterest.com/my-design" 
                                        className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className={`w-full text-white font-bold py-3 rounded-md transition duration-300 flex items-center justify-center gap-2 ${submitDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600'}`}
                                    disabled={submitDisabled} 
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : <Send size={18} />}
                                    {submitButtonText}
                                </button>
                            </form>
                        </>
                    )} 
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderPage;