import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, RotateCcw, AlertCircle, CheckCircle } from 'lucide-react';

const CameraMode = ({ onCalculate }) => {
  const [cameraStream, setCameraStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [height, setHeight] = useState('');
  const [garment, setGarment] = useState('kurta');
  const [errors, setErrors] = useState({});
  const [poseDetected, setPoseDetected] = useState(false);
  const [aiMeasurements, setAiMeasurements] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseCanvasRef = useRef(null);
  const poseRef = useRef(null);
  const cameraRef = useRef(null);
  const stableCountRef = useRef(0);
  const countdownIntervalRef = useRef(null);

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

  // Initialize MediaPipe Pose Detection
  const initializePoseDetection = async () => {
    try {
      // Check if MediaPipe is loaded
      if (typeof window.Pose === 'undefined') {
        setErrors({ camera: 'MediaPipe library not loaded. Please refresh the page.' });
        return;
      }

      const pose = new window.Pose({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        }
      });

      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      pose.onResults(onPoseResults);
      poseRef.current = pose;

      await startCamera();
    } catch (error) {
      console.error('Pose detection error:', error);
      setErrors({ camera: 'Failed to initialize pose detection. Please try again.' });
    }
  };

  // Start camera with MediaPipe
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraStream(stream);
        setErrors({});

        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          if (poseRef.current && videoRef.current) {
            const camera = new window.Camera(videoRef.current, {
              onFrame: async () => {
                if (poseRef.current && videoRef.current) {
                  await poseRef.current.send({ image: videoRef.current });
                }
              },
              width: 640,
              height: 480
            });
            camera.start();
            cameraRef.current = camera;
          }
        };
      }
    } catch (error) {
      console.error('Camera error:', error);
      setErrors({
        camera: 'Unable to access camera. Please check permissions and try again.'
      });
    }
  };

  // Process pose detection results
  const onPoseResults = (results) => {
    const poseCanvas = poseCanvasRef.current;
    if (!poseCanvas) return;

    const ctx = poseCanvas.getContext('2d');
    ctx.save();
    ctx.clearRect(0, 0, poseCanvas.width, poseCanvas.height);

    if (results.poseLandmarks) {
      // Draw pose connections
      window.drawConnectors(ctx, results.poseLandmarks, window.POSE_CONNECTIONS, {
        color: '#00FF00',
        lineWidth: 2
      });
      
      // Draw landmarks
      window.drawLandmarks(ctx, results.poseLandmarks, {
        color: '#FF0000',
        lineWidth: 2
      });

      // Check if pose is stable
      checkPoseStability(results.poseLandmarks);
    }

    ctx.restore();
  };

  // Check if user is standing still with full body visible
  const checkPoseStability = (landmarks) => {
    // Key points to check: nose, shoulders, hips, ankles
    const keyPoints = [0, 11, 12, 23, 24, 27, 28];
    const allVisible = keyPoints.every(index => 
      landmarks[index] && landmarks[index].visibility > 0.7
    );

    if (allVisible && !capturedImage) {
      stableCountRef.current += 1;
      
      if (stableCountRef.current > 10 && !countdownIntervalRef.current) {
        setPoseDetected(true);
        startCountdown(landmarks);
      }
    } else {
      stableCountRef.current = 0;
      if (!capturedImage) {
        setPoseDetected(false);
      }
    }
  };

  // Start countdown before capture
  const startCountdown = (landmarks) => {
    let count = 3;
    setCountdown(count);

    countdownIntervalRef.current = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        setCountdown(0);
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
        capturePoseImage(landmarks);
      }
    }, 1000);
  };

  // Capture image and calculate measurements
  const capturePoseImage = (landmarks) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImage(imageData);
      
      // Calculate body measurements from landmarks
      const measurements = calculateMeasurementsFromPose(landmarks);
      setAiMeasurements(measurements);
      
      stopCamera();
      setPoseDetected(false);
    }
  };

  // Calculate measurements from MediaPipe landmarks
  const calculateMeasurementsFromPose = (landmarks) => {
    const nose = landmarks[0];
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];
    const leftAnkle = landmarks[27];
    const rightAnkle = landmarks[28];

    // Calculate pixel distances
    const shoulderWidth = Math.abs(rightShoulder.x - leftShoulder.x) * 640;
    const hipWidth = Math.abs(rightHip.x - leftHip.x) * 640;
    
    // Use average shoulder width (45cm) as reference
    const scaleFactor = 45 / shoulderWidth;
    
    return {
      chest: Math.round(shoulderWidth * scaleFactor * 2.2),
      waist: Math.round(hipWidth * scaleFactor * 1.8),
      shoulder: Math.round(shoulderWidth * scaleFactor),
      hip: Math.round(hipWidth * scaleFactor * 2.1)
    };
  };

  // Stop camera
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    if (cameraRef.current) {
      cameraRef.current.stop();
      cameraRef.current = null;
    }
  };

  // Retake photo
  const retakePhoto = () => {
    setCapturedImage(null);
    setAiMeasurements(null);
    setHeight('');
    setPoseDetected(false);
    stableCountRef.current = 0;
    initializePoseDetection();
  };

  // Calculate fabric
  const handleCalculate = () => {
    const newErrors = {};

    if (!capturedImage) {
      newErrors.image = 'Please capture a photo first';
    }
    if (!height || parseFloat(height) < 100 || parseFloat(height) > 250) {
      newErrors.height = 'Height must be between 100-250 cm';
    }
    if (!aiMeasurements) {
      newErrors.measurements = 'AI measurements not available';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const measurements = {
        height: parseFloat(height),
        chest: aiMeasurements.chest,
        waist: aiMeasurements.waist,
        shoulder: aiMeasurements.shoulder,
        hip: aiMeasurements.hip,
        garment: garment
      };
      
      onCalculate(measurements, garmentData[garment]);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    // Load MediaPipe scripts
    const loadMediaPipe = () => {
      if (!document.getElementById('mediapipe-pose')) {
        const script1 = document.createElement('script');
        script1.id = 'mediapipe-camera';
        script1.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js';
        script1.crossOrigin = 'anonymous';
        document.body.appendChild(script1);

        const script2 = document.createElement('script');
        script2.id = 'mediapipe-drawing';
        script2.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js';
        script2.crossOrigin = 'anonymous';
        document.body.appendChild(script2);

        const script3 = document.createElement('script');
        script3.id = 'mediapipe-pose';
        script3.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js';
        script3.crossOrigin = 'anonymous';
        script3.onload = () => {
          setTimeout(() => {
            initializePoseDetection();
          }, 500);
        };
        document.body.appendChild(script3);
      } else {
        initializePoseDetection();
      }
    };

    loadMediaPipe();

    return () => {
      stopCamera();
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      if (poseRef.current) {
        poseRef.current.close();
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-4 border-2 border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
              AI-Powered Body Measurement
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Stand 2-3 meters away from camera</li>
              <li>• Ensure full body is visible</li>
              <li>• Keep arms slightly away from body</li>
              <li>• Stay still when pose is detected</li>
              <li>• AI will auto-detect: chest, waist, shoulders, hips</li>
              <li>• You'll enter height manually for accuracy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Camera/Preview Area */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-black dark:text-white">
            {capturedImage ? 'Captured Photo' : 'Live Camera Feed'}
          </h3>
          {poseDetected && !capturedImage && (
            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">Pose Detected!</span>
            </div>
          )}
        </div>

        <div className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-video">
          {!cameraStream && !capturedImage && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mb-4"></div>
              <p className="text-white font-semibold">
                Initializing AI Camera...
              </p>
            </div>
          )}

          {cameraStream && !capturedImage && (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{ transform: 'scaleX(-1)' }}
              />
              <canvas
                ref={poseCanvasRef}
                width="640"
                height="480"
                className="absolute inset-0 w-full h-full"
                style={{ transform: 'scaleX(-1)' }}
              />
              
              {countdown > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="text-9xl font-bold text-white">
                    {countdown}
                  </div>
                </div>
              )}

              <button
                onClick={stopCamera}
                className="absolute top-4 right-4 p-2 bg-red-500/80 backdrop-blur-md text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                title="Stop Camera"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          )}

          {capturedImage && (
            <>
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full h-full object-cover"
              />
            </>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {errors.camera && (
          <p className="mt-3 text-sm text-red-500 flex items-center space-x-1">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.camera}</span>
          </p>
        )}
      </div>

      {/* AI Detected Measurements + User Input */}
      {capturedImage && aiMeasurements && (
        <>
          {/* AI Detected Measurements */}
          <div className="bg-green-50 dark:bg-green-900/30 rounded-2xl p-6 border-2 border-green-200 dark:border-green-800">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h3 className="text-lg font-bold text-green-900 dark:text-green-100">
                AI Detected Measurements
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-3">
                <span className="text-gray-600 dark:text-gray-400">Chest:</span>
                <span className="ml-2 font-bold text-green-700 dark:text-green-300">
                  {aiMeasurements.chest} cm
                </span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-3">
                <span className="text-gray-600 dark:text-gray-400">Waist:</span>
                <span className="ml-2 font-bold text-green-700 dark:text-green-300">
                  {aiMeasurements.waist} cm
                </span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-3">
                <span className="text-gray-600 dark:text-gray-400">Shoulder:</span>
                <span className="ml-2 font-bold text-green-700 dark:text-green-300">
                  {aiMeasurements.shoulder} cm
                </span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-3">
                <span className="text-gray-600 dark:text-gray-400">Hip:</span>
                <span className="ml-2 font-bold text-green-700 dark:text-green-300">
                  {aiMeasurements.hip} cm
                </span>
              </div>
            </div>
          </div>

          {/* User Input Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 space-y-4">
            <h3 className="text-lg font-bold text-black dark:text-white mb-4">
              Additional Information Required
            </h3>

            {/* Height Input */}
            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                Your Height (cm) * 
                <span className="text-gray-500 text-xs ml-2">(Required for accurate calculation)</span>
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

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={retakePhoto}
              className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white py-4 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
            >
              Retake Photo
            </button>
            <button
              onClick={handleCalculate}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Calculate Fabric
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CameraMode;