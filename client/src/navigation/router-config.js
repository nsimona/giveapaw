/* eslint-disable react-hooks/exhaustive-deps */
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
  SEARCH,
  CREATEAPPLICATION,
  PETUPDATE,
  INFO,
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
import Search from "../pages/search-result";
import CreateApplicationWrapper from "../pages/application/create-application-wrapper";
import Footer from "../components/footer";
import Info from "../pages/info";

export const RouterConfig = () => {
  const [isLoading, setIsLoading] = useState(true);

  const isCurrentUserLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  const location = useLocation();

  const noHeaderPages = ["/login", "/register", "/application/create"];
  const noFooterPages = ["/login", "/register", "/application/create"];

  const showHeader = !noHeaderPages.includes(location.pathname);
  const showFooter = !noFooterPages.includes(location.pathname);

  const currentUser = async () => {
    dispatch(getCurrentUser());
    setIsLoading(isCurrentUserLoading);
  };

  useEffect(() => {
    currentUser();
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
        <Route exact path={INFO} element={<Info />} />
        <Route exact path={SEARCH} element={<Search />} />
        <Route path={PET} element={<Pet />} />
        {/* List all public routes, that required logout if the user is logged in, here */}
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
        {/* List all private/auth routes here */}
        <Route
          path={CREATEAPPLICATION}
          element={
            <AuthWrapper>
              <CreateApplicationWrapper />
            </AuthWrapper>
          }
        />
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
          path={PETUPDATE}
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

        {/* List error pages */}
        <Route path={LOGINREQUIRED} element={<LoginRequired />} />
        {/* <Route path="*">
          <NotFound />
        </Route> */}
      </Routes>
      {showFooter && <Footer />}
    </div>
  );
};
