import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Ruler, 
  Upload, 
  Camera, 
  ArrowLeft, 
  Check,
  Info,
  ExternalLink,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import ManualMode from './fabricModes/ManualMode';
import ImageMode from './fabricModes/ImageMode';

const FabricEstimator = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('manual');
  const [result, setResult] = useState(null);

  const handleCalculate = (measurements, garmentInfo) => {
    const height = parseFloat(measurements.height) || 170;
    const chest = parseFloat(measurements.chest) || 90;
    const waist = parseFloat(measurements.waist) || 75;
    
    const heightFactor = height / 170;
    const bodyFactor = ((chest + waist) / 2) / 82.5;
    
    const baseFabric = garmentInfo.base;
    const fabricNeeded = (baseFabric * heightFactor * bodyFactor).toFixed(2);
    
    const withWastage = (fabricNeeded * 1.1).toFixed(2);
    
    setResult({
      fabric: fabricNeeded,
      withWastage: withWastage,
      garment: garmentInfo,
      measurements: { ...measurements },
      wastage: (withWastage - fabricNeeded).toFixed(2)
    });

    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest'
      });
    }, 100);
  };

  const resetForm = () => {
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCameraMode = () => {
    const width = 900;
    const height = 800;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    window.open(
      '/fabric-camera.html',
      'FabricCameraMode',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  };

  return (
    <div className="relative pt-24 pb-12 bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50 dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900 min-h-screen overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-float-delayed"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
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
              Smart Calculation
            </span>
          </div>

          <h1 
            className="text-4xl md:text-5xl font-extrabold mb-3 inline-flex items-center gap-3"
            style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
          >
            <Ruler className="text-purple-600 dark:text-purple-400" size={40} />
            <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
              Fabric Estimator
            </span>
          </h1>
          <p 
            className="text-lg text-gray-600 dark:text-gray-400"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Calculate exact fabric requirements for your garment with AI precision
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 border-2 border-gray-200 dark:border-gray-700 shadow-xl">
              
              {/* Mode Selection */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  onClick={() => setMode('manual')}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    mode === 'manual'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500'
                  }`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  <Ruler className="w-5 h-5" />
                  <span>Manual Entry</span>
                </button>
                <button
                  onClick={() => setMode('upload')}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    mode === 'upload'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500'
                  }`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload Image</span>
                </button>
                <button
                  onClick={openCameraMode}
                  className="flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  <Camera className="w-5 h-5" />
                  <span>Camera AI</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <div className="min-h-[400px]">
                {mode === 'manual' && <ManualMode onCalculate={handleCalculate} />}
                {mode === 'upload' && <ImageMode onCalculate={handleCalculate} />}
              </div>
            </div>
          </div>

          <div className="space-y-6" id="results-section">
            {!result && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Info className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 
                      className="font-bold text-gray-800 dark:text-white mb-3"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      How it works
                    </h3>
                    <ul 
                      className="text-sm text-gray-600 dark:text-gray-400 space-y-2"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                        <span>Choose your preferred input method</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                        <span>Provide accurate measurements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                        <span>Select your garment type</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                        <span>Get instant fabric calculation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                        <span>Includes 10% wastage allowance</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 
                    className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <Camera size={18} className="text-indigo-600 dark:text-indigo-400" />
                    Camera Mode (AI-Powered)
                  </h4>
                  <div 
                    className="space-y-2 text-sm text-gray-600 dark:text-gray-400"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <p className="flex items-center gap-2">
                      <span>📸</span> Opens in new window
                    </p>
                    <p className="flex items-center gap-2">
                      <span>🤖</span> Uses MediaPipe AI for detection
                    </p>
                    <p className="flex items-center gap-2">
                      <span>📏</span> Auto-calculates measurements
                    </p>
                  </div>
                </div>
              </div>
            )}

            {result && (
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 shadow-2xl animate-fadeIn">
                <div className="flex items-center justify-between mb-6">
                  <h3 
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Estimation Result
                  </h3>
                  <div className="p-2 bg-green-500 rounded-full">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-6">
                  <p 
                    className="text-sm text-gray-600 dark:text-gray-400 mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Fabric Required
                  </p>
                  <p 
                    className="text-5xl font-bold text-gray-900 dark:text-white"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {result.fabric}
                    <span className="text-xl ml-2">meters</span>
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-purple-100" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Garment Type
                    </span>
                    <span className="font-semibold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {result.garment.emoji} {result.garment.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-purple-100" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Base Fabric
                    </span>
                    <span className="font-semibold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {result.fabric}m
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-purple-100" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Wastage (10%)
                    </span>
                    <span className="font-semibold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                      +{result.wastage}m
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-purple-400">
                    <span className="text-sm text-purple-100 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Total Recommended
                    </span>
                    <span className="font-bold text-xl text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {result.withWastage}m
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-5 mb-6">
                  <p 
                    className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Measurements Used
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <div className="flex flex-col">
                      <span className="text-gray-500 dark:text-gray-400 text-xs">Height</span>
                      <span className="font-bold text-gray-900 dark:text-white text-lg">
                        {result.measurements.height}cm
                      </span>
                    </div>
                    {result.measurements.chest && (
                      <div className="flex flex-col">
                        <span className="text-gray-500 dark:text-gray-400 text-xs">Chest</span>
                        <span className="font-bold text-gray-900 dark:text-white text-lg">
                          {result.measurements.chest}cm
                        </span>
                      </div>
                    )}
                    {result.measurements.waist && (
                      <div className="flex flex-col">
                        <span className="text-gray-500 dark:text-gray-400 text-xs">Waist</span>
                        <span className="font-bold text-gray-900 dark:text-white text-lg">
                          {result.measurements.waist}cm
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/find-tailor')}
                    className="w-full bg-white text-purple-600 py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <TrendingUp size={20} />
                    <span>Connect with Tailor</span>
                  </button>
                  <button
                    onClick={resetForm}
                    className="w-full bg-purple-500/30 backdrop-blur-sm text-white py-4 rounded-xl font-bold hover:bg-purple-500/50 transition-all duration-300"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    New Calculation
                  </button>
                </div>
              </div>
            )}
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

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FabricEstimator;  