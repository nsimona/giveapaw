import { Box, Grid, Typography } from "@mui/material";

function SectionWrapper({ h6, h3, h4, children, left }) {
  return (
    <Grid sx={{ my: 7 }}>
      <Box sx={{ textAlign: left ? "left" : "center" }}>
        <Typography
          variant="h6"
          sx={{
            color: "secondary.main",
            textTransform: "uppercase",
            fontSize: "14px",
          }}
        >
          {h6}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            color: "primary.main",
            fontSize: "28px",
            mb: 2,
          }}
        >
          <strong>{h3}</strong>
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: "primary.light",
            fontSize: "20px",
            mb: 2,
          }}
        >
          {h4}
        </Typography>
      </Box>
      {children}
    </Grid>
  );
}

export default SectionWrapper;
