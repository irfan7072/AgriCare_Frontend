import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  BarChart3,
  Leaf,
  Info,
  Globe,
  LogIn,
  LogOut,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  const { t, i18n } = useTranslation();

  // Check login state on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) setIsLoggedIn(true);
  }, []);

  const scrollToTop = () => {
    const mainEl = document.querySelector("main");
    if (location.pathname === "/") {
      if (mainEl) mainEl.scrollTo({ top: 0, behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/", { replace: false });
      setTimeout(() => {
        const mainAfter = document.querySelector("main");
        if (mainAfter) mainAfter.scrollTo({ top: 0, behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  const scrollToAbout = () => {
    if (location.pathname === "/") {
      const section = document.querySelector("#about");
      if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/", { replace: false });
      setTimeout(() => {
        const section = document.querySelector("#about");
        if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setIsSignOutModalOpen(false);
    navigate("/login");
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setIsLangModalOpen(false);
  };

  const labelClasses =
    "opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 " +
    "transition-all duration-300 whitespace-nowrap " +
    "delay-0 group-hover:delay-200";

  return (
    <>
      <aside className="group w-20 hover:w-64 bg-green-700 text-white flex flex-col py-8 px-4 fixed h-full transition-all duration-700 z-50">
        <h1 className="text-xl font-bold mb-12 text-center">Agri Care</h1>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-6 text-lg flex-1">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 cursor-pointer hover:text-green-200"
          >
            <div className="w-6 flex justify-center">
              <Home size={20} />
            </div>
            <span className={labelClasses}>{t("home")}</span>
          </button>

          <button
            onClick={() => navigate("/CropPrediction")}
            className="flex items-center gap-3 cursor-pointer hover:text-green-200"
          >
            <div className="w-6 flex justify-center">
              <BarChart3 size={20} />
            </div>
            <span className={labelClasses}>{t("cropPrediction")}</span>
          </button>

          <button
            onClick={() => navigate("/DiseaseManagement")}
            className="flex items-center gap-3 cursor-pointer hover:text-green-200"
          >
            <div className="w-6 flex justify-center">
              <Leaf size={20} />
            </div>
            <span className={labelClasses}>{t("diseaseManagement")}</span>
          </button>

          <button
            onClick={scrollToAbout}
            className="flex items-center gap-3 cursor-pointer hover:text-green-200"
          >
            <div className="w-6 flex justify-center">
              <Info size={20} />
            </div>
            <span className={labelClasses}>{t("about")}</span>
          </button>
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto flex flex-col space-y-6">
          {/* Language Popup Trigger */}
          <button
            className="flex items-center gap-3 cursor-pointer hover:text-green-200"
            onClick={() => setIsLangModalOpen(true)}
          >
            <div className="w-6 flex justify-center">
              <Globe size={20} />
            </div>
            <span className={labelClasses}>{t("language")}</span>
          </button>

          {/* Sign In / Sign Out */}
          {isLoggedIn ? (
            <button
              className="flex items-center gap-3 cursor-pointer hover:text-green-200"
              onClick={() => setIsSignOutModalOpen(true)}
            >
              <div className="w-6 flex justify-center">
                <LogOut size={20} />
              </div>
              <span className={labelClasses}>{t("signout")}</span>
            </button>
          ) : (
            <button
              className="flex items-center gap-3 cursor-pointer hover:text-green-200"
              onClick={() => navigate("/login")}
            >
              <div className="w-6 flex justify-center">
                <LogIn size={20} />
              </div>
              <span className={labelClasses}>{t("signin")}</span>
            </button>
          )}
        </div>
      </aside>

      {/* Language Modal */}
      {isLangModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
          <div className="bg-white rounded-xl p-8 w-80 shadow-lg">
            <h2 className="text-xl font-bold text-green-700 mb-6 text-center">
              {t("selectLanguage")}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => changeLanguage("en")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                English
              </button>
              <button
                onClick={() => changeLanguage("hi")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                हिंदी
              </button>
              <button
                onClick={() => changeLanguage("ta")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                தமிழ்
              </button>
              <button
                onClick={() => changeLanguage("te")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                తెలుగు
              </button>
            </div>
            <button
              onClick={() => setIsLangModalOpen(false)}
              className="mt-6 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              {t("close")}
            </button>
          </div>
        </div>
      )}

      {/* Sign Out Confirmation Modal */}
      {isSignOutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
          <div className="bg-white rounded-2xl p-8 w-80 shadow-2xl flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              {t("confirmSignOut")}
            </h2>
            <p className="text-gray-700 mb-6">
              {t("areYouSureLogout")}
            </p>
            <div className="flex gap-4 w-full justify-center">
              <button
                onClick={handleSignOut}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
              >
                {t("yes")}
              </button>
              <button
                onClick={() => setIsSignOutModalOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-colors"
              >
                {t("no")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
