import React, { useEffect, useState } from 'react';
import { getPredictionInfo } from '../utills/api';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTranslation } from 'react-i18next';

const Results = () => {
  const [predictionData, setPredictionData] = useState(null);
  const [infoData, setInfoData] = useState(null);
  const { t } = useTranslation();

  // Load prediction data from localStorage on component mount
  useEffect(() => {
    const storedResult = localStorage.getItem('result');
    if (storedResult) {
      setPredictionData(JSON.parse(storedResult));
      localStorage.removeItem('result'); // Clear result after retrieval
    }
  }, []);

  // Handle "Get More Info" button click
  const handleGetMoreInfo = async () => {
    if (predictionData) {
      const diseaseName = predictionData.result.prediction.replace('_', ', ');
      const response = await getPredictionInfo({ disease_name: diseaseName });

      if (response && response.status === 'success') {
        setInfoData(response.disease_info);
      } else {
        setInfoData(t("noAdditionalInfo"));
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-200 p-6">
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-800 mb-4 text-center">
          {t("predictionResult")}
        </h1>

        {predictionData ? (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold text-gray-700">
              {t("status")}:{" "}
              <span className="text-green-600">{predictionData.status}</span>
            </p>
            <p className="text-lg font-semibold text-gray-700">
              {t("prediction")}:{" "}
              <span className="text-green-600">
                {predictionData.result?.prediction || "N/A"}
              </span>
            </p>
            <p className="text-lg font-semibold text-gray-700">
              {t("confidence")}:{" "}
              <span className="text-green-600">
                {predictionData.result?.confidence
                  ? (predictionData.result.confidence * 100).toFixed(2) + "%"
                  : "N/A"}
              </span>
            </p>

            <button
              onClick={handleGetMoreInfo}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {t("getMoreInfo")}
            </button>
          </div>
        ) : (
          <p className="text-red-500 text-center">{t("noPredictionAvailable")}</p>
        )}
      </div>

      {/* Display info below results if available */}
      {infoData && (
        <div className="mt-6 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-3xl w-full">
          <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
            {t("moreInformation")}
          </h2>
          <div className="text-gray-700">
            <SyntaxHighlighter language="markdown" style={solarizedlight}>
              {infoData}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
