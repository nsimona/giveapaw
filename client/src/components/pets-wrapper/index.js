import { Container, Grid, Typography } from "@mui/material";
import PetCard from "../pet-card";
import { useMemo } from "react";
import AdItem from "../ad-item";

const PetsWrapper = ({
  pets,
  noResultsMessage,
  withAd = false,
  adPosition = 4,
}) => {
  const updatedPets = useMemo(() => {
    const clonedPets = [...pets];
    if (withAd) {
      clonedPets.splice(adPosition, 0, { type: "ad" });
    }
    return clonedPets;
  }, [adPosition, pets, withAd]);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={3} justifyContent="center">
        {pets.length ? (
          updatedPets.map((pet) => (
            <Grid md={4} item key={pet.id}>
              {pet.type === "ad" ? <AdItem /> : <PetCard pet={pet} />}
            </Grid>
          ))
        ) : (
          <Typography
            variant="h4"
            color="primary"
            sx={{ display: "flex", mx: "auto", my: 8 }}
          >
            {noResultsMessage || "Няма добавени животни"}
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default PetsWrapper;
