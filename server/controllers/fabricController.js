// project/server/controllers/fabricController.js
import Fabric from "../models/Fabric.js";

// @desc    Get all active fabrics (for customer shop)
// @route   GET /api/fabrics
// @access  Public
export const getFabrics = async (req, res) => {
  try {
    const fabrics = await Fabric.find({ isActive: true }).sort("name");
    res.status(200).json(fabrics);
  } catch (error) {
    console.error("Error fetching fabrics:", error);
    res.status(500).json({ msg: "Server error fetching fabrics" });
  }
};

// @desc    Get single fabric by ID
// @route   GET /api/fabrics/:id
// @access  Public
export const getFabricById = async (req, res) => {
  try {
    const fabric = await Fabric.findById(req.params.id);
    if (!fabric || !fabric.isActive) {
      return res.status(404).json({ msg: "Fabric not found or inactive" });
    }
    res.status(200).json(fabric);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Fabric not found" });
    }
    console.error("Error fetching fabric by ID:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
