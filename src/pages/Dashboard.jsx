import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar"; // import the sidebar
import farmerImage from "../assets/about_us.jpeg";
import paddy from "../assets/paddy_2.jpg";
import feature1 from "../assets/Cr_pred.jpg";
import feature2 from "../assets/dis_det_2.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle hash navigation for internal links
  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const handleSignOut = () => {
    alert("Sign out logic goes here!");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar onSignOut={handleSignOut} />

      {/* Main Content */}
      <main className="ml-20 group-hover:ml-64 flex-1 overflow-y-auto transition-all duration-300">
        {/* Hero Section */}
        <section id="hero" className="relative w-full h-screen">
          <img
            src={paddy}
            alt="Paddy Field"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative z-10 flex flex-col justify-center items-center h-full px-10 text-center">
            <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight">
              Crop Disease Detection
            </h2>
            <p className="text-xl italic text-gray-200">
              "Empowering Farmers with Innovation and Expertise"
            </p>
          </div>
        </section>
        <br></br><br></br>
        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <h2 className="text-center text-4xl font-bold text-green-700 mb-14">
            Our Features
          </h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
            <div
              onClick={() => navigate("/CropPrediction")}
              className="bg-green-50 rounded-xl shadow-md hover:shadow-xl p-6 cursor-pointer transition-transform hover:-translate-y-2"
            >
              <img
                src={feature1}
                alt="Crop Prediction"
                className="w-full h-48 object-cover rounded-md mb-6"
              />
              <h3 className="text-2xl font-bold text-green-700 mb-2">
                Crop Prediction
              </h3>
              <p className="text-gray-600">
                Get accurate crop predictions based on soil data and weather conditions.
              </p>
            </div>

            <div
              onClick={() => navigate("/DiseaseManagement")}
              className="bg-green-50 rounded-xl shadow-md hover:shadow-xl p-6 cursor-pointer transition-transform hover:-translate-y-2"
            >
              <img
                src={feature2}
                alt="Disease Management"
                className="w-full h-48 object-cover rounded-md mb-6"
              />
              <h3 className="text-2xl font-bold text-green-700 mb-2">
                Crop Disease Diagonisis
              </h3>
              <p className="text-gray-600">
                Detect leaf diseases early and get actionable treatment recommendations.
              </p>
            </div>
          </div>
        </section>
        <br></br><br></br><br></br><br></br><br></br><br></br>

        {/* About Section */}
        <section
          id="about"
          className="py-20 bg-gray-100 flex flex-col md:flex-row items-center gap-12 px-10"
        >
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-green-700 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At CDD, we aim to revolutionize agriculture through data-driven insights, crop predictions, disease management, and fertilization recommendations.
            </p>
            <p className="text-gray-600 mb-4">
              We believe in empowering farmers with the latest technology to improve yield, reduce costs, and enhance sustainability.
            </p>
            <p className="text-gray-600">
              Join us in building a better future for farming communities with easy-to-use tools and expert solutions.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src={farmerImage}
              alt="Farmer"
              className="rounded-lg shadow-lg w-3/4"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
