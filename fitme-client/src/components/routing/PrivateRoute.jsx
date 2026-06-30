// src/components/routing/PrivateRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

/**
 * Component to protect routes based on authentication status and user role.
 */
const PrivateRoute = ({ allowedRoles }) => {
    const { user, loading, isAuthenticated } = useAuth(); 

    // --- FIX 1: THE LOADING GATE ---
    // If loading is true, we MUST stay here. If we redirect now, 
    // the user gets kicked out before the 'loadUser' API call finishes.
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Verifying session...</p>
                </div>
            </div>
        );
    }

    // --- FIX 2: AUTHENTICATION CHECK ---
    // We check if the user is authenticated. 
    // We also check localStorage as a backup to see if a session SHOULD exist.
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    // --- FIX 3: ROLE-BASED ACCESS ---
    if (allowedRoles && allowedRoles.length > 0) {
        if (!allowedRoles.includes(user.role)) {
            // Redirect unauthorized users to their specific dashboard
            const redirectPath = user.role === 'tailor' ? '/tailor-dashboard' : '/dashboard';
            
            console.warn(`Access Denied: ${user.role} cannot access this route.`);
            return <Navigate to={redirectPath} replace />;
        }
    }

    // If all checks pass, render the child routes
    return <Outlet />;
};

export default PrivateRoute;