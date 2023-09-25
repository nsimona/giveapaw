import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { Box, Grid, Typography } from "@mui/material";

const colors = {
  "full-match": "green.main",
  "good-match": "yellow.main",
};

const icons = (type, style) => {
  const i = {
    "full-match": <CheckCircleOutlineIcon sx={style} />,
    "good-match": <SentimentSatisfiedAltIcon sx={style} />,
  };
  return i[type];
};

const ApplicationMatch = ({ type, userStatement, petStatement }) => {
  const color = colors[type];
  const icon = icons(type, {
    flex: { md: 0.5, sm: 1 },
    color,
  });

  return (
    <Grid
      container
      sx={{ mt: 2, justifyContent: "space-between", alignItems: "center" }}
    >
      <Grid item md={4} flex={1}>
        <Typography variant="body2">Иска немска овчарка</Typography>
      </Grid>
      <Grid
        item
        md={4}
        flex={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "2px",
            bgcolor: color,
            flex: 1,
          }}
        ></Box>
        {icon}
        <Box
          sx={{
            height: "2px",
            bgcolor: color,
            flex: 1,
          }}
        ></Box>
      </Grid>
      <Grid item md={4} flex={1}>
        <Typography textAlign="right" variant="body2">
          Е немска овчарка
        </Typography>
      </Grid>
    </Grid>
  );
};
export default ApplicationMatch;