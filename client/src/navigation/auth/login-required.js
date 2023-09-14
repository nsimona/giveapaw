import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";

const LoginRequired = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h4" gutterBottom>
          Страницата, която се опитваш да достъпиш, е top secret
        </Typography>
        <Typography variant="body1" paragraph>
          За да достъпиш тази страница трябва да си логнат в ДайЛапа.
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: 1 }}
          onClick={() => {
            // Add logic for handling the button click (e.g., redirect)
          }}
        >
          Начало
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{ margin: 1 }}
          onClick={() => {
            // Add logic for handling the button click (e.g., logout)
          }}
        >
          Вход
        </Button>
      </Box>
    </Container>
  );
};

export default LoginRequired;
