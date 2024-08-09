/* eslint-disable react/prop-types */
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ authenticated, component: Component }) => {
  return authenticated ? Component : <Navigate to="/" />;
};

export default PrivateRoute;
