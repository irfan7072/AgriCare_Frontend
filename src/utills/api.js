import axios from "axios";


const BASE_URL = 'https://agricare-b-2.onrender.com';
// Login function
export async function loginUser(email, password) {
  try {
    const response = await fetch(`${BASE_URL}api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed. Please check your credentials.');
    }

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
    const response = await fetch(`${BASE_URL}api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, email, password }),
    });

    if (!response.ok) {
      throw new Error('Signup failed. Please try again.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Forgot Password function
export async function sendPasswordResetEmail(email) {
  try {
    const response = await fetch(`${BASE_URL}api/forgot-password/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Failed to send password reset email.');
    }

    const data = await response.json();
    return data; // Expecting custom messages from API
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// export async function resetPassword(email, otp, newOtp, newPassword) {
//   try {
//     const response = await fetch(`${BASE_URL}reset-password`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, otp, new_otp: newOtp, newPassword }), // Use new_otp
//     });

//     if (!response.ok) {
//       throw new Error('Failed to reset password.');
//     }

//     const data = await response.json();
//     return data; // Expecting custom messages from API
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }



// Forgot Password API - sends OTP to the user's email
export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}api/forgot-password/`, {
      method: 'POST',  // Specify the HTTP method
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),  // Send the email in the request body
    });
    
    if (!response.ok) {
      throw new Error('Failed to send OTP.');
    }
    
    return await response.json();  // returns { message, email }
  } catch (error) {
    throw new Error('Error sending OTP. Please try again.');
  }
};


export const resetPassword = async (email, otp, new_password) => {
  try {
    const response = await fetch(`${BASE_URL}api/reset-password/`, {
      method: 'POST',  // Specify the HTTP method
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp, new_password }),  // Send email, otp, and password in the request body
    });

    if (!response.ok) {
      throw new Error('Failed to reset password.');
    }

    return await response.json();  // returns success message
  } catch (error) {
    throw new Error('Error resetting password. Please try again.');
  }
};





export const predictCrop = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}prediction/predictcrop/`, {
      method: 'POST',  // Specify the HTTP method
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),  // Send form data in the request body
    });

    if (!response.ok) {
      throw new Error('Failed to predict crop.');
    }

    return await response.json();  // returns the predicted crop
  } catch (error) {
    throw new Error('Error predicting crop. Please try again.');
  }
};

// Function to get more crop info
export const getCropInfo = async (cropName) => {
  try {
    const response = await fetch(`${BASE_URL}prediction/getinfo/`, {
      method: 'POST',  // Specify the HTTP method
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ crop_name: cropName }),  // Send crop name in the request body
    });

    if (!response.ok) {
      throw new Error('Failed to fetch crop information.');
    }

    return await response.json();  // returns detailed crop info
  } catch (error) {
    throw new Error('Error fetching crop information. Please try again.');
  }



};

export const predictDisease = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}prediction-diseasae/predictdisease/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (response.status !== 200) {
      throw new Error('Disease prediction failed.');
    }
    return response.data;
  } catch (error) {
    throw new Error('Error predicting disease. Please try again.');
  }
};

// export const getDiseaseInfo = async (diseaseName) => {
//   try {
//     const response = await fetch(`${BASE_URL}prediction-diseasae/get_info_ds/`, {
//       method: 'POST',  // Specify the HTTP method
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ disease: diseaseName }),  // Send disease name in the request body
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch disease information.');
//     }

//     return await response.json();  // Returns detailed disease info
//   } catch (error) {
//     throw new Error('Error fetching disease information. Please try again.');
//   }
// };

export const getPredictionInfo = async (predictionData) => {
  try {
    const response = await fetch(`${BASE_URL}prediction-diseasae/get_info_ds/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(predictionData),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching prediction info:", error);
    return null;
  }
};
