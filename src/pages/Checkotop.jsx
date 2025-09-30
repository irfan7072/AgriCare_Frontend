import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOtp } from '../utills/api'; // You'll need to implement this API call

const CheckOtp = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  

  return (
    <div
      className="flex flex-col min-h-screen text-white"
      style={{
        background: 'linear-gradient(to right, #56ab2f, #a8e063)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 shadow-lg max-w-md mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center">Agrishare</h1>
        <p className="text-xl mb-8 text-center">Enter the OTP sent to your email</p>
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="otp" className="block text-lg font-medium">OTP</label>
            <input
              type="text"
              id="otp"
              className="w-full p-3 rounded-lg bg-transparent border border-gray-300 placeholder-white focus:border-green-500 focus:outline-none"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOtp;
