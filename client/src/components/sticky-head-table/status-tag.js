import { Typography, Box } from "@mui/material";

const colors = {
  created: "blue.light",
  declined: "red.light",
  approved: "green.light",
  expired: "neutral.dark",
};

const tag = {
  created: "изчакваща",
  declined: "отвхърлена",
  approved: "одобрена",
  expired: "отказана",
};

const StatusTag = ({ status }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          borderRadius: "28px",
          backgroundColor: colors[status],
          py: 0.5,
          px: 1,
          color: "neutral.light",
        }}
      >
        {tag[status]}
      </Typography>
    </Box>
  );
};

export default StatusTag;
