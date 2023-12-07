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
        разработване на уеб приложение с персонализирани препоръки
      </Typography>
      <Typography variant="body1" sx={{ my: 3 }}>
        Осиновяването на животни е вълнуваща възможност за създаване на
        дълготрайни взаимоотношения и предоставяне на дом на домашни любимци.
        Въпреки този благороден стремеж, процесът на намиране на подходяща
        платформа за осиновяване може да бъде предизвикателен. Хората, които
        искат да осиновят домашен любимец, се сблъскват с необходимостта от
        обширно търсене, което често включва обхождане на различни уебсайтове и
        организации, в които да открият подходящото животно, отговарящо на
        техните специфични предпочитания и условия.
      </Typography>
      <Typography variant="body1" sx={{ my: 3 }}>
        Основният фокус на настоящия проект е да предложи решение, което не само
        улеснява и подобрява процеса на осиновяване, но и преобразява начина, по
        който хората намират и се свързват с нови домашни любимци. Съчетавайки
        персонализирани препоръки с подход към машинно обучение, приложението
        цели да направи срещата между животните и техните нови собственици
        по-гладка, сърдечна и удовлетворителна, предоставяйки също така
        напреднали функционалности за управление на информация и процеса на
        осиновяване.
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
