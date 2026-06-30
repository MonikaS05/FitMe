// server/index.js

import dotenv from 'dotenv';
dotenv.config();

// Fix Node.js DNS resolver issue
import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '1.1.1.1']);

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import orderRoutes from './routes/orders.js';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import tryOnRoutes from './routes/tryon.js';
import fabricRoutes from './routes/fabrics.js';

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tryon', tryOnRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/fabrics', fabricRoutes);

app.get('/', (req, res) => {
  res.send('FitMe API is running successfully!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});