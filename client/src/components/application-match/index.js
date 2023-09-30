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

const ApplicationMatch = ({ type, userPreference, petValue }) => {
  const color = colors[type];
  const icon = icons(type, {
    flex: { md: 0.5, sm: 1 },
    color,
  });

  if (!userPreference || !petValue) {
    return;
  }

  return (
    <Grid
      container
      sx={{ mt: 2, justifyContent: "space-between", alignItems: "center" }}
    >
      <Grid item md={4} flex={1}>
        <Typography variant="body2">
          {userPreference[0]}:{userPreference[1]}
        </Typography>
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
          {petValue[0]}:{petValue[1]}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default ApplicationMatch;
