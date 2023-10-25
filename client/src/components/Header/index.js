import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LoggedHeader from "./logged-header";
import DefaultHeader from "./default-header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import logo from "../../assets/images/logo.png";
// import logoDog from "../../assets/images/logo-dog.svg";

function ResponsiveAppBar() {
  const [openMenu, setOpenMenu] = React.useState(false);
  const isLoggedin = useSelector((state) => state.user.id !== undefined);
  const navigate = useNavigate();

  return (
    <AppBar color="transparent" elevation={0} sx={{ position: "relative" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <IconButton
            aria-label="menu"
            color="primary"
            sx={{
              flexGrow: 0,
              gap: 2,
              display: { sm: "flex", md: "none" },
              mr: 3,
            }}
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
          >
            <MenuIcon /> */}
          <img src={logo} alt="logo" height="60px" />

          {/* </IconButton> */}

          <Box
            sx={{ flexGrow: 1, gap: 2, display: { xs: "none", md: "flex" } }}
          >
            {/* <div>
              <Button
                onClick={() => {
                  setOpenMenu(!openMenu);
                }}
                endIcon={
                  openMenu ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                }
              >
                Намери животни
              </Button>
            </div> */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isLoggedin ? <LoggedHeader /> : <DefaultHeader />}
          </Box>
        </Toolbar>
      </Container>
      {openMenu && (
        <AppBar sx={{ position: "absolute", top: "100%", py: 2 }}>
          <Container
            maxWidth="xl"
            sx={{ display: "flex", justifyContent: "center", gap: 2 }}
          >
            <Button
              variant="contained"
              disableElevation
              onClick={() => {
                setOpenMenu(false);
                navigate("/search?type=dog");
              }}
            >
              Кучета
            </Button>
            <Button
              variant="contained"
              disableElevation
              onClick={() => {
                setOpenMenu(false);
                navigate("/search?type=cat");
              }}
            >
              Котки
            </Button>
            <Button
              variant="contained"
              disableElevation
              onClick={() => {
                setOpenMenu(false);
                navigate("/search?type=bird");
              }}
            >
              Птици
            </Button>
            <Button
              variant="contained"
              disableElevation
              onClick={() => {
                setOpenMenu(false);
                navigate("/search?type=other");
              }}
            >
              Други животни
            </Button>
            <Button variant="contained" disableElevation disabled>
              Приюти
            </Button>
          </Container>
        </AppBar>
      )}
    </AppBar>
  );
}
export default ResponsiveAppBar;
