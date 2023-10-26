// src/componetns/Footer.tsx

import React from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "primary.dark",
        py: 8,
        color: "#fff",
        mt: 5,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            LOGO
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6">Повече за проекта</Typography>
            <Typography variant="body2">Разгледай повече тук</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6">Бърз достъп</Typography>
            <p style={{ marginBottom: 8 }}>
              <Link style={{ textDecoration: "none", color: "#fff" }}>
                Вход
              </Link>
            </p>
            <p style={{ marginBottom: 8 }}>
              <Link style={{ textDecoration: "none", color: "#fff" }}>
                Регистрация
              </Link>
            </p>
            <p style={{ marginBottom: 8 }}>
              <Link style={{ textDecoration: "none", color: "#fff" }}>
                Всички животни
              </Link>
            </p>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6">Категории</Typography>
            <p style={{ marginBottom: 8 }}>
              <Link style={{ textDecoration: "none", color: "#fff" }}>
                Кучета
              </Link>
            </p>
            <p style={{ marginBottom: 8 }}>
              <Link style={{ textDecoration: "none", color: "#fff" }}>
                Котки
              </Link>
            </p>
            <p style={{ marginBottom: 8 }}>
              <Link style={{ textDecoration: "none", color: "#fff" }}>
                Птици
              </Link>
            </p>
            <p style={{ marginBottom: 8 }}>
              <Link style={{ textDecoration: "none", color: "#fff" }}>
                Други
              </Link>
            </p>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
