// project/server/routes/fabrics.js
import express from 'express';
import { getFabrics, getFabricById } from '../controllers/fabricController.js';

const router = express.Router();

// Public routes for the Fabric Shop
router.get('/', getFabrics);
router.get('/:id', getFabricById);

export default router;