import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// import { NotFound } from "navigation/NotFound";
import { ROOT, LOGIN, REGISTER, ACCOUNT, PETEDITOR, PET } from "./routes";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Account from "../pages/account";
import Home from "../pages/Home";
import Header from "../components/Header";
import PetEditor from "../pages/PetEditor";
import { CircularProgress, Grid } from "@mui/material";
import Pet from "../pages/pet";

// import PrivateRoute from "./Auth/PrivateRoute";

export const RouterConfig = () => {
  const location = useLocation();
  const showHeader =
    location.pathname !== "/login" && location.pathname !== "/register";
  return (
    <div>
      {/* <Grid
        sx={{
          position: "fixed",
          zIndex: 10,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(256, 256, 256, .8)",
        }}
      >
        <CircularProgress color="secondary" size={60} />
      </Grid> */}
      {showHeader && <Header />}
      <Routes>
        {/* List all public routes here */}
        <Route exact path={ROOT} element={<Home />} />
        <Route exact path={REGISTER} element={<Register />} />
        <Route path={LOGIN} element={<Login />} />

        {/* List all private/auth routes here */}
        <Route exact path={ACCOUNT} element={<Account />} />
        <Route exact path={PETEDITOR} element={<PetEditor />} />
        <Route exact path={PET} element={<Pet />} />
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
