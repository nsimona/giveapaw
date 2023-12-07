import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthWrapper = ({ children, logoutRequired = false }) => {
  const isCurrentUserLoading = useSelector((state) => state.user.isLoading);
  const isLoggedin = useSelector((state) => state.user.id !== undefined);
  let location = useLocation();

  if (isCurrentUserLoading) {
    return;
  }

  if (logoutRequired) {
    if (isLoggedin) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;
  }

  if (!isLoggedin) {
    return <Navigate to="/login-required" state={{ from: location }} replace />;
  }
  return children;
};

export default AuthWrapper;
