import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import { cities } from "../../assets/cities";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import * as api from "../../services/api";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/user/userSlice";
import { setAlert } from "../../redux/slices/app/appSlice";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = {
      email: form.get("email"),
      password: form.get("password"),
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      city: form.get("city"),
    };

    try {
      const response = await api.signup(data);
      if (response.id) {
        dispatch(setUser(response));
        navigate("/", { replace: true }); // <-- redirect
      }
    } catch (error) {
      console.log("there was an error trying to register the user", error);
      dispatch(
        setAlert({ severity: "error", message: "Неуспешна регистрация" })
      );
    }
  };

  const [city, setCity] = React.useState("");

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh", overflow: "hidden" }}
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1622273509376-2d42c282dced?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          overflow: "auto",
          height: "100vh",
          justifyContent: "center",
          display: "flex",
        }}
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
          <Typography component="h1" variant="h5" textAlign="center">
            Регистрация
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, maxWidth: "510px" }}
          >
            <Grid
              item
              container
              columnSpacing={2}
              sx={{ justifyContent: "space-between" }}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  id="firstName"
                  label="Име"
                  name="firstName"
                  fullWidth
                  autoComplete="firstName"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  id="lastName"
                  label="Фамилия"
                  name="lastName"
                  fullWidth
                  autoComplete="lastName"
                />
              </Grid>
            </Grid>
            <FormControl fullWidth sx={{ mt: 2, mb: 1 }}>
              <InputLabel required>Град</InputLabel>
              <Select
                id="city"
                name="city"
                value={city}
                label="Град"
                required
                onChange={handleChange}
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Имейл"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Парола"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControl sx={{ mt: 2 }}>
              <label>С какво може да ти помогне ДайЛапа?</label>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Искам да осиновя животно"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Искам да дам за осиновяване"
                />
              </FormGroup>
            </FormControl>

            <Grid container justifyContent="center">
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, px: 5 }}
                >
                  Регистриране
                </Button>
              </Grid>{" "}
            </Grid>
            <Grid container sx={{ justifyContent: "center" }}>
              <Grid item>
                <NavLink to="/login">Вече имаш акаунт? Влез тук.</NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
