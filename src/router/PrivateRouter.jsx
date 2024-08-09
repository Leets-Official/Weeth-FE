/* eslint-disable react/prop-types */
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  return <Navigate to="/" />;
};

export default PrivateRoute;
