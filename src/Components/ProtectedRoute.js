import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component,
  walletAddress,
  requiredAddress,
  ...rest
}) => {
  return walletAddress === requiredAddress ? (
    <Component {...rest} />
  ) : (
    <Navigate to='/' />
  );
};

export default ProtectedRoute;
