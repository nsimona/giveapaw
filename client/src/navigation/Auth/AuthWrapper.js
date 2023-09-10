// A wrapper for <Route> that redirects to the login

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  const user = useSelector((state) => state.user);
  let location = useLocation();

  if (!Object.keys(user).length) {
    return <Navigate to="/login-required" state={{ from: location }} replace />;
  }
  return children;
};

export default AuthWrapper;
