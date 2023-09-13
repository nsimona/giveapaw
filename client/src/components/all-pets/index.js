import { Container, Grid, Typography } from "@mui/material";
import PetCard from "../pet-card";
import { useEffect, useState } from "react";
import { getPets } from "../../services/api";
import { useSelector, useDispatch } from "react-redux";

const AllPets = ({ isEditable = false, isFavorites = false }) => {
  const [pets, setPets] = useState([]);
  const favorites = useSelector((state) => state.user.favorites);
  const currentUserId = useSelector((state) => state.user.id);

  const fetchPets = async (queryFavorites) => {
    try {
      const petData = await getPets(queryFavorites);
      setPets(petData);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    if (!isFavorites) {
      fetchPets();
    } else if (isFavorites && favorites !== undefined) {
      fetchPets(favorites);
    }
  }, [favorites, isFavorites]);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={3} justifyContent="start">
        {pets.length ? (
          pets.map((pet) => (
            <Grid item key={pet.id}>
              <PetCard pet={pet} />
            </Grid>
          ))
        ) : (
          <Typography
            variant="h4"
            color="primary"
            sx={{ display: "flex", mx: "auto", my: 8 }}
          >
            Няма добавени животни
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default AllPets;
