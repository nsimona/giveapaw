import { Box, Button, Grid, Typography } from "@mui/material";
import * as React from "react";

const Banner = ({ image, text }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center center",
        width: "100%",
        borderRadius: "24px",
        my: 8,
      }}
    >
      <Grid container sx={{ height: "100%", justifyContent: "end", p: 5 }}>
        <Grid
          item
          md={6}
          sm={12}
          sx={{
            background: "rgba( 255, 255, 255, 0.7 )",
            backdropFilter: "blur( 5px )",
            borderRadius: "24px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
            p: 5,
          }}
        >
          <Typography variant="h4" sx={{ my: 4 }} color="neutral.darker">
            <strong>Домашни любимци препоръчани специално за теб</strong>
          </Typography>
          <Typography variant="body1" color="neutral">
            Домашни любимци препоръчани специално за теб
          </Typography>
          <Button variant="contained" color="secondary" sx={{ my: 4 }}>
            Виж повече
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Banner;
