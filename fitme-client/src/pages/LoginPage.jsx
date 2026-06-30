import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const res = await axios.post(
        '/api/users/login',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      login(res.data.token);
      navigate('/dashboard');

    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg || 'An error occurred. Please try again.');
      } else if (err.request) {
        setError('Network Error: Could not connect to server. Please ensure it is running.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative pt-24 pb-12 bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50 dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900 min-h-screen flex items-center overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-float-delayed"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Welcome Section - Left Side */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 backdrop-blur-sm border border-purple-200 dark:border-purple-500/30 rounded-full mb-6">
              <Sparkles size={16} className="text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Welcome Back!</span>
            </div>

            {/* Main Heading */}
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6"
              style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
            >
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">
                Continue Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                Fashion Journey
              </span>
            </h1>

            <p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Sign in to access your personalized dashboard, <span className="text-purple-600 dark:text-purple-400 font-semibold">AI-powered features</span>, and continue creating your perfect wardrobe.
            </p>

            {/* Feature highlights */}
            <div className="space-y-4">
              {[
                { icon: '✨', text: 'Smart Fabric Estimation' },
                { icon: '👔', text: 'Virtual Trial Room' },
                { icon: '🎨', text: 'Personalized Recommendations' },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-xl">
                    {feature.icon}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Login Form - Right Side */}
          <div className="order-1 lg:order-2">
            <div className="relative group">
              {/* Gradient border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 rounded-3xl opacity-75 group-hover:opacity-100 blur transition-all duration-500"></div>
              
              {/* Form Container */}
              <div className="relative bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl">
                
                {/* Form Header */}
                <div className="text-center mb-8">
                  <h2 
                    className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Sign In
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Enter your credentials to continue
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="space-y-6">
                  
                  {/* Email Field */}
                  <div>
                    <label 
                      className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail size={20} className="text-gray-400" />
                      </div>
                      <input 
                        type="email" 
                        name="email" 
                        value={email} 
                        onChange={onChange} 
                        required 
                        placeholder="your@email.com"
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label 
                      className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock size={20} className="text-gray-400" />
                      </div>
                      <input 
                        type={showPassword ? "text" : "password"}
                        name="password" 
                        value={password} 
                        onChange={onChange} 
                        required 
                        placeholder="Enter your password"
                        className="w-full pl-12 pr-12 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="text-right">
                    <a 
                      href="#" 
                      className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Forgot Password?
                    </a>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                      <p className="text-red-600 dark:text-red-400 text-sm text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="group w-full relative px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 hover:from-purple-700 hover:via-pink-600 hover:to-amber-600 text-white font-bold rounded-xl text-lg shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? 'Signing In...' : 'Sign In'}
                      {!isLoading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                    </span>
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  </button>
                </form>

                {/* Sign Up Link */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600 dark:text-gray-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Don't have an account?{' '}
                    <Link 
                      to="/signup" 
                      className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-bold transition-colors"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Quick & Secure
                    </span>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="flex justify-center items-center gap-6 text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    <span className="text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;