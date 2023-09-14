import { useEffect, useState } from "react";
import PetsWrapper from "../../components/pets-wrapper";
import { getPetByStatus } from "../../services/api";
import { useDispatch } from "react-redux";
import { setAlert } from "../../redux/slices/app/appSlice";

const PetsByStatusTab = ({ status }) => {
  const [pets, setPets] = useState([]);

  const dispatch = useDispatch();

  const getPets = async () => {
    try {
      const pets = await getPetByStatus(status);
      setPets(pets);
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          severity: "error",
          message: `Грешка при зареждане на животни, ${error.response.data.errors[0].message}`,
        })
      );
    }
  };

  useEffect(() => {
    getPets();
  }, []);

  return <PetsWrapper pets={pets} />;
};

export default PetsByStatusTab;
