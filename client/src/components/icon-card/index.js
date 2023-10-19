import { Grid, Typography } from "@mui/material";

const IconCard = ({ Icon, title, text }) => {
  return (
    <Grid container direction="column" spacing={1} flex={1}>
      <Grid
        item
        sx={{
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Icon color="primary" size="big" sx={{ mr: 1 }} />
        <Typography variant="h6" color="primary">
          {title}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" sx={{ px: 1 }}>
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default IconCard;
