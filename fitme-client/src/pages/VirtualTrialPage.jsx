// src/pages/VirtualTrialPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Upload, Image, User, ArrowLeft, Sparkles, Camera, Loader2, CheckCircle2 } from 'lucide-react';
import setAuthToken from '../utils/setAuthToken';

const VirtualTrialPage = () => {
  const navigate = useNavigate();
  const [personImage, setPersonImage] = useState(null);
  const [personFile, setPersonFile] = useState(null);
  
  const [garmentImage, setGarmentImage] = useState(null);
  const [garmentFile, setGarmentFile] = useState(null);

  const [resultImage, setResultImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = (e, setImage, setFile) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!personFile || !garmentFile) {
      setError('Please upload both a person and a garment image.');
      return;
    }
    setError('');
    setIsLoading(true);
    setResultImage(null);

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const formData = new FormData();
    formData.append('personImage', personFile);
    formData.append('garmentImage', garmentFile);

    try {
      const res = await axios.post(
        '/api/tryon/generate',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setResultImage(res.data.resultImageUrl);

    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg || 'Error generating image. Please try again.');
      } else if (err.request) {
        setError('Network Error: Could not connect to server.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const ImageBox = ({ image, onUpload, icon, title, subtitle }) => (
    <div className="w-full md:w-1/2 p-4">
      <div className="mb-3">
        <h3 
          className="text-xl font-bold text-gray-800 dark:text-white mb-1"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {title}
        </h3>
        <p 
          className="text-sm text-gray-600 dark:text-gray-400"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {subtitle}
        </p>
      </div>
      <div className="relative group">
        <div className="w-full h-80 border-3 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl flex items-center justify-center text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/30 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 overflow-hidden">
          {image ? (
            <>
              <img src={image} alt={title} className="h-full w-full object-contain rounded-2xl" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <Upload size={32} className="mx-auto mb-2" />
                  <p className="font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Click to change
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-3">
                {icon}
              </div>
              <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                Click to upload
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                PNG, JPG up to 10MB
              </p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => handleImageUpload(e, onUpload.setImage, onUpload.setFile)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative pt-24 pb-12 bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50 dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900 min-h-screen overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-float-delayed"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-6 transition-colors font-semibold"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        {/* Header Section */}
        <div className="mb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 dark:from-purple-500/20 dark:to-indigo-500/20 backdrop-blur-sm border border-purple-200 dark:border-purple-500/30 rounded-full mb-4">
            <Sparkles size={16} className="text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400" style={{ fontFamily: "'Inter', sans-serif" }}>
              AI Virtual Try-On
            </span>
          </div>

          <h1 
            className="text-4xl md:text-5xl font-extrabold mb-3 inline-flex items-center gap-3"
            style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
          >
            <Camera className="text-purple-600 dark:text-purple-400" size={40} />
            <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
              Virtual Trial Room
            </span>
          </h1>
          <p 
            className="text-lg text-gray-600 dark:text-gray-400"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            See how clothes look on you before you buy. Upload your photo and the garment image.
          </p>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-xl mb-6">
            <div className="flex flex-col md:flex-row">
              <ImageBox
                image={personImage}
                onUpload={{ setImage: setPersonImage, setFile: setPersonFile }}
                icon={<User size={32} className="text-purple-600 dark:text-purple-400" />}
                title="1. Your Photo"
                subtitle="Upload a clear full-body photo"
              />
              <ImageBox
                image={garmentImage}
                onUpload={{ setImage: setGarmentImage, setFile: setGarmentFile }}
                icon={<Image size={32} className="text-indigo-600 dark:text-indigo-400" />}
                title="2. Garment Photo"
                subtitle="Upload the clothing item"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-red-600 dark:text-red-400 text-sm font-medium text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                {error}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="group relative w-full py-4 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 hover:from-purple-700 hover:via-indigo-600 hover:to-blue-600 text-white font-bold rounded-xl text-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
            disabled={isLoading || !personImage || !garmentImage}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Try-On
                </>
              )}
            </span>
            
            {/* Shimmer effect */}
            {!isLoading && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
            )}
          </button>
        </form>

        {/* Loading State */}
        {isLoading && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
              <Loader2 className="animate-spin text-purple-600 dark:text-purple-400" size={40} />
            </div>
            <h3 
              className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              AI is Working Its Magic
            </h3>
            <p 
              className="text-gray-600 dark:text-gray-400"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              This may take 30-60 seconds. Please wait...
            </p>
          </div>
        )}

        {/* Result Section */}
        {resultImage && !isLoading && (
          <div className="mt-12">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                <CheckCircle2 className="text-green-600 dark:text-green-400" size={32} />
              </div>
              <h2 
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent mb-2"
                style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
              >
                Your Virtual Try-On Result
              </h2>
              <p 
                className="text-gray-600 dark:text-gray-400"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Here's how the outfit looks on you!
              </p>
            </div>

            {/* Result Image */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-purple-200 dark:border-purple-700 shadow-2xl">
                <img 
                  src={resultImage} 
                  alt="Virtual try-on result" 
                  className="w-full h-auto rounded-xl"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3">
                <Sparkles className="text-purple-400 animate-pulse" size={28} />
              </div>
              <div className="absolute -bottom-3 -left-3">
                <Sparkles className="text-indigo-400 animate-pulse" size={24} />
              </div>
            </div>

            {/* Try Again Button */}
            <div className="text-center mt-8">
              <button
                onClick={() => {
                  setResultImage(null);
                  setPersonImage(null);
                  setPersonFile(null);
                  setGarmentImage(null);
                  setGarmentFile(null);
                  setError('');
                }}
                className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Try Another Outfit
              </button>
            </div>
          </div>
        )}
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

export default VirtualTrialPage;