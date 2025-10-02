import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { predictCrop, getCropInfo } from '../utills/api';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; 
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Sidebar from './Sidebar';
import { useTranslation } from 'react-i18next';

const CropPrediction = () => {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  });
  const [predictedCrop, setPredictedCrop] = useState('');
  const [cropInfo, setCropInfo] = useState('');
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  // Removed auth check, bypass login
  useEffect(() => {
    const pendingFormData = localStorage.getItem("pendingFormData");
    if (pendingFormData) {
      const parsedData = JSON.parse(pendingFormData);
      setFormData(parsedData);
      localStorage.removeItem("pendingFormData");
      handlePredictCrop(parsedData);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePredictCrop = async (dataOverride = null) => {
    const inputData = dataOverride || formData;

    try {
      const data = await predictCrop(inputData);
      const { predicted_crop } = data;
      setPredictedCrop(predicted_crop);
      localStorage.setItem('predictedCrop', predicted_crop);
      setShowMoreInfo(true);
    } catch (error) {
      console.error('Error predicting crop:', error);
    }
  };

  const handleGetMoreInfo = async () => {
    const storedCrop = localStorage.getItem('predictedCrop');
    try {
      const data = await getCropInfo(storedCrop);
      const { crop_info } = data;
      setCropInfo(crop_info);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching crop info:', error);
    }
  };

  const closeModal = () => setIsModalOpen(false);
  const handleSignOut = () => alert("Sign out logic goes here!");

  // Field labels mapping
  const fieldLabels = {
    N: t("nitrogen"),
    P: t("phosphorus"),
    K: t("potassium"),
    temperature: t("temperature"),
    humidity: t("humidity"),
    ph: t("ph"),
    rainfall: t("rainfall")
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onSignOut={handleSignOut} />
      <main className="ml-20 group-hover:ml-64 flex-1 overflow-y-auto transition-all duration-300">
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            {t("cropPredictionTitle")}
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              {t("enterSoilDetails")}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(formData).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {fieldLabels[field]}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    placeholder={fieldLabels[field]}
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => handlePredictCrop()}
              className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
            >
              {t("predictCrop")}
            </button>
          </div>

          {showMoreInfo && (
            <div className="mt-6 text-center">
              <p className="text-lg font-semibold text-gray-700">
                {t("predictedCrop")}: <span className="text-green-600">{predictedCrop}</span>
              </p>
              <button
                onClick={handleGetMoreInfo}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                {t("getMoreInfo")}
              </button>
            </div>
          )}

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-w-lg w-full max-h-full md:max-h-[80vh] md:max-w-xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {t("cropInformation")}
                </h2>
                <div className="overflow-y-auto max-h-60 md:max-h-96">
                  <SyntaxHighlighter language="markdown" style={materialLight}>
                    {cropInfo}
                  </SyntaxHighlighter>
                </div>
                <button
                  onClick={closeModal}
                  className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  {t("close")}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CropPrediction;
