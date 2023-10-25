// src/componetns/Footer.tsx

import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

export const Footer = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "neutral.darker",
        py: 8,
        color: "#fff",
        mt: 5,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">About Us</Typography>
            <Typography variant="body2">
              Your footer content goes here.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Menu</Typography>
            <Button
              onClick={handleMenuOpen}
              variant="text"
              color="inherit"
              sx={{ textTransform: "none", paddingLeft: 0 }}
            >
              Explore
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
              <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
              <MenuItem onClick={handleMenuClose}>Option 3</MenuItem>
            </Menu>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Menu</Typography>
            <Button
              onClick={handleMenuOpen}
              variant="text"
              color="inherit"
              sx={{ textTransform: "none", paddingLeft: 0 }}
            >
              Explore
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
              <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
              <MenuItem onClick={handleMenuClose}>Option 3</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
