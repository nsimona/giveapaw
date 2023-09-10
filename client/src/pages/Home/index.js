import { Container, Grid } from "@mui/material";
import PetCard from "../../components/pet-card";
import AllPets from "../../components/all-pets";

function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <AllPets />
    </Container>
  );
}

export default Home;
