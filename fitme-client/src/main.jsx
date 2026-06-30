import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx'; // <-- 1. IMPORT YOUR THEME PROVIDER
import axios from 'axios';

// Configure Axios base URL dynamically using Vite's env variables.
// In local development, VITE_API_URL is omitted so requests go relative (and get proxied to localhost:5000).
// In production, VITE_API_URL should point to your deployed backend URL.
axios.defaults.baseURL = import.meta.env.VITE_API_URL || '';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      {/* 2. WRAP YOUR APP WITH IT */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
);