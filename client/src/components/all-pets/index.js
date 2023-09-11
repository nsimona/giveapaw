import { Grid } from "@mui/material";
import PetCard from "../pet-card";
import { useEffect, useState } from "react";
import { getPets } from "../../services/api";
import { useSelector } from "react-redux";

const AllPets = ({ isEditable = false, favorites = false }) => {
  const [pets, setPets] = useState([]);
  const favoritePets = useSelector((state) => state.user.favorites);

  const getAllPets = async () => {
    const pets = await getPets();
    setPets(pets);
  };

  const getFavoritePets = async () => {
    const serializedPetsArray = JSON.stringify(favoritePets);
    const encodedPetsArray = encodeURIComponent(serializedPetsArray);
    console.log(favoritePets);
    // const pets = await getPets(encodedPetsArray);
    setPets(pets);
  };

  useEffect(() => {
    if (!favorites) {
      getAllPets();
      return;
    }
    // getFavoritePets();
  }, []);

  return (
    <Grid container spacing={3} justifyContent="start">
      {pets.length &&
        pets.map((pet) => {
          return (
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
          );
        })}
    </Grid>
  );
};
export default AllPets;
