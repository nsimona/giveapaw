import React, { useCallback } from "react";
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
import Register from "../pages/register";
import Login from "../pages/login";
import Account from "../pages/account";
import Home from "../pages/home";
import Header from "../components/header";
import PetEditor from "../pages/pet-editor";
import Pet from "../pages/pet";
import AuthWrapper from "./auth/auth-wrapper";
import LoginRequired from "./auth/login-required";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
import { getCurrentUser } from "../redux/slices/user/userThunk";
import Favorites from "../pages/favorites";

export const RouterConfig = () => {
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const showHeader =
    location.pathname !== "/login" && location.pathname !== "/register";

  const dispatch = useDispatch();
  const isCurrentUserLoading = useSelector((state) => state.user.isLoading);

  const currentUser = async () => {
    dispatch(getCurrentUser());
  };

  useEffect(() => {
    currentUser();
    setIsLoading(isCurrentUserLoading);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

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
              <Favorites />
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
