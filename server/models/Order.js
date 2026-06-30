// project/server/models/Order.js

import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tailor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // --- NEW FABRIC FIELDS ---
  fabric: {
    type: new Schema({
      // Link to the separate Fabric model
      fabricId: { type: Schema.Types.ObjectId, ref: "Fabric", required: true },
      name: { type: String, required: true },
      imageUrl: { type: String },
      pricePerMeter: { type: Number, required: true },
      quantityNeeded: { type: Number, required: true },
    }),
    required: true,
  },
  // --- END NEW FABRIC FIELDS ---
  garmentType: {
    type: String,
    required: true,
  },
  measurements: {
    type: String,
    required: true,
  },
  designReference: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "InProgress", "Completed", "Cancelled"],
    default: "Pending",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
  },
  feedback: {
    type: String,
  },
});

// FIX: Implement the Mongoose existence check to prevent OverwriteModelError.
// It checks if 'Order' is already in the models collection; if so, it uses the existing one.
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
