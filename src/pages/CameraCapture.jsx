import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictDisease } from '../utills/api'; // Import the API function

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState(null); // State to store error messages
  const navigate = useNavigate();

  // Start video stream on component mount
  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing camera:", error);
        setError("Unable to access the camera.");
      }
    };
    startVideo();
  }, []);

  // Capture image and preprocess it
  const handleCapture = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 224, 224);
    
    // Convert canvas to a base64-encoded JPEG image
    const imageDataURL = canvasRef.current.toDataURL('image/jpeg'); // Use 'image/jpeg' here
    setCapturedImage(imageDataURL);
    setError(null); // Clear any previous errors
  };

  // Send captured image to backend for prediction
  const handlePredict = async () => {
    if (capturedImage) {
      try {
        // Convert base64 image data to Blob for FormData
        const response = await fetch(capturedImage);
        const blob = await response.blob();

        const formData = new FormData();
        formData.append('image', blob, 'capturedImage.jpg'); // Use .jpg for file extension

        // Make prediction request
        const result = await predictDisease(formData);
        
        // Navigate to results page with prediction result
        navigate('/results', { state: { result } });
      } catch (error) {
        console.error("Error predicting disease:", error);
        setError("Error predicting disease. Please try again.");
      }
    } else {
      setError("No image captured. Please capture an image first.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-green-200 p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-green-800 mb-4">Live Camera</h1>
      
      {error && <p className="text-red-600">{error}</p>} {/* Display error message */}

      <video ref={videoRef} autoPlay playsInline className="w-full max-w-lg rounded-lg shadow-md mb-4" />
      <canvas ref={canvasRef} width={224} height={224} style={{ display: 'none' }} />

      {capturedImage ? (
        <div className="flex flex-col items-center">
          <img src={capturedImage} alt="Captured" className="w-full max-w-lg rounded-lg shadow-md mb-4" />
          
          <div className="flex gap-4">
            <button 
              onClick={handlePredict} 
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Submit
            </button>
            
            <button 
              onClick={() => saveImageLocally(capturedImage)}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
            >
              Save Locally
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={handleCapture} 
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Capture
        </button>
      )}
    </div>
  );
};

// Function to save the captured image locally in JPG format
const saveImageLocally = (imageDataURL) => {
  // Create a link element
  const link = document.createElement('a');
  link.href = imageDataURL;
  link.download = 'capturedImage.jpg'; // Save as .jpg file
  
  // Programmatically click the link to trigger download
  link.click();
};

export default CameraCapture;
