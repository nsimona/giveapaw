import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Badge,
  BadgeMark,
  Box,
  Button,
  CardActions,
  Divider,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import FavoriteButton from "../favorite-button";
import { Link } from "react-router-dom";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

const PetCard = ({
  isFavourite,
  isEditable,
  name,
  coverPhoto,
  age,
  gender,
  type,
  breed,
  size,
}) => {
  return (
    <Card sx={{ maxWidth: 320, minWidth: 290, borderRadius: 3, my: 3 }}>
      <Link
        style={{
          textDecoration: "none",
          position: "relative",
        }}
      >
        <CardMedia component="img" height="180" image={coverPhoto} />
        {isEditable ? (
          <Box sx={{ position: "absolute", top: 20, right: 20 }}>
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
            <FavoriteButton
              isFavourite={isFavourite}
              onClick={() => {}}
              isEditable={isEditable}
            />
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
