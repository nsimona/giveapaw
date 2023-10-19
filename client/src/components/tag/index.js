import { Box } from "@mui/material";

const Tag = ({ text }) => {
  return (
    <Box
      sx={{
        bgcolor: "neutral.grey",
        px: 2,
        py: 1,
        mx: 1,
        borderRadius: 5,
        color: "neutral.contrastText",
        display: "inline-flex",
      }}
    >
      {text}
    </Box>
  );
};

export default Tag;
