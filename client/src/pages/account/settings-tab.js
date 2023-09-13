import { Grid, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const SettingsTab = () => {
  const user = useSelector((state) => state.user);
  return (
    <Grid container spacing={2} sx={{ justifyContent: "start" }}>
      <Grid item md={6} sm={12}>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Основна информация
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="firstName"
              name="firstName"
              value={user.firstName}
              label="Име"
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="lastName"
              name="lastName"
              value={user.lastName}
              label="Фамилия"
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="mail"
              name="mail"
              value={user.email}
              label="Мейл"
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="city"
              name="city"
              value={user.city || "Няма информация"}
              label="Град"
              disabled
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SettingsTab;
