// project/server/models/User.js

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: { // Crucial for role-based access
        type: String,
        enum: ['customer', 'tailor', 'admin'],
        default: 'customer',
    },
    // --- TAILOR-SPECIFIC FIELDS ---
    location: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0,
    },
    phoneNumber: {
        type: String,
    },
    bio: {
        type: String,
        maxlength: 500
    },
    specializations: {
        type: [String],
    },
    // ------------------------------
    date: {
        type: Date,
        default: Date.now,
    },
});

// FIX: Implement the Mongoose existence check to prevent OverwriteModelError.
// It checks if 'User' is already in the models collection; if so, it uses the existing one.
export default mongoose.models.User || mongoose.model('User', UserSchema);