import { Box } from "@mui/material";

const Tag = ({ text }) => {
  return (
    <Box
      sx={{
        bgcolor: "secondary.main",
        px: 2,
        py: 1,
        m: 1,
        borderRadius: 5,
        color: "secondary.contrast",
        display: "inline-flex",
      }}
    >
      {text}
    </Box>
  );
};

export default Tag;
