import { useEffect, useState } from "react";
import PetsWrapper from "../../components/pets-wrapper";
import { getPetByStatus } from "../../services/api";

const PetsByStatusTab = ({ status }) => {
  const [pets, setPets] = useState([]);

  const getPets = async () => {
    try {
      const pets = await getPetByStatus(status);
      setPets(pets);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPets();
  }, []);

  return <PetsWrapper pets={pets} />;
};

export default PetsByStatusTab;
