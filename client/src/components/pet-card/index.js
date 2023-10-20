import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Badge, Box, Grid, Tooltip } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PetCardActionButton from "../pet-card-action-button";
import { Link } from "react-router-dom";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { i18n } from "../../assets/i18n";

const flagStyles = {
  match: {
    backgroundColor: "tertiary.main",
    color: "tertiary.contrastText",
  },
  pending: {
    backgroundColor: "secondary.main",
    color: "secondary.contrastText",
  },
  archived: {
    backgroundColor: "neutral.main",
    color: "neutral.contrastText",
  },
  declined: {
    backgroundColor: "red.light",
    color: "neutral.light",
  },
};
const labelCopy = {
  match: "Перфектно съвпадние",
  pending: "Изчаква одобрение",
  archived: "Архивирана",
  declined: "Неодобрена",
};

const PetCard = ({
  isEditable,
  disableFavorites,
  pet: {
    name,
    selectedFiles,
    selectedCoverIndex,
    age,
    gender,
    type,
    breed,
    size,
    id,
    status,
  },
  applications,
}) => {
  return (
    <Card sx={{ width: "320px", maxWidth: "100%", borderRadius: 3 }}>
      <Link
        style={{
          textDecoration: "none",
          position: "relative",
          color: "none",
        }}
        to={`/pet/${id}`}
      >
        <CardMedia
          component="img"
          height="180"
          sx={status === "archived" ? { filter: "grayscale(1)" } : {}}
          image={
            selectedFiles[0]?.url ||
            "https://d.newsweek.com/en/full/2201052/dog.jpg?w=1600&h=1200&q=88&f=56687919043018e29fc48209d009e5ca"
          }
        />
        {status && (
          <Box
            sx={{
              position: "absolute",
              bottom: 20,
              left: 0,
              p: 1,
              ...flagStyles[status],
            }}
          >
            {labelCopy[status]}
          </Box>
        )}
        {isEditable && applications !== undefined ? (
          <Box sx={{ position: "absolute", top: 20, right: 20 }}>
            <Tooltip title={`${applications} активни кандидатури`}>
              <Badge badgeContent={applications} color="primary">
                <TextSnippetIcon color="secondary" />
              </Badge>
            </Tooltip>
          </Box>
        ) : null}
      </Link>
      <CardContent>
        <Grid
          container
          spacing={1}
          justifyContent="space-between"
          color="text.secondary"
        >
          <Grid item xs={10}>
            <Typography variant="h5">
              <strong>{name}</strong>
            </Typography>
            <Typography variant="body2" sx={{ my: 2, height: "45px" }}>
              {i18n[type]} &#183; порода - {i18n[breed]} &#183; {i18n[size]}{" "}
              размер
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <PetCardActionButton
              id={id}
              isEditable={isEditable}
              disableFavorites={disableFavorites}
            />
          </Grid>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <MaleIcon /> {i18n[gender]}
            <AccessTimeOutlinedIcon sx={{ ml: 3, mr: 1 }} /> {age} години
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PetCard;
