// project/server/routes/orders.js
import express from 'express';
// 1. IMPORT the new middleware functions
import { protect, authorize } from '../middleware/auth.js'; 
import { 
    createOrder, 
    getTailorOrders,
    // Add other functions here like getCustomerOrders, updateOrderStatus
} from '../controllers/orderController.js';

const router = express.Router();

// @route   POST /api/orders/:tailorId
// @desc    Create a new order for a specific tailor
// @access  Private (Requires login)
// Note: We use 'protect' here instead of the old 'auth'
router.post('/:tailorId', protect, createOrder);

// We will add more routes here later, like:
// router.get('/myorders', protect, getCustomerOrders); // For customers (Requires login)

// @route   GET /api/orders/tailor
// @desc    Get all orders assigned to the logged-in tailor
// @access  Private (Tailor only)
// 2. NEW TAILOR ROUTE: Requires authentication (protect) AND the user role must be 'tailor' (authorize('tailor'))
router.get('/tailor', protect, authorize('tailor'), getTailorOrders); 

export default router;