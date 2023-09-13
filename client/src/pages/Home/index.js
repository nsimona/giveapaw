import { useEffect, useState } from "react";
import PetsWrapper from "../../components/pets-wrapper";
import { getPets } from "../../services/api";
import Loading from "../../components/loading";

function Home() {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPets = async () => {
    try {
      const petData = await getPets();
      setPets(petData);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPets();
  }, []);
  if (isLoading) {
    return <Loading />;
  }

  return <PetsWrapper pets={pets} />;
}

export default Home;
