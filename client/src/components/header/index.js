import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import LoggedHeader from "./logged-header";
import DefaultHeader from "./default-header";
import { useSelector } from "react-redux";

import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";

function ResponsiveAppBar() {
  const isLoggedin = useSelector((state) => state.user.id !== undefined);

  return (
    <AppBar color="transparent" elevation={0} sx={{ position: "relative" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <NavLink to="/">
            <img src={logo} alt="logo" height="60px" />
          </NavLink>

          <Box>
            <Link
              sx={{ textDecoration: "none", mx: 1, fontWeight: "bold" }}
              href="/search?type=dog"
            >
              Кучета
            </Link>
            <span style={{ color: "#ffbd59" }}>&#183;</span>
            <Link
              sx={{ textDecoration: "none", mx: 1, fontWeight: "bold" }}
              href="/search?type=cat"
            >
              Котки
            </Link>
            <span style={{ color: "#ffbd59" }}>&#183;</span>
            <Link
              sx={{ textDecoration: "none", mx: 1, fontWeight: "bold" }}
              href="/search?type=bird"
            >
              Птици
            </Link>
            <span style={{ color: "#ffbd59" }}>&#183;</span>
            <Link
              href="/search"
              sx={{ textDecoration: "none", mx: 1, fontWeight: "bold" }}
            >
              Всички животни
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isLoggedin ? <LoggedHeader /> : <DefaultHeader />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
