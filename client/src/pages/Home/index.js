/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PetsWrapper from "../../components/pets-wrapper";
import { getPets } from "../../services/api";
import Loading from "../../components/loading";
import { useDispatch } from "react-redux";
import { setAlert } from "../../redux/slices/app/appSlice";
import SearchMain from "../../components/search/search-main";

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
          message: `Грешка при зареждане на всички животни, ${error.response.data.errors[0].message}`,
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
      {/* <Box>pets cards here</Box> */}
      <PetsWrapper pets={pets} />;
    </>
  );
}

export default Home;
