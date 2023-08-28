import * as React from "react";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

function DefaultHeader() {
  return (
    <>
      <NavLink to="/login">
        <Button variant="outlined" sx={{ px: 3, mr: 3 }}>
          Вход
        </Button>
      </NavLink>
      <NavLink to="/register">
        <Button variant="contained" sx={{ px: 3 }}>
          Регистрация
        </Button>
      </NavLink>
    </>
  );
}

export default DefaultHeader;
