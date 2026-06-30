// project/server/models/Fabric.js
import mongoose from 'mongoose';

const FabricSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: { // e.g., Cotton, Silk, Wool, Synthetic
        type: String,
        required: true,
    },
    pricePerMeter: {
        type: Number,
        required: true,
    },
    stockQuantity: {
        type: Number,
        default: 0,
    },
    imageUrl: {
        type: String, // URL to the image asset
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isActive: { // Can be toggled off if a fabric is sold out or discontinued
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// FIX: Implement the Mongoose existence check to prevent OverwriteModelError.
export default mongoose.models.Fabric || mongoose.model('Fabric', FabricSchema);