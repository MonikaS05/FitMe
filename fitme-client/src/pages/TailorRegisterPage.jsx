// src/pages/TailorRegisterPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Briefcase, 
  Mail, 
  Lock, 
  MapPin, 
  Phone, 
  FileText, 
  Sparkles, 
  CheckCircle2,
  User,
  Scissors,
  ArrowRight
} from 'lucide-react';

// Define specialization options
const specializationsList = [
  "Womenswear (General)",
  "Menswear (General)",
  "Bridal & Formal",
  "Kids Wear",
  "Kurti & Suits",
  "Blouses",
  "Alterations",
];

const TailorRegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    phoneNumber: '',
    bio: '',
    specializations: [],
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const { name, email, password, location, phoneNumber, bio, specializations } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, specializations: [...specializations, value] });
    } else {
      setFormData({
        ...formData,
        specializations: specializations.filter((spec) => spec !== value),
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (specializations.length === 0) {
      setError('Please select at least one specialization.');
      return;
    }

    try {
      const newTailor = { 
        name, 
        email, 
        password, 
        location, 
        phoneNumber, 
        bio, 
        specializations 
      };

      const res = await axios.post(
        'http://localhost:5000/api/users/register/tailor',
        newTailor,
        { headers: { 'Content-Type': 'application/json' } }
      );

      setSuccess('Registration successful! Redirecting to dashboard...');
      login(res.data.token); 

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred. Please try again.');
      console.error(err.response?.data);
    }
  };

  return (
    <div className="relative pt-24 pb-12 bg-gradient-to-b from-gray-50 via-amber-50/30 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 backdrop-blur-sm border border-amber-200 dark:border-amber-500/30 rounded-full mb-6">
            <Scissors size={16} className="text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">Join Our Tailor Network</span>
          </div>

          {/* Title */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4"
            style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
          >
            <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Register as a Tailor
            </span>
          </h1>
          
          <p 
            className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Grow your business and connect with clients looking for <span className="text-amber-600 dark:text-amber-400 font-semibold">skilled professionals</span>
          </p>
        </div>

        {/* Form Card */}
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-amber-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
          
          {/* Gradient border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 rounded-3xl opacity-20 blur"></div>
          
          {/* Card */}
          <div className="relative bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl">
            
            <form onSubmit={onSubmit} className="space-y-6">
              
              {/* Full Name */}
              <div className="relative">
                <label 
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Full Name
                </label>
                <div className="relative group">
                  <User 
                    size={20} 
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === 'name' 
                        ? 'text-amber-500' 
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
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border-2 border-transparent focus:border-amber-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300 outline-none"
                    placeholder="Enter your full name"
                  />
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
                        ? 'text-amber-500' 
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
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border-2 border-transparent focus:border-amber-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300 outline-none"
                    placeholder="your.email@example.com"
                  />
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
                        ? 'text-amber-500' 
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
                    required 
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border-2 border-transparent focus:border-amber-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300 outline-none"
                    placeholder="Minimum 6 characters"
                  />
                </div>
              </div>

              {/* Location & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Location (City)
                  </label>
                  <div className="relative">
                    <MapPin 
                      size={20} 
                      className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === 'location' 
                          ? 'text-amber-500' 
                          : 'text-gray-400'
                      }`}
                    />
                    <input 
                      type="text" 
                      name="location" 
                      value={location} 
                      onChange={onChange}
                      onFocus={() => setFocusedField('location')}
                      onBlur={() => setFocusedField('')}
                      required 
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border-2 border-transparent focus:border-amber-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300 outline-none"
                      placeholder="Your city"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone 
                      size={20} 
                      className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === 'phoneNumber' 
                          ? 'text-amber-500' 
                          : 'text-gray-400'
                      }`}
                    />
                    <input 
                      type="tel" 
                      name="phoneNumber" 
                      value={phoneNumber} 
                      onChange={onChange}
                      onFocus={() => setFocusedField('phoneNumber')}
                      onBlur={() => setFocusedField('')}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border-2 border-transparent focus:border-amber-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300 outline-none"
                      placeholder="Optional"
                    />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Short Bio
                </label>
                <div className="relative">
                  <FileText 
                    size={20} 
                    className={`absolute left-4 top-4 transition-colors duration-300 ${
                      focusedField === 'bio' 
                        ? 'text-amber-500' 
                        : 'text-gray-400'
                    }`}
                  />
                  <textarea
                    name="bio"
                    value={bio}
                    onChange={onChange}
                    onFocus={() => setFocusedField('bio')}
                    onBlur={() => setFocusedField('')}
                    rows="4"
                    placeholder="Describe your shop, experience, and services..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border-2 border-transparent focus:border-amber-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300 outline-none resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Specializations */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  <div className="flex items-center gap-2">
                    <Briefcase size={18} className="text-amber-500" />
                    <span>Specializations</span>
                    <span className="text-xs text-gray-500">(Select all that apply)</span>
                  </div>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-5 rounded-xl bg-gradient-to-br from-gray-50 to-amber-50/50 dark:from-gray-700 dark:to-gray-700/50 border border-gray-200 dark:border-gray-600">
                  {specializationsList.map((spec) => (
                    <label 
                      key={spec} 
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                        specializations.includes(spec)
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105'
                          : 'bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-gray-500 hover:scale-102'
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="specializations"
                        value={spec}
                        checked={specializations.includes(spec)}
                        onChange={onCheckboxChange}
                        className="hidden"
                      />
                      <div className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                        specializations.includes(spec)
                          ? 'bg-white border-white'
                          : 'border-gray-300 dark:border-gray-400'
                      }`}>
                        {specializations.includes(spec) && (
                          <CheckCircle2 size={16} className="text-amber-500" />
                        )}
                      </div>
                      <span className="text-sm font-medium">{spec}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30">
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
                className="group relative w-full py-4 bg-gradient-to-r from-amber-600 via-orange-500 to-pink-500 hover:from-amber-700 hover:via-orange-600 hover:to-pink-600 text-white font-bold rounded-xl text-lg shadow-2xl shadow-amber-500/50 hover:shadow-amber-500/70 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Create Account
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </button>
            </form>

            {/* Decorative sparkles */}
            <div className="absolute -top-3 -right-3">
              <Sparkles className="text-amber-400 animate-pulse" size={24} />
            </div>
            <div className="absolute -bottom-3 -left-3">
              <Sparkles className="text-orange-400 animate-pulse" size={20} />
            </div>
          </div>
        </div>

        {/* Decorative bottom element */}
        <div className="mt-12 flex justify-center">
          <div className="h-1 w-32 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 rounded-full"></div>
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

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default TailorRegisterPage;