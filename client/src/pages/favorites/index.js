import { useEffect, useState } from "react";
import PetsWrapper from "../../components/pets-wrapper";
import { getPets } from "../../services/api";
import Loading from "../../components/loading";
import { useSelector } from "react-redux";

function Favorites() {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // favorite pets ids
  const ids = useSelector((state) => state.user.favorites);

  const fetchPets = async () => {
    try {
      const petData = await getPets(ids);
      setPets(petData);
    } catch (error) {
      console.error("Error fetching pets:", error);
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
