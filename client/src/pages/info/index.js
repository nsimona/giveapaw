import React from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
import hug from "../../assets/images/hug.gif";

export const Info = () => {
  return (
    <Container maxWidth="md" sx={{ my: 5 }}>
      <Typography variant="h3" textAlign="center">
        Какво е ДайЛапа
      </Typography>
      <Typography variant="body1" sx={{ my: 3 }}>
        ДайЛапа е част от моята магистърска теза на тема: Проектиране и
        разработване на уеб приложение с персонализирани препоръки в среда на
        микросървисна архитектура
      </Typography>
      <Typography variant="body1" sx={{ my: 3 }}>
        Настоящата магистърска теза представя резултатите от моите изследвания и
        усилия в областта на иновациите в приложенията за осиновяване на домашни
        любимци и се основава на едни от най-новите технологични и методологични
        практики.
      </Typography>
      <Typography variant="body1" sx={{ my: 3 }}>
        Основният фокус на моя проект е да предложи решение, което не само
        улеснява и подобрява процеса на осиновяване, но и преобразява начина, по
        който хората намират и се свързват с нови домашни любимци. Съчетавайки
        персонализирани препоръки с подход към машинно обучение, моето
        приложение цели да направи срещата между животните и техните нови
        собственици по-гладка, сърдечна и удовлетворителна.
      </Typography>
      <Typography variant="body1" sx={{ my: 3 }}>
        В днешното време, когато микросървисната архитектура е ключово средство
        за създаване на скалируеми и надеждни приложения, моето изследване
        демонстрира възможностите и предимствата на този подход в контекста на
        осиновяване на домашни любимци. Тази дисертация анализира конкретния
        подход и архитектурата, която е необходима за успешната имплементация на
        моето предложение.
      </Typography>
      <Typography variant="body1" sx={{ my: 3 }}>
        <Link href="https://github.com/nsimona">github</Link>
        <br />
        <Link href="https://www.linkedin.com/in/nsimona/">linkedin</Link>
        <br />
        <Link href="mailto:simona.nasteva@gmail.com">
          simona.nasteva@gmail.com
        </Link>
      </Typography>
      <img src={hug} alt="hug" style={{ margin: "0 auto", display: "block" }} />
    </Container>
  );
};

export default Info;
