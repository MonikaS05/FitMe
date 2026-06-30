// server/controllers/tryOnController.js

import { PredictionServiceClient } from '@google-cloud/aiplatform';
import { helpers } from '@google-cloud/aiplatform';
import sharp from 'sharp';

// Configuration constants
const location = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';
const publisher = 'google';
const model = 'virtual-try-on-preview-08-04';

const clientOptions = {
    apiEndpoint: `${location}-aiplatform.googleapis.com`,
};
const predictionServiceClient = new PredictionServiceClient(clientOptions);

// Helper to convert buffer to base64
const bufferToBase64 = (buffer) => buffer.toString('base64');

// Helper to optimize images
const optimizeImage = async (buffer, maxWidth, maxHeight) => {
    try {
        const optimized = await sharp(buffer)
            .resize(maxWidth, maxHeight, { 
                fit: 'inside',
                withoutEnlargement: true 
            })
            .jpeg({ quality: 90 })
            .toBuffer();
        
        console.log(`Image optimized: ${buffer.length} bytes -> ${optimized.length} bytes`);
        return optimized;
    } catch (error) {
        console.error('Error optimizing image:', error);
        throw new Error('Failed to process image');
    }
};

export const generateTryOn = async (req, res) => {
    const project = process.env.GOOGLE_CLOUD_PROJECT;
    console.log('[generateTryOn Start] Reading env. Project ID:', project);

    if (!project) {
        console.error("CRITICAL ERROR: GOOGLE_CLOUD_PROJECT is undefined!");
        return res.status(500).send('Server configuration error: Project ID is missing.');
    }

    try {
        // Validate files
        if (!req.files || !req.files.personImage || !req.files.garmentImage) {
            return res.status(400).json({ msg: 'Please upload both person and garment images.' });
        }

        const personImageFile = req.files.personImage[0];
        const garmentImageFile = req.files.garmentImage[0];

        console.log(`Original person image size: ${personImageFile.size} bytes`);
        console.log(`Original garment image size: ${garmentImageFile.size} bytes`);

        // Optimize images
        console.log('Optimizing images...');
        const optimizedPersonImage = await optimizeImage(
            personImageFile.buffer,
            768,
            1024
        );
        const optimizedGarmentImage = await optimizeImage(
            garmentImageFile.buffer,
            512,
            512
        );

        const personImageBase64 = bufferToBase64(optimizedPersonImage);
        const garmentImageBase64 = bufferToBase64(optimizedGarmentImage);

        // Construct the endpoint
        const endpoint = `projects/${project}/locations/${location}/publishers/${publisher}/models/${model}`;

        // CORRECT FORMAT from Google documentation
        const instance = {
            personImage: {
                image: {
                    bytesBase64Encoded: personImageBase64
                }
            },
            productImages: [
                {
                    image: {
                        bytesBase64Encoded: garmentImageBase64
                    }
                }
            ]
        };

        console.log('Request structure prepared correctly');

        const instances = [helpers.toValue(instance)];
        
        const parameters = helpers.toValue({
            sampleCount: 1,
        });

        const request = {
            endpoint,
            instances,
            parameters,
        };

        // Set timeout to 8 minutes
        const callOptions = {
            timeout: 480000,
        };

        console.log(`Sending request to Google Vertex AI endpoint: ${endpoint}`);
        console.log(`Timeout set to: ${callOptions.timeout}ms (8 minutes)`);
        console.log('This may take several minutes - please wait...');

        // Send the prediction request
        const [response] = await predictionServiceClient.predict(request, callOptions);

        console.log('Received response from Google Vertex AI.');

        // Process the response
        if (!response.predictions || response.predictions.length === 0) {
            console.error('Google AI Response was empty:', JSON.stringify(response, null, 2));
            throw new Error('Google AI did not return predictions.');
        }

        const predictionResult = helpers.fromValue(response.predictions[0]);
        console.log('Prediction result keys:', Object.keys(predictionResult));
        
        // The response should have bytesBase64Encoded field
        const resultImageBase64 = predictionResult.bytesBase64Encoded;
        
        if (!resultImageBase64) {
            console.error('Invalid prediction structure:', JSON.stringify(predictionResult, null, 2));
            throw new Error('Prediction result structure is invalid or missing image data.');
        }

        const resultImageUrl = `data:image/png;base64,${resultImageBase64}`;
        
        console.log('AI generation complete successfully!');
        res.json({ resultImageUrl: resultImageUrl });

    } catch (err) {
        console.error('Google AI Generation Error:', err);
        console.error('Error code:', err.code);
        console.error('Error details:', err.details);
        
        // Better error handling
        if (err.code === 3) { // INVALID_ARGUMENT
            return res.status(400).json({
                error: 'Invalid request',
                message: err.details || 'The image format or data is invalid. Please ensure images are valid JPEG/PNG files.',
                details: err.details
            });
        }
        if (err.code === 4) { // DEADLINE_EXCEEDED
            return res.status(504).json({ 
                error: 'Request timeout',
                message: 'The virtual try-on is taking longer than expected. Please try again with smaller/simpler images.'
            });
        }
        
        const detail = err.details || err.message || 'Unknown error occurred.';
        res.status(500).json({ 
            error: 'Processing failed',
            message: detail 
        });
    }
};