import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsLoggedin } from "../../redux/slices/user/userSlice";

const AuthWrapper = ({ children, logoutRequired = false }) => {
  const loggedin = selectIsLoggedin();
  let location = useLocation();

  // if (loggedin && logoutRequired) {
  //   return <Navigate to="/" state={{ from: location }} replace />;
  // }

  if (!loggedin) {
    return <Navigate to="/login-required" state={{ from: location }} replace />;
  }
  return children;
};

export default AuthWrapper;
