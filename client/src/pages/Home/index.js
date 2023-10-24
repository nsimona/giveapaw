/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PetsWrapper from "../../components/pets-wrapper";
import { getPets } from "../../services/api";
import Loading from "../../components/loading";
import { useDispatch } from "react-redux";
import { setAlert } from "../../redux/slices/app/appSlice";
import SearchMain from "../../components/search/search-main";
// import { Container, Grid } from "@mui/material";
// import { Link } from "react-router-dom";
// import FlipCard from "../../components/flip-card";

function Home() {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const fetchPets = async () => {
    try {
      // add limit - 7
      const petData = await getPets();
      setPets(petData);
    } catch (error) {
      console.error("Error fetching pets:", error);
      dispatch(
        setAlert({
          severity: "error",
          message: `Грешка при зареждане на всички животни`,
        })
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <SearchMain />
      {/* <Container maxWidth="lg" sx={{ py: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item md={2} sm={3} sx={6}>
            <Link to="search?type=dog">
              <FlipCard
                title="Кучета"
                subtitle="Виж всички кучета в ДайЛапа"
                image=""
              />
            </Link>
          </Grid>
          <Grid item md={2} sm={3} sx={6}>
            <Link to="search?type=cat">
              <FlipCard
                title="Котки"
                subtitle="Виж всички котки в ДайЛапа"
                image=""
              />
            </Link>
          </Grid>
          <Grid item md={2} sm={3} sx={6}>
            <Link to="search?type=bird">
              <FlipCard
                title="Птици"
                subtitle="Виж всички птици в ДайЛапа"
                image=""
              />
            </Link>
          </Grid>
        </Grid>
      </Container> */}
      <PetsWrapper pets={pets} />;
    </>
  );
}

export default Home;
