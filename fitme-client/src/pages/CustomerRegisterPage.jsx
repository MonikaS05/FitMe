// src/pages/CustomerRegisterPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShoppingBag,
  Heart
} from 'lucide-react';

const CustomerRegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/users/register/customer',
        formData
      );
      localStorage.setItem('token', res.data.token);
      setSuccess('Account created successfully! Redirecting...');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="relative pt-24 pb-12 bg-gradient-to-b from-gray-50 via-purple-50/30 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen flex items-center overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      
      <div className="container mx-auto px-6 max-w-xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 backdrop-blur-sm border border-purple-200 dark:border-purple-500/30 rounded-full mb-6">
            <Heart size={16} className="text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Welcome to FitMe</span>
          </div>

          {/* Title */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4"
            style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
          >
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent">
              Create Your Account
            </span>
          </h1>
          
          <p 
            className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Join thousands discovering their <span className="text-purple-600 dark:text-purple-400 font-semibold">perfect style</span> with AI
          </p>
        </div>

        {/* Form Card */}
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-purple-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
          
          {/* Gradient border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-3xl opacity-20 blur"></div>
          
          {/* Card */}
          <div className="relative bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl">
            
            {/* Feature Benefits */}
            <div className="mb-8 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-500/20">
              <div className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                <ShoppingBag size={20} className="text-purple-500 flex-shrink-0 mt-0.5" />
                <p>
                  <span className="font-semibold">Get instant access to:</span> Virtual Trial Room, 
                  Outfit Recommendations, Fabric Estimator & more!
                </p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              
              {/* Full Name */}
              <div className="relative">
                <label 
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Full Name
                </label>
                <div className="relative">
                  <User 
                    size={20} 
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === 'name' 
                        ? 'text-purple-500' 
                        : 'text-gray-400'
                    }`}
                  />
                  <input 
                    type="text" 
                    name="name" 
                    value={name} 
                    onChange={onChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                    required 
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border-2 border-transparent focus:border-purple-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300 outline-none"
                    placeholder="Enter your full name"
                  />
                  {/* Focus glow */}
                  {focusedField === 'name' && (
                    <div className="absolute inset-0 rounded-xl bg-purple-500/10 animate-pulse -z-10"></div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail 
                    size={20} 
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === 'email' 
                        ? 'text-purple-500' 
                        : 'text-gray-400'
                    }`}
                  />
                  <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={onChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    required 
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border-2 border-transparent focus:border-purple-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300 outline-none"
                    placeholder="your.email@example.com"
                  />
                  {focusedField === 'email' && (
                    <div className="absolute inset-0 rounded-xl bg-purple-500/10 animate-pulse -z-10"></div>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock 
                    size={20} 
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === 'password' 
                        ? 'text-purple-500' 
                        : 'text-gray-400'
                    }`}
                  />
                  <input 
                    type="password" 
                    name="password" 
                    value={password}
                    onChange={onChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    minLength="6" 
                    required 
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border-2 border-transparent focus:border-purple-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300 outline-none"
                    placeholder="Minimum 6 characters"
                  />
                  {focusedField === 'password' && (
                    <div className="absolute inset-0 rounded-xl bg-purple-500/10 animate-pulse -z-10"></div>
                  )}
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Use at least 6 characters for a secure password
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 animate-shake">
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium text-center">{error}</p>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 size={20} className="text-green-600 dark:text-green-400" />
                    <p className="text-green-600 dark:text-green-400 text-sm font-medium">{success}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                className="group relative w-full py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 hover:from-purple-700 hover:via-pink-600 hover:to-rose-600 text-white font-bold rounded-xl text-lg shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Create Account
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </button>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <a 
                    href="/login" 
                    className="text-purple-600 dark:text-purple-400 font-semibold hover:underline transition-all"
                  >
                    Sign in here
                  </a>
                </p>
              </div>
            </form>

            {/* Decorative sparkles */}
            <div className="absolute -top-3 -right-3">
              <Sparkles className="text-purple-400 animate-pulse" size={24} />
            </div>
            <div className="absolute -bottom-3 -left-3">
              <Sparkles className="text-pink-400 animate-pulse" size={20} />
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">100% Free Forever</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Instant Access</span>
          </div>
        </div>

        {/* Decorative bottom element */}
        <div className="mt-12 flex justify-center">
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full"></div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default CustomerRegisterPage;