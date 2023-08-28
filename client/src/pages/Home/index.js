import { Container, Grid } from "@mui/material";
import PetCard from "../../components/pet-card";

function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item>
          <PetCard
            isFavourite
            name="Плутон"
            gender="мъжки"
            age="1 година"
            coverPhoto="https://d.newsweek.com/en/full/2201052/dog.jpg?w=1600&h=1200&q=88&f=56687919043018e29fc48209d009e5ca"
            type="куче"
            breed="немска овчарка"
            size="среден размер"
          />
        </Grid>
        <Grid item>
          <PetCard
            item
            isFavourite
            name="Плутон"
            gender="мъжки"
            age="1 година"
            coverPhoto="https://d.newsweek.com/en/full/2201052/dog.jpg?w=1600&h=1200&q=88&f=56687919043018e29fc48209d009e5ca"
            type="куче"
            breed="немска овчарка"
            size="среден размер"
          />
        </Grid>
        <Grid item>
          <PetCard
            item
            isFavourite
            name="Плутон"
            gender="мъжки"
            age="1 година"
            coverPhoto="https://d.newsweek.com/en/full/2201052/dog.jpg?w=1600&h=1200&q=88&f=56687919043018e29fc48209d009e5ca"
            type="куче"
            breed="немска овчарка"
            size="среден размер"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
