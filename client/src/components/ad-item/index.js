import * as React from "react";
import Card from "@mui/material/Card";
import { Typography, Link } from "@mui/material";
import { ReactComponent as CatDogIcon } from "../../assets/images/catDogItem.svg";

const AdItem = () => {
  return (
    <Card
      sx={{
        maxWidth: "100%",
        borderRadius: 3,
        height: 306,
        backgroundColor: "primary.light",
        display: "flex",
        alignItems: "left",
        flexDirection: "column",
        p: 3,
      }}
    >
      <CatDogIcon width="100px" height="100px" />
      <Typography variant="h6" color="primary.contrastText">
        Този проект е част от дипломната ми работа
      </Typography>
      <Typography variant="body1" color="primary.contrastText">
        на тема : Проектиране и разработване на уеб приложение с персонализирани
        препоръки и имплементация на recommendation eingine в среда на
        микросървисна архитектура{" "}
        <Link href="/" color="neutral.darker">
          виж повече тук
        </Link>
      </Typography>
    </Card>
  );
};

export default AdItem;
