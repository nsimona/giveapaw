import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import * as api from "../../services/api";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/user/userSlice";
import { setAlert } from "../../redux/slices/app/appSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = {
      email: form.get("email"),
      password: form.get("password"),
    };

    try {
      const response = await api.signin(data);
      if (response.existingUser.id) {
        dispatch(setUser(response.existingUser));
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log("there was an error trying to login the user", error);
      dispatch(
        setAlert({
          severity: "error",
          message: `Грешка при вход, ${error.response.data.errors[0].message}`,
        })
      );
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{ justifyContent: "center", display: "flex" }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NavLink to="/" style={{ alignSelf: "flex-start" }}>
            <Button
              startIcon={<ChevronLeftOutlinedIcon />}
              sx={{ alignSelf: "flex-start" }}
            >
              Начало
            </Button>
          </NavLink>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Typography component="h1" variant="h5" textAlign="center">
              Вход
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Имейл"
              name="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Парола"
              type="password"
              id="password"
            />
            <Grid container justifyContent="center">
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, px: 5 }}
                >
                  Влизане
                </Button>
              </Grid>{" "}
            </Grid>
            <Grid container sx={{ justifyContent: "center" }}>
              <Grid item>
                Нямаш акаунт? Регистрирай се{" "}
                <NavLink to="/register">тук</NavLink>.
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1521247560470-d2cbfe2f7b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
}
