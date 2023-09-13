import { Container, Grid, Typography } from "@mui/material";
import PetCard from "../pet-card";
import { useEffect, useState } from "react";
import { getPets } from "../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedin } from "../../redux/slices/user/userSlice";

const AllPets = ({ isEditable = false, isFavorites = false }) => {
  const [pets, setPets] = useState([]);
  const isLoggedin = useSelector(selectIsLoggedin);
  const favorites = useSelector((state) => state.user.favorites);
  const dispatch = useDispatch();

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
              <PetCard
                isEditable={isEditable}
                name={pet.name}
                gender={pet.gender}
                age={pet.age}
                coverPhoto="https://d.newsweek.com/en/full/2201052/dog.jpg?w=1600&h=1200&q=88&f=56687919043018e29fc48209d009e5ca"
                type={pet.type}
                breed={pet.breed}
                size={pet.size}
                id={pet.id}
              />
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
