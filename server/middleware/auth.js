// project/server/middleware/auth.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Assuming '../models/User.js' is the correct path

// Middleware to protect routes and authenticate users
const protect = async (req, res, next) => {
 let token;

 // Check for token in Authorization header or x-auth-token header
 if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
 token = req.headers.authorization.split(' ')[1];
 } else if (req.header('x-auth-token')) { 
 token = req.header('x-auth-token');
 }

 // If no token found, return unauthorized
 if (!token) {
 return res.status(401).json({ msg: 'No token, authorization denied' });
 }

 try {
 // Verify token
 const decoded = jwt.verify(token, process.env.JWT_SECRET);
 // Find user by ID from token payload
 // Assuming your JWT payload structure is { user: { id: "..." } }
 // Note: Using .select('-password') is a good practice.
 const user = await User.findById(decoded.user.id).select('-password'); 

 // Check if user exists
 if (!user) {
 return res.status(401).json({ msg: 'Not authorized, user not found' });
 }
 req.user = user;
 next();
 } catch (err) {
 console.error('Auth middleware error:', err.message);
res.status(401).json({ msg: 'Token is not valid' });
 }
};

// Middleware function for role-based authorization
const authorize = (...roles) => {
 return (req, res, next) => {
// Check if user context exists (i.e., protect ran successfully)
 if (!req.user) {
 return res.status(500).json({ msg: 'User context missing (run protect middleware first)' });
}// If roles are specified, check if user has required role
// The roles array is flat here, so we check if the user's role is included.
 if (roles.length > 0 && !roles.includes(req.user.role)) {
     return res.status(403).json({ 
 msg: `Forbidden: User role '${req.user.role}' is not authorized to access this route.`
 });
 }
next();
 };
};

// EXPLICIT NAMED EXPORTS (Ensures compatibility with route files)
export { protect, authorize };