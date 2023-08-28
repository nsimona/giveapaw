import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import { petLabelDict as data } from "../../assets/pet-dict";
import { useSelector } from "react-redux";
import { petDataAsString } from "../../utils/normalizeData";

const PetEditorSummary = () => {
  const petData = useSelector((state) => state.petEditor);
  const photos = petData.selectedFiles;

  return (
    <Grid container spacing={2} sx={{ justifyContent: "center" }}>
      <Grid item md={8} xs={12}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ mb: 5, textAlign: "center" }} xs={12}>
            Преглед и запазване
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={12} md={6}>
            <div>
              {Object.entries(data).map(([label, value], index) => (
                <Typography key={index} variant="body1">
                  <strong>{value}</strong>: {petDataAsString(petData[label])}
                </Typography>
              ))}
            </div>
          </Grid>
          <Grid container item xs={12} md={6} spacing={3}>
            {photos.map((file, index) => (
              <Grid item md={6} xs={12} key={file.name}>
                <Card key={index}>
                  <CardMedia
                    component="div"
                    style={{
                      backgroundSize: "cover",
                      backgroundImage: `url(${file})`,
                      height: 150,
                    }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PetEditorSummary;
