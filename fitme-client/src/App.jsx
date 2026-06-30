// src/App.jsx

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/routing/PrivateRoute'; // We now use this wrapper component

// Import all pages (including the new ones)
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import CustomerRegisterPage from './pages/CustomerRegisterPage';
import TailorRegisterPage from './pages/TailorRegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import VirtualTrialPage from './pages/VirtualTrialPage';
import FindTailorPage from './pages/FindTailorPage';
import OutfitRecommendationPage from './pages/OutfitRecommendationPage';
import ExploreByStatePage from './pages/ExploreByStatePage';
import PlaceOrderPage from './pages/PlaceOrderPage.jsx';
import FabricEstimator from './pages/FabricEstimator.jsx'; 
import BodyShapeFinderPage from './pages/BodyShapeFinderPage.jsx';

// New Tailor Pages
import TailorDashboardPage from './pages/TailorDashboardPage';
import TailorOrdersPage from './pages/TailorOrdersPage';
// New Fabric Shop Pages
import FabricShopPage from './pages/FabricShopPage';
import FabricDetailPage from './pages/FabricDetailPage';


function App() {
  const { loadUser } = useAuth();

  useEffect(() => {
    // Attempt to load the user (check token) on initial render
    loadUser();
  }, [loadUser]);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/register-customer" element={<CustomerRegisterPage />} />
        <Route path="/register-tailor" element={<TailorRegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* --- PUBLIC FABRIC SHOP ROUTES (No Auth Required to Browse) --- */}
        <Route path="/fabric-shop" element={<FabricShopPage />} />
        <Route path="/fabric-shop/:id" element={<FabricDetailPage />} />


        {/* ========================================================= */}
        {/* --- 1. CUSTOMER ROUTES (Protected by PrivateRoute) --- */}
        {/* We use a single <Route> wrapper that defines the security check, then nested routes */}
        <Route element={<PrivateRoute allowedRoles={['customer']} />}>
            {/* These pages require the user to be logged in AND have the 'customer' role */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/virtual-trial" element={<VirtualTrialPage />} />
            <Route path="/find-tailor" element={<FindTailorPage />} />
            <Route path="/outfit-recommendation" element={<OutfitRecommendationPage />} />
            <Route path="/explore-by-state" element={<ExploreByStatePage />} />
            <Route path="/fabric-shop" element={<FabricShopPage />} />
            <Route path="/fabric-shop/:id" element={<FabricDetailPage />} />
            <Route path="/place-order/:tailorId" element={<PlaceOrderPage />} />
            <Route path="/fabric-estimator" element={<FabricEstimator />} />
            <Route path="/body-shape-outfits" element={<BodyShapeFinderPage />} />
        </Route>


        {/* ========================================================= */}
        {/* --- 2. TAILOR ROUTES (Protected and Role Restricted) --- */}
        {/* These require the user to be logged in AND have the 'tailor' role */}
        <Route element={<PrivateRoute allowedRoles={['tailor']} />}>
            <Route path="/tailor/dashboard" element={<TailorDashboardPage />} />
            <Route path="/tailor/orders" element={<TailorOrdersPage />} />
            {/* You would add other tailor-specific pages here, e.g., /tailor/profile */}
        </Route>

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;