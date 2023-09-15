import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Badge, Box, Grid, Tooltip } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import PetCardActionButton from "../pet-card-action-button";
import { Link } from "react-router-dom";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

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
};
const labelCopy = {
  match: "Перфектно съвпадние",
  pending: "Изчаква одобрение",
  archived: "Архивирана",
};

const PetCard = ({
  isEditable,
  pet: { name, coverPhoto, age, gender, type, breed, size, id, status = null },
  onApplicationsButtonClick,
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
          sx={
            status === "pending" || status === "archived"
              ? { filter: "grayscale(1)" }
              : {}
          }
          image="https://d.newsweek.com/en/full/2201052/dog.jpg?w=1600&h=1200&q=88&f=56687919043018e29fc48209d009e5ca"
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
        {isEditable ? (
          <Box
            sx={{ position: "absolute", top: 20, right: 20 }}
            onClick={onApplicationsButtonClick}
          >
            <Tooltip title="4 кандидатури">
              <Badge badgeContent={4} color="primary">
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
              {type} &#183; {breed} &#183; {size}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <PetCardActionButton id={id} isEditable={isEditable} />
          </Grid>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <MaleIcon /> {gender}
            <AccessAlarmIcon sx={{ ml: 3 }} /> {age}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PetCard;
