import React from 'react';
import { Navigate } from 'react-router-dom';

const Secure = ({ children }) => {
  const token = localStorage.getItem('token');

  // If no token is found, redirect to the login page
  if (!token) {
    return <Navigate to="/" />;
  }

  // Render the children components if the token is present
  return <>{children}</>;
};

export default Secure;
