import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../utills/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signupUser(name, username, email, password);
      navigate("/login");
    } catch (err) {
      setError(t("signupFailed"));
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-white bg-green-200">
      <div className="flex flex-1 flex-col justify-center items-center text-center px-6 py-12">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-10 shadow-2xl max-w-md w-full">
          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-green-700">
            {t("createAccount")}
          </h1>
          <p className="text-base md:text-lg mb-8 text-gray-600">
            {t("signupSubtitle")}
          </p>

          {/* Form */}
          <form className="space-y-6 text-left" onSubmit={handleSignup}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700"
              >
                {t("fullName")}
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 w-full p-3 rounded-lg bg-gray-50 border border-gray-300 
                           placeholder-gray-400 text-gray-800 
                           focus:border-green-500 focus:ring-2 focus:ring-green-400 focus:outline-none"
                placeholder={t("enterFullName")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700"
              >
                {t("username")}
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 w-full p-3 rounded-lg bg-gray-50 border border-gray-300 
                           placeholder-gray-400 text-gray-800 
                           focus:border-green-500 focus:ring-2 focus:ring-green-400 focus:outline-none"
                placeholder={t("chooseUsername")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                {t("email")}
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full p-3 rounded-lg bg-gray-50 border border-gray-300 
                           placeholder-gray-400 text-gray-800 
                           focus:border-green-500 focus:ring-2 focus:ring-green-400 focus:outline-none"
                placeholder={t("enterEmail")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                {t("password")}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="mt-1 w-full p-3 rounded-lg bg-gray-50 border border-gray-300 
                             placeholder-gray-400 text-gray-800 
                             focus:border-green-500 focus:ring-2 focus:ring-green-400 focus:outline-none"
                  placeholder={t("createPassword")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-3 text-gray-500 hover:text-green-600 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-600 bg-red-100 rounded-lg py-2 px-3 text-sm font-medium">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-200"
            >
              {t("signUp")}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-sm text-gray-600">
            <p>
              {t("alreadyHaveAccount")}{" "}
              <Link
                to="/login"
                className="text-green-600 font-semibold hover:underline"
              >
                {t("logInHere")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
