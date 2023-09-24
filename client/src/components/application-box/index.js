import { Box, Typography } from "@mui/material";

const ApplicationBox = ({ children, title }) => {
  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>{title}</strong>
      </Typography>
      {children}
    </Box>
  );
};
export default ApplicationBox;
