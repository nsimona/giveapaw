import React from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
import logo from "../../assets/images/logo.png";

export const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "neutral.darker",
        py: 8,
        color: "#fff",
        mt: 5,
        fonstSize: 16,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <img src={logo} alt="logo" width="100%" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Повече за проекта</Typography>
            <Typography variant="body2">
              Този проект е част от дипломната ми работа на тема: Проектиране и
              разработване на уеб приложение с персонализирани препоръки и
              имплементация на recommendation eingine в среда на микросъврисна
              архитектура{" "}
              <Link href="/info" variant="body2">
                разгледай повече тук
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="h6">Бърз достъп</Typography>
            <p style={{ marginBottom: 8 }}>
              <Link
                href="/login"
                variant="body2"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Вход
              </Link>
            </p>
            <p style={{ marginBottom: 8 }}>
              <Link
                href="/register"
                variant="body2"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Регистрация
              </Link>
            </p>
            <p style={{ marginBottom: 8 }}>
              <Link
                href="/search"
                variant="body2"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Всички животни
              </Link>
            </p>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="h6">Категории</Typography>
            <p style={{ marginBottom: 8 }}>
              <Link
                href="/search?type=dog"
                variant="body2"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Кучета
              </Link>
            </p>
            <p style={{ marginBottom: 8 }}>
              <Link
                href="/search?type=cat"
                variant="body2"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Котки
              </Link>
            </p>
            <p style={{ marginBottom: 8 }}>
              <Link
                href="/search?type=bird"
                variant="body2"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Птици
              </Link>
            </p>
            <p style={{ marginBottom: 8 }}>
              <Link
                href="/search?type=other"
                variant="body2"
                style={{ textDecoration: "none", color: "#fff" }}
              >
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
