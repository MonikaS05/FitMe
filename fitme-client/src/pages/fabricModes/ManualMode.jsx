import React, { useState } from 'react';
import { Info, AlertCircle } from 'lucide-react';

const ManualMode = ({ onCalculate }) => {
  const [measurements, setMeasurements] = useState({
    height: '',
    chest: '',
    waist: '',
    shoulder: '',
    hip: '',
    garment: 'kurta'
  });
  const [errors, setErrors] = useState({});

  // Garment types with base fabric requirements
  const garmentData = {
    kurta: { base: 2.5, name: 'Kurta', emoji: '👔', description: 'Traditional Indian tunic' },
    shirt: { base: 2.0, name: 'Shirt', emoji: '👕', description: 'Formal/casual shirt' },
    dress: { base: 3.0, name: 'Dress', emoji: '👗', description: 'Western dress' },
    lehenga: { base: 4.5, name: 'Lehenga', emoji: '👘', description: 'Traditional skirt set' },
    saree: { base: 5.5, name: 'Saree', emoji: '🥻', description: 'Traditional drape' },
    palazzo: { base: 2.2, name: 'Palazzo', emoji: '👖', description: 'Wide-leg pants' },
    sherwani: { base: 3.5, name: 'Sherwani', emoji: '🤵', description: 'Traditional coat' },
    blouse: { base: 1.0, name: 'Blouse', emoji: '👚', description: 'Short top' },
    jacket: { base: 2.8, name: 'Jacket', emoji: '🧥', description: 'Outerwear' }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!measurements.height || parseFloat(measurements.height) < 100 || parseFloat(measurements.height) > 250) {
      newErrors.height = 'Height must be between 100-250 cm';
    }
    if (!measurements.chest || parseFloat(measurements.chest) < 60 || parseFloat(measurements.chest) > 150) {
      newErrors.chest = 'Chest must be between 60-150 cm';
    }
    if (!measurements.waist || parseFloat(measurements.waist) < 50 || parseFloat(measurements.waist) > 150) {
      newErrors.waist = 'Waist must be between 50-150 cm';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onCalculate(measurements, garmentData[measurements.garment]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border-2 border-gray-200 dark:border-gray-700">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-black dark:text-white flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-black dark:text-white mb-1">
              Measurement Tips
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Measure in centimeters for accuracy</li>
              <li>• Stand straight while measuring</li>
              <li>• Use a flexible measuring tape</li>
              <li>• All fields marked with * are required</li>
            </ul>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Required Measurements */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 space-y-4">
          <h3 className="text-lg font-bold text-black dark:text-white mb-4">
            Required Measurements
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Height */}
            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                Height (cm) *
              </label>
              <input
                type="number"
                name="height"
                value={measurements.height}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 ${
                  errors.height ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                } rounded-xl text-black dark:text-white focus:border-black dark:focus:border-white transition-colors duration-300`}
                placeholder="e.g., 170"
              />
              {errors.height && (
                <p className="mt-1 text-sm text-red-500 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.height}</span>
                </p>
              )}
            </div>

            {/* Chest */}
            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                Chest (cm) *
              </label>
              <input
                type="number"
                name="chest"
                value={measurements.chest}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 ${
                  errors.chest ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                } rounded-xl text-black dark:text-white focus:border-black dark:focus:border-white transition-colors duration-300`}
                placeholder="e.g., 90"
              />
              {errors.chest && (
                <p className="mt-1 text-sm text-red-500 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.chest}</span>
                </p>
              )}
            </div>

            {/* Waist */}
            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                Waist (cm) *
              </label>
              <input
                type="number"
                name="waist"
                value={measurements.waist}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 ${
                  errors.waist ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                } rounded-xl text-black dark:text-white focus:border-black dark:focus:border-white transition-colors duration-300`}
                placeholder="e.g., 75"
              />
              {errors.waist && (
                <p className="mt-1 text-sm text-red-500 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.waist}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Optional Measurements */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 space-y-4">
          <h3 className="text-lg font-bold text-black dark:text-white mb-4">
            Additional Measurements (Optional)
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Shoulder */}
            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                Shoulder (cm)
              </label>
              <input
                type="number"
                name="shoulder"
                value={measurements.shoulder}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-black dark:text-white focus:border-black dark:focus:border-white transition-colors duration-300"
                placeholder="e.g., 40"
              />
            </div>

            {/* Hip */}
            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                Hip (cm)
              </label>
              <input
                type="number"
                name="hip"
                value={measurements.hip}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-black dark:text-white focus:border-black dark:focus:border-white transition-colors duration-300"
                placeholder="e.g., 95"
              />
            </div>
          </div>
        </div>

        {/* Garment Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-black dark:text-white mb-4">
            Select Garment Type *
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(garmentData).map(([key, data]) => (
              <button
                key={key}
                type="button"
                onClick={() => setMeasurements(prev => ({ ...prev, garment: key }))}
                className={`p-4 rounded-xl font-semibold transition-all duration-300 ${
                  measurements.garment === key
                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg scale-105'
                    : 'bg-gray-50 dark:bg-gray-900 text-black dark:text-white border-2 border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white'
                }`}
              >
                <div className="text-3xl mb-2">{data.emoji}</div>
                <div className="text-xs font-bold">{data.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {data.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          Calculate Fabric Requirement
        </button>
      </form>
    </div>
  );
};

export default ManualMode;