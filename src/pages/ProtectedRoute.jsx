import React from 'react';
import { Navigate } from 'react-router-dom'; // Updated to use Navigate instead of Redirect

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken'); // Check if token exists in localStorage

  if (!authToken) {
    // If the user is not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the children components
  return children;
};

export default ProtectedRoute;
