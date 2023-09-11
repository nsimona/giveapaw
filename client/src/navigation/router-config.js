import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// import { NotFound } from "navigation/NotFound";
import {
  ROOT,
  LOGIN,
  REGISTER,
  ACCOUNT,
  PETEDITOR,
  PET,
  LOGINREQUIRED,
  FAVORITES,
} from "./routes";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Account from "../pages/account";
import Home from "../pages/Home";
import Header from "../components/Header";
import PetEditor from "../pages/pet-editor";
import { CircularProgress, Grid } from "@mui/material";
import Pet from "../pages/pet";
import AuthWrapper from "./Auth/AuthWrapper";
import LoginRequired from "./Auth/LoginRequired";
import AllPets from "../components/all-pets";

// import PrivateRoute from "./Auth/PrivateRoute";

export const RouterConfig = () => {
  const location = useLocation();
  const showHeader =
    location.pathname !== "/login" && location.pathname !== "/register";
  return (
    <div>
      {showHeader && <Header />}
      <Routes>
        {/* List all public routes here */}
        <Route exact path={ROOT} element={<Home />} />
        <Route
          exact
          path={REGISTER}
          element={
            <AuthWrapper logoutRequired>
              <Register />
            </AuthWrapper>
          }
        />
        <Route
          path={LOGIN}
          element={
            <AuthWrapper logoutRequired>
              <Login />
            </AuthWrapper>
          }
        />
        <Route path={LOGINREQUIRED} element={<LoginRequired />} />
        {/* List all private/auth routes here */}
        <Route
          exact
          path={ACCOUNT}
          element={
            <AuthWrapper>
              <Account />
            </AuthWrapper>
          }
        />
        <Route
          exact
          path={PETEDITOR}
          element={
            <AuthWrapper>
              <PetEditor />
            </AuthWrapper>
          }
        />
        <Route
          exact
          path={FAVORITES}
          element={
            <AuthWrapper>
              <AllPets favorites />
            </AuthWrapper>
          }
        />
        <Route path={PET} element={<Pet />} />
        {/* Do not hesitate to play around by moving some routes from public to private and vice-versa */}
        {/* <PrivateRoute path={DASHBOARD}>
          <Dashboard />
        </PrivateRoute> */}

        {/* List a generic 404-Not Found route here */}
        {/* <Route path="*">
          <NotFound />
        </Route> */}
      </Routes>
    </div>
  );
};
