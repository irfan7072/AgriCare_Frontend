import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { predictDisease } from '../utills/api';
import Sidebar from './Sidebar';
import { useTranslation } from 'react-i18next';

const UploadPreview = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [cameraMode, setCameraMode] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  // ✅ Authentication Check
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsAuth(true);
      } else {
        navigate('/login', { replace: true, state: { from: location } });
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate, location]);

  // Start/stop camera
  useEffect(() => {
    if (cameraMode) {
      const startVideo = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (error) {
          console.error('Error accessing camera:', error);
          setError(t("cameraError"));
          setCameraMode(false);
        }
      };
      startVideo();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [cameraMode, t]);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  // File input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
      setCapturedImage(null);
      setCameraMode(false);
      setError(null);
    }
  };

  const handleUploadClick = () => fileInputRef.current.click();

  const handleCameraToggle = () => {
    if (cameraMode) stopCamera();
    setCameraMode(!cameraMode);
    setCapturedImage(null);
    setPreviewURL(null);
    setSelectedFile(null);
    setError(null);
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, 224, 224);
      const imageDataURL = canvasRef.current.toDataURL('image/jpeg');
      setCapturedImage(imageDataURL);
      setError(null);
      stopCamera();
      setCameraMode(false);
    }
  };

  const handleSubmit = async () => {
    let imageToSubmit;

    if (selectedFile) {
      imageToSubmit = selectedFile;
    } else if (capturedImage) {
      try {
        const response = await fetch(capturedImage);
        imageToSubmit = await response.blob();
      } catch (error) {
        console.error('Error processing captured image:', error);
        setError(t("imageProcessingError"));
        return;
      }
    } else {
      setError(t("selectImageError"));
      return;
    }

    setIsProcessing(true);
    const formData = new FormData();
    formData.append('image', imageToSubmit, 'image.jpg');

    try {
      const response = await predictDisease(formData);
      localStorage.setItem('result', JSON.stringify(response));
      navigate('/results', { state: { result: response } });
    } catch (error) {
      console.error('Error predicting disease:', error);
      setError(t("predictionError"));
    } finally {
      setIsProcessing(false);
    }
  };
  
  // ✅ Render a loading message while checking auth
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  // ✅ Only render if authenticated
  if (isAuth) {
    return (
      <div className="flex h-screen overflow-hidden bg-green-100">
        <Sidebar onSignOut={handleSignOut} />

        <main className="ml-20 group-hover:ml-64 flex-1 overflow-y-auto transition-all duration-300 px-4 py-8">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
              {t("cropDiseaseDiagnosis")}
            </h1>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-base">
                {error}
              </div>
            )}

            {/* Upload Section */}
            <div className="border-2 border-green-300 rounded-xl p-5 bg-green-50 mb-6">
              <h2 className="text-xl font-semibold text-green-700 mb-4">
                {t("uploadImage")}
              </h2>
              <button
                onClick={handleUploadClick}
                className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out flex items-center justify-center gap-2 text-base mb-4"
              >
                {t("chooseFile")}
              </button>
              <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="hidden" />

              {previewURL && (
                <div className="mt-4 flex flex-col items-center">
                  <img src={previewURL} alt="Selected file preview" className="rounded-xl shadow-lg mb-4 max-h-60 w-64 object-contain" />
                  <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out text-base"
                  >
                    {isProcessing ? t("processing") : t("analyzeImage")}
                  </button>
                </div>
              )}
            </div>

            {/* Camera Section */}
            <div className="border-2 border-green-300 rounded-xl p-5 bg-green-50">
              <h2 className="text-xl font-semibold text-green-700 mb-4">
                {t("cameraCapture")}
              </h2>
              {!capturedImage ? (
                <>
                  <button
                    onClick={handleCameraToggle}
                    className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center gap-2 text-base mb-4"
                  >
                    {cameraMode ? t("closeCamera") : t("openCamera")}
                  </button>

                  {cameraMode && (
                    <div className="mt-4 flex flex-col items-center">
                      <video ref={videoRef} autoPlay playsInline className="rounded-xl shadow-lg mb-4 max-h-60 w-64 object-contain" />
                      <canvas ref={canvasRef} width={224} height={224} style={{ display: 'none' }} />
                      <button
                        onClick={handleCapture}
                        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out text-base"
                      >
                        {t("captureImage")}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="mt-4 flex flex-col items-center">
                  <img src={capturedImage} alt="Captured" className="rounded-xl shadow-lg mb-4 max-h-60 w-64 object-contain" />
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <button
                      onClick={handleSubmit}
                      disabled={isProcessing}
                      className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out text-base"
                    >
                      {isProcessing ? t("processing") : t("analyze")}
                    </button>
                    <button
                      onClick={() => {
                        setCapturedImage(null);
                        handleCameraToggle();
                      }}
                      className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300 ease-in-out text-base"
                    >
                      {t("retake")}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Loading Spinner */}
            {isProcessing && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                  <p className="text-lg text-gray-700">{t("analyzingImage")}</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }
  
  return null;
};

export default UploadPreview;
