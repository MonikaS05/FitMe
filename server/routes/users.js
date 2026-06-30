// server/routes/users.js

import express from 'express';
// 1. Import all necessary controller functions
import { 
    registerCustomer, 
    registerTailor, 
    loginUser, 
    getTailors // <-- Controller for fetching tailors
} from '../controllers/UserController.js';

// 2. Import the named exports for authentication and authorization
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// --- Public Routes ---
// @route   POST /api/users/register/customer
router.post('/register/customer', registerCustomer);

// @route   POST /api/users/register/tailor
router.post('/register/tailor', registerTailor);

// @route   POST /api/users/login
router.post('/login', loginUser);

// --- Private Routes ---
// @route   GET /api/users/tailors
// @desc    Get all tailors (Requires user to be logged in)
// @access  Private
// FIX: Using 'protect' to ensure the user is authenticated before viewing tailors.
router.get('/tailors', protect, getTailors);

// You can add a route here to update a tailor's profile (example)
// router.put('/profile', protect, authorize('tailor'), updateTailorProfile);

export default router;