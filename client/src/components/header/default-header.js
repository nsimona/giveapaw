import * as React from "react";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

function DefaultHeader() {
  return (
    <>
      <NavLink to="/login">
        <Button size="small" sx={{ px: 3, mr: 3 }}>
          Вход
        </Button>
      </NavLink>
      <NavLink to="/register">
        <Button variant="contained" sx={{ px: 3 }} size="small">
          Регистрация
        </Button>
      </NavLink>
    </>
  );
}

export default DefaultHeader;
