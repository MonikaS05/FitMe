import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';

const ImageMode = ({ onCalculate }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [height, setHeight] = useState('');
  const [garment, setGarment] = useState('kurta');
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const garmentData = {
    kurta: { base: 2.5, name: 'Kurta', emoji: '👔' },
    shirt: { base: 2.0, name: 'Shirt', emoji: '👕' },
    dress: { base: 3.0, name: 'Dress', emoji: '👗' },
    lehenga: { base: 4.5, name: 'Lehenga', emoji: '👘' },
    saree: { base: 5.5, name: 'Saree', emoji: '🥻' },
    palazzo: { base: 2.2, name: 'Palazzo', emoji: '👖' },
    sherwani: { base: 3.5, name: 'Sherwani', emoji: '🤵' },
    blouse: { base: 1.0, name: 'Blouse', emoji: '👚' },
    jacket: { base: 2.8, name: 'Jacket', emoji: '🧥' }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors({ image: 'Please upload a valid image file' });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ image: 'Image size should be less than 5MB' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setErrors({});
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const removeImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Validate and calculate
  const handleCalculate = () => {
    const newErrors = {};

    if (!uploadedImage) {
      newErrors.image = 'Please upload an image first';
    }
    if (!height || parseFloat(height) < 100 || parseFloat(height) > 250) {
      newErrors.height = 'Height must be between 100-250 cm';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Create measurements object based on estimated proportions
      const heightValue = parseFloat(height);
      const measurements = {
        height: heightValue,
        chest: Math.round(heightValue * 0.53), // Approximate chest from height
        waist: Math.round(heightValue * 0.44), // Approximate waist from height
        shoulder: '',
        hip: '',
        garment: garment
      };
      
      onCalculate(measurements, garmentData[garment]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border-2 border-gray-200 dark:border-gray-700">
        <div className="flex items-start space-x-3">
          <ImageIcon className="w-5 h-5 text-black dark:text-white flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-black dark:text-white mb-1">
              Image Upload Guidelines
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Upload clear, full-body front-facing photo</li>
              <li>• Stand straight with arms by your side</li>
              <li>• Ensure good lighting</li>
              <li>• Max file size: 5MB</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Image Upload Area */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-black dark:text-white mb-4">
          Upload Your Photo
        </h3>

        {!uploadedImage ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-12 text-center cursor-pointer hover:border-black dark:hover:border-white transition-all duration-300 bg-gray-50 dark:bg-gray-900"
          >
            <Upload className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-black dark:text-white font-semibold mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              PNG, JPG, JPEG up to 5MB
            </p>
          </div>
        ) : (
          <div className="relative">
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-full max-h-96 object-contain rounded-xl bg-gray-100 dark:bg-gray-900"
            />
            <button
              onClick={removeImage}
              className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {errors.image && (
          <p className="mt-2 text-sm text-red-500 flex items-center space-x-1">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.image}</span>
          </p>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Height and Garment Selection */}
      {uploadedImage && (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 space-y-4">
            <h3 className="text-lg font-bold text-black dark:text-white mb-4">
              Additional Information
            </h3>

            {/* Height Input */}
            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                Your Height (cm) *
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                  if (errors.height) {
                    setErrors(prev => ({ ...prev, height: '' }));
                  }
                }}
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

            {/* Garment Selection */}
            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                Garment Type *
              </label>
              <select
                value={garment}
                onChange={(e) => setGarment(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-black dark:text-white focus:border-black dark:focus:border-white transition-colors duration-300"
              >
                {Object.entries(garmentData).map(([key, data]) => (
                  <option key={key} value={key}>
                    {data.emoji} {data.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Calculate from Image
          </button>
        </>
      )}
    </div>
  );
};

export default ImageMode;