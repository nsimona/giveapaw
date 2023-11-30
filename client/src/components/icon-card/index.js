import { Grid, Typography } from "@mui/material";

const IconCard = ({ Icon, title, text }) => {
  return (
    <Grid container direction="column" spacing={1} flex={1}>
      <Grid
        item
        sx={{
          flexDirection: "row",
          display: "flex",
          alignItems: "start",
        }}
      >
        <Icon color="primary" size="big" sx={{ m: 0.5, mr: 1 }} />
        <Grid item>
          <Typography variant="h6" color="primary">
            {title}
          </Typography>
          <Typography variant="body2">{text}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default IconCard;
