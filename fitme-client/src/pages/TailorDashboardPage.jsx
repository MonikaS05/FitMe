// src/pages/TailorDashboardPage.jsx (CORRECTED)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- FIX: Import the custom hook
import axios from 'axios';
import { Loader2 } from 'lucide-react'; 

const TailorDashboardPage = () => {
    // FIX: Use the imported hook instead of importing AuthContext and useContext
    const { user } = useAuth(); 
    
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Fetch orders assigned to this tailor
    useEffect(() => {
        const fetchTailorOrders = async () => {
            try {
                // Use user.token (or whatever variable holds the JWT)
                const token = localStorage.token || user?.token || user?.jwtToken;
                if (!token) {
                    setLoading(false);
                    return;
                }
                
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                };
                
                // Assuming the user object has the token attached from loadUser/login
                const res = await axios.get('/api/orders/tailor', config);
                setOrders(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching tailor orders:", err.response?.data || err);
                setError("Failed to load orders. Please check network connection.");
                setLoading(false);
            }
        };

        // Ensure user is loaded and confirmed as tailor before fetching data
        if (user && user.role === 'tailor') {
            fetchTailorOrders();
        } else if (!user && !loading) {
            // If user is null and loading is false, something went wrong with auth/routing
            setLoading(false);
        }
    }, [user, loading]); // Added loading to the dependency array for robustness
    
    const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;

    if (loading) return <div className="p-8 text-center"><Loader2 className="animate-spin h-8 w-8 mx-auto text-indigo-500" /> Loading Tailor Dashboard...</div>;
    if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;
    
    if (!user || user.role !== 'tailor') {
        return <div className="p-8 text-center text-red-600">Access Denied.</div>;
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-8 text-indigo-700">✂️ Tailor Dashboard</h1>
            <p className="text-xl mb-6">Welcome back, **{user.name}**.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Pending Orders Card */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
                    <h2 className="text-lg font-semibold text-gray-600">Pending Requests</h2>
                    <p className="text-4xl font-bold mt-1 text-yellow-600">{pendingOrdersCount}</p>
                    <Link to="/tailor/orders" className="text-sm text-indigo-500 hover:underline mt-2 block">
                        Review Now &rarr;
                    </Link>
                </div>
                
                {/* ... rest of the component logic ... */}
                
            </div>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-700">Recent Orders</h2>
            {/* Map over a limited number of recent orders here */}
            {orders.slice(0, 3).map(order => (
                <div key={order._id} className="border p-4 mb-3 rounded-lg bg-gray-50 flex justify-between items-center">
                    <div>
                        <p className="font-semibold">{order.garmentType} for {order.customer.name}</p>
                        <p className="text-sm text-gray-600">Status: **{order.status}** | Fabric: {order.fabric?.name}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                        {order.status}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default TailorDashboardPage;