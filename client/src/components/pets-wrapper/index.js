import { Container, Grid, Typography } from "@mui/material";
import PetCard from "../pet-card";

const PetsWrapper = ({ pets, noResultsMessage }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={3} justifyContent="center">
        {pets.length ? (
          pets.map((pet) => (
            <Grid md={4} item key={pet.id}>
              <PetCard pet={pet} />
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
