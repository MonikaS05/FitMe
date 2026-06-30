// server/routes/auth.js

import express from 'express';
import { protect } from '../middleware/auth.js'; 
import User from '../models/User.js';

const router = express.Router();

// @route   GET /api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    // Access the user ID using req.user._id
    const user = await User.findById(req.user._id).select('-password'); 
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;