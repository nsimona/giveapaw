import * as React from "react";
import Card from "@mui/material/Card";
import { Button, CardActions, Typography } from "@mui/material";
import { Link } from "react-router-dom";
// import logoDog from "../../assets/images/logoDog.svg";

const AdItem = () => {
  return (
    <Card
      sx={{
        minWidth: 320,
        maxWidth: "100%",
        borderRadius: 3,
        height: 352,
        backgroundColor: "secondary.main",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="body1" color="primary.contrastText">
        300+ налични животни
      </Typography>
      <Link
        style={{
          textDecoration: "none",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Button variant="contained" color="neutral">
          Разгледай тук
        </Button>
      </Link>
    </Card>
  );
};

export default AdItem;
