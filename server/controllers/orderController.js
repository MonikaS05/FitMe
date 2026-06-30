// project/server/controllers/orderController.js
import Order from '../models/Order.js';
import User from '../models/User.js';
import Fabric from '../models/Fabric.js'; 
import { sendOrderNotification } from '../config/emailService.js';

// @desc    Create a new stitching order
// @route   POST /api/orders/:tailorId
// @access  Private
export const createOrder = async (req, res) => {
    const { garmentType, measurements, designReference, fabric } = req.body;
    const { tailorId } = req.params;
    const customerId = req.user._id; 
    
    try {
        // 1. Basic validation for the new fabric object
        if (!fabric || !fabric.fabricId || !fabric.quantityNeeded) {
            return res.status(400).json({ msg: 'Fabric selection is missing or incomplete.' });
        }
        
        // 2. Find Tailor and Customer
        const tailor = await User.findById(tailorId);
        if (!tailor || tailor.role !== 'tailor') {
            return res.status(404).json({ msg: 'Tailor not found.' });
        }

        const customer = await User.findById(customerId);
        if (!customer) {
            return res.status(404).json({ msg: 'Customer profile not found.' });
        }
        
        // 3. Look up fabric details for data integrity 
        const fabricDetails = await Fabric.findById(fabric.fabricId);
        if (!fabricDetails) {
            return res.status(404).json({ msg: 'Selected fabric not found.' });
        }

        // 4. Create new order instance
        const newOrder = new Order({
            customer: customerId,
            tailor: tailorId,
            garmentType,
            measurements,
            designReference,
            status: 'Pending',
            fabric: {
                fabricId: fabricDetails._id,
                name: fabricDetails.name,
                pricePerMeter: fabricDetails.pricePerMeter,
                quantityNeeded: fabric.quantityNeeded,
            }
        });

        // 5. Save the order
        const order = await newOrder.save();

        // 6. Send notification email to tailor
        await sendOrderNotification({
            recipientEmail: tailor.email,
            recipientName: tailor.name,
            recipientRole: tailor.role, 
            customerName: customer.name,
            garmentType: garmentType,
            orderId: order._id, 
        });

        // 7. Respond to the frontend
        res.json(order);

    } catch (err) {
        console.error(err.message);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ msg: err.message });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Get orders assigned to the logged-in tailor
// @route   GET /api/orders/tailor
// @access  Private (Tailor only)
export const getTailorOrders = async (req, res) => {
    if (req.user.role !== 'tailor') {
        return res.status(403).json({ msg: 'Access denied. Tailor role required.' });
    }
    
    try {
        const orders = await Order.find({ tailor: req.user._id })
            .populate('customer', 'name email phoneNumber') 
            .sort({ orderDate: -1 });
        
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching tailor orders:', error);
        res.status(500).json({ msg: 'Server error fetching tailor orders' });
    }
};