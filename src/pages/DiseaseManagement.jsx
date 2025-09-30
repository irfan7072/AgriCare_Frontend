import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useTranslation } from 'react-i18next';

// Import your plant images
import apple from '../assets/apple.avif';
import cassava from '../assets/Cassava.jpg';
import cherry from '../assets/Cherry.jpg';
import chili from '../assets/Chili.jpg';
import coffee from '../assets/Coffee.jpg';
import corn from '../assets/corn.jpeg';
import cucumber from '../assets/Cucumber.jpg';
import guava from '../assets/Gauva.jpg';
import grape from '../assets/grape.jpeg';
import jamun from '../assets/Jamun.jpg';
import lemon from '../assets/Lemon.jpg';
import mango from '../assets/Mango.jpg';
import peach from '../assets/peach.jpeg';
import pepperbell from '../assets/pepperbell.jpeg';
import pomegranate from '../assets/Pomegranate.jpg';
import potato from '../assets/Potato.jpg';
import rice from '../assets/Rice.jpg';
import soybean from '../assets/Soybean.jpg';
import strawberry from '../assets/Strawberry.jpg';
import sugarcane from '../assets/Sugarcane.jpg';
import tea from '../assets/Tea.jpg';
import tomato from '../assets/tomato.jpeg';
import wheat from '../assets/Wheat.jpg';

const DiseaseManagement = () => {
  const navigate = useNavigate();
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [showAllPlants, setShowAllPlants] = useState(false);
  const { t } = useTranslation();

  // All available plants with translation keys
  const allPlants = [
    { name: 'Apple', image: apple, key: 'Apple' },
    { name: 'Cassava', image: cassava, key: 'Cassava' },
    { name: 'Cherry', image: cherry, key: 'Cherry' },
    { name: 'Chili', image: chili, key: 'Chili' },
    { name: 'Coffee', image: coffee, key: 'Coffee' },
    { name: 'Corn', image: corn, key: 'Corn' },
    { name: 'Cucumber', image: cucumber, key: 'Cucumber' },
    { name: 'Guava', image: guava, key: 'Guava' },
    { name: 'Grape', image: grape, key: 'Grape' },
    { name: 'Jamun', image: jamun, key: 'Jamun' },
    { name: 'Lemon', image: lemon, key: 'Lemon' },
    { name: 'Mango', image: mango, key: 'Mango' },
    { name: 'Peach', image: peach, key: 'Peach' },
    { name: 'Pepper Bell', image: pepperbell, key: 'Pepperbell' },
    { name: 'Pomegranate', image: pomegranate, key: 'Pomegranate' },
    { name: 'Potato', image: potato, key: 'Potato' },
    { name: 'Rice', image: rice, key: 'Rice' },
    { name: 'Soybean', image: soybean, key: 'Soybean' },
    { name: 'Strawberry', image: strawberry, key: 'Strawberry' },
    { name: 'Sugarcane', image: sugarcane, key: 'Sugarcane' },
    { name: 'Tea', image: tea, key: 'Tea' },
    { name: 'Tomato', image: tomato, key: 'Tomato' },
    { name: 'Wheat', image: wheat, key: 'Wheat' },
  ];

  const initialPlants = allPlants.slice(0, 3);
  const additionalPlants = allPlants.slice(initialPlants.length);
  const displayedPlants = showAllPlants ? allPlants : initialPlants;

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoOpacity((prev) => (prev === 1 ? 0.8 : 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleUploadClick = () => navigate('/Upload');
  const toggleShowMore = () => setShowAllPlants(!showAllPlants);
  const handleSignOut = () => alert('Sign out logic goes here!');

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onSignOut={handleSignOut} />
      <main className="ml-20 group-hover:ml-64 flex-1 overflow-y-auto transition-all duration-300 px-4 py-8 bg-green-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-5xl font-extrabold text-green-700 mb-3 transition-opacity duration-1000"
            style={{ opacity: logoOpacity }}
          >
            {t("diseaseDiagnosis")}
          </h1>
          <p className="text-xl text-green-600 mb-4 text-center max-w-2xl mx-auto leading-relaxed">
            {t("supportedPlants")}
          </p>
        </div>
        <br></br>
        
        {/* Plant Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-6 w-full max-w-7xl mx-auto">
          {displayedPlants.map((plant) => (
            <div
              key={plant.name}
              className="flex flex-col items-center rounded-2xl p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-green-100">
                <img 
                  src={plant.image} 
                  alt={t(plant.key)} 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-semibold text-gray-700 text-center">
                {t(plant.key)}
              </p>
            </div>
          ))}

          {/* Show More / Show Less Button */}
          <div
            onClick={toggleShowMore}
            className="flex flex-col items-center justify-center rounded-2xl p-4 cursor-pointer bg-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-green-100 flex items-center justify-center bg-green-50">
              <span className="text-xl text-green-600">
                {showAllPlants ? '−' : `+${additionalPlants.length}`}
              </span>
            </div>
            <p className="text-xs font-semibold text-green-600 text-center">
              {showAllPlants ? t("showLess") : t("showMore")}
            </p>
          </div>
        </div>
        <br></br><br></br>
        
        {/* Upload Button */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <button
            onClick={handleUploadClick}
            className="px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-full shadow-md hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-1 transition-all flex items-center gap-2"
          >
            {t("uploadImage")}
          </button>
        </div>
        <br></br>
        
        {/* Instructions */}
        <div className="mt-6 p-4 bg-white rounded-lg max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            {t("howToUse")}
          </h3>
          <ol className="list-decimal list-inside text-green-600 space-y-1">
            <li>{t("step1")}</li>
            <li>{t("step2")}</li>
            <li>{t("step3")}</li>
            <li>{t("step4")}</li>
          </ol>
        </div>
      </main>
    </div>
  );
};

export default DiseaseManagement;
