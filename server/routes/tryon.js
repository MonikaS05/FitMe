// server/routes/tryon.js

import express from 'express';
import multer from 'multer';
import { generateTryOn } from '../controllers/tryOnController.js';
// We need to import 'protect' because it's a named export in the middleware
import { protect } from '../middleware/auth.js'; 

const router = express.Router();

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// @route   POST /api/tryon/generate
// @desc    Generate a virtual try-on image
// @access  Private (only logged-in users can use it)
router.post(
  '/generate',
  // FIX: Replace the undefined 'auth' variable with the imported 'protect' function
  protect, // 1. Check if user is logged in
  upload.fields([ // 2. Parse the image files
    { name: 'personImage', maxCount: 1 },
    { name: 'garmentImage', maxCount: 1 }
  ]),
  generateTryOn // 3. Run the controller logic
);

export default router;