import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ currentUser, component }) => {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return component;
};

export default PrivateRoute;