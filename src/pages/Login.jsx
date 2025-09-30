import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../utills/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await loginUser(email, password);
      localStorage.setItem("authToken", data.token);

      // Redirect back to previous page if available
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      setError(t("invalidCredentials"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-200">
      <div className="flex flex-1 flex-col justify-center items-center text-center px-6 py-12">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-10 shadow-2xl max-w-md w-full relative">
          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-green-700">
            {t("welcomeBack")}
          </h1>
          <p className="text-base md:text-lg mb-8 text-gray-600">
            {t("loginSubtitle")}
          </p>

          {/* Form */}
          <form className="space-y-6 text-left" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                {t("email")}
              </label>
              <input
                type="email"
                id="email"
                aria-label="Email"
                className="mt-1 w-full p-3 rounded-lg bg-gray-50 border border-gray-300 
                           placeholder-gray-400 text-gray-800 
                           focus:border-green-500 focus:ring-2 focus:ring-green-400 focus:outline-none"
                placeholder={t("enterEmail")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                {t("password")}
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                aria-label="Password"
                className="mt-1 w-full p-3 rounded-lg bg-gray-50 border border-gray-300 
                           placeholder-gray-400 text-gray-800 
                           focus:border-green-500 focus:ring-2 focus:ring-green-400 focus:outline-none pr-10"
                placeholder={t("enterPassword")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-9 text-gray-500 hover:text-green-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-600 bg-red-100 rounded-lg py-2 px-3 text-sm font-medium">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-200 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? t("loggingIn") : t("logIn")}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 space-y-3 text-sm text-gray-600">
            <p>
              {t("dontHaveAccount")}{" "}
              <Link to="/signup" className="text-green-600 font-semibold hover:underline">
                {t("signUp")}
              </Link>
            </p>
            <p>
              <Link to="/forgot-password" className="text-green-600 font-semibold hover:underline">
                {t("forgotPasswordQuestion")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
