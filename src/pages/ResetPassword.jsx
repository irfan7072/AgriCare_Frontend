import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../utills/api"; // Import API function

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [new_password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const email = localStorage.getItem("email"); // Get the user's email from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }

    // Start the timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Clean up the timer on component unmount
  }, [email, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (new_password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const data = await resetPassword(email, otp, new_password); // Call resetPassword API
      setMessage(data.message);
      localStorage.removeItem("email"); // Clear the email after successful password reset
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 border border-green-200">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Reset Password
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Enter the OTP sent to your email and set a new password.
        </p>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">
            {message}
          </div>
        )}
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter OTP"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              value={new_password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter new password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Confirm new password"
            />
          </div>
          {timeLeft > 0 ? (
            <p className="text-gray-700 mb-4">
              Time remaining: {Math.floor(timeLeft / 60)}:
              {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
            </p>
          ) : (
            <p className="text-red-500 mb-4">OTP expired, please try again.</p>
          )}

          <button
            type="submit"
            disabled={timeLeft === 0}
            className={`w-full p-3 rounded-lg ${
              timeLeft === 0
                ? "bg-gray-300"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
