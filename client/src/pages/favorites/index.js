/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PetsWrapper from "../../components/pets-wrapper";
import { getPetQuery } from "../../services/api";
import Loading from "../../components/loading";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../redux/slices/app/appSlice";

function Favorites() {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // favorite pets ids
  const ids = useSelector((state) => state.user.favorites);
  const dispatch = useDispatch();

  const fetchPets = async () => {
    try {
      const petData = await getPetQuery({ ids });
      setPets(petData);
    } catch (error) {
      console.error("Error fetching pets:", error);
      dispatch(
        setAlert({
          severity: "error",
          message: `Грешка при зареждане на любими животни, ${error.response.data.errors[0].message}`,
        })
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPets();
  }, [ids]);

  if (isLoading) {
    return <Loading />;
  }

  return <PetsWrapper pets={pets} />;
}

export default Favorites;
