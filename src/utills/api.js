import axios from "axios";

const BASE_URL = 'https://agricare-b-2.onrender.com';

// -------------------- Auth APIs --------------------

// Login function
export async function loginUser(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error('Login failed. Please check your credentials.');

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Signup function
export async function signupUser(name, username, email, password) {
  try {
    const response = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, username, email, password }),
    });

    if (!response.ok) throw new Error('Signup failed. Please try again.');

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Forgot Password - send OTP
export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/api/forgot-password/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) throw new Error('Failed to send OTP.');

    return await response.json();  // returns { message, email }

  } catch (error) {
    console.error(error);
    throw new Error('Error sending OTP. Please try again.');
  }
};

// Reset password
export const resetPassword = async (email, otp, new_password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/reset-password/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, new_password }),
    });

    if (!response.ok) throw new Error('Failed to reset password.');

    return await response.json();  // returns success message

  } catch (error) {
    console.error(error);
    throw new Error('Error resetting password. Please try again.');
  }
};

// -------------------- Crop Prediction APIs --------------------

// Predict crop
export const predictCrop = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/prediction/predictcrop/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error('Failed to predict crop.');

    return await response.json();

  } catch (error) {
    console.error(error);
    throw new Error('Error predicting crop. Please try again.');
  }
};

// Get more crop info
export const getCropInfo = async (cropName) => {
  try {
    const response = await fetch(`${BASE_URL}/prediction/getinfo/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ crop_name: cropName }),
    });

    if (!response.ok) throw new Error('Failed to fetch crop information.');

    return await response.json();

  } catch (error) {
    console.error(error);
    throw new Error('Error fetching crop information. Please try again.');
  }
};

// -------------------- Disease Prediction APIs --------------------

// Predict disease (with file upload)
export const predictDisease = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/prediction-diseasae/predictdisease/`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    if (response.status !== 200) throw new Error('Disease prediction failed.');

    return response.data;

  } catch (error) {
    console.error(error);
    throw new Error('Error predicting disease. Please try again.');
  }
};

// Get disease info
export const getPredictionInfo = async (predictionData) => {
  try {
    const response = await fetch(`${BASE_URL}/prediction-diseasae/get_info_ds/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(predictionData),
    });

    if (!response.ok) throw new Error("Network response was not ok");

    return await response.json();

  } catch (error) {
    console.error("Error fetching prediction info:", error);
    return null;
  }
};
