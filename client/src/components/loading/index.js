import { CircularProgress, Grid } from "@mui/material";

const Loading = () => {
  return (
    <Grid
      sx={{
        position: "fixed",
        zIndex: 9999,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(256, 256, 256, 1)",
      }}
    >
      <CircularProgress color="secondary" size={60} />
    </Grid>
  );
};

export default Loading;
