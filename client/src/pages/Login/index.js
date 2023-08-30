import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import * as api from "../../services/api";

export default function Login() {
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

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
        navigate("/", { replace: true }); // <-- redirect
      }
    } catch (error) {
      console.log("there was an error trying to register the user", error);

      // setErrors(getErrorMessages(error));
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Snackbar open={true} autoHideDuration={6000} onClose={() => {}}>
        <Alert onClose={() => {}} severity="error" sx={{ width: "100%" }}>
          Невалиден имейл или парола
        </Alert>
      </Snackbar>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
          <Typography component="h1" variant="h5" sx={{ pt: 10 }}>
            Вход
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
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
                <NavLink to="/register">
                  Нямаш акаунт? Регистрирай се тук.
                </NavLink>
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
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
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