import { useDispatch, useSelector } from "react-redux";
import Application from ".";
import { createApplication } from "../../services/api";
import { setAlert } from "../../redux/slices/app/appSlice";

const CreateApplicationWrapper = () => {
  const pet = useSelector((state) => state.application);
  const dispatch = useDispatch();

  const apply = async (message, candidatePhone, candidateEmail) => {
    try {
      const application = await createApplication({
        petId: pet.id,
        message,
        candidatePhone,
        candidateEmail,
      });
      console.log(application);
      if (application.id) {
        dispatch(
          setAlert({
            type: "success",
            message: `Успешно кандидатсва за осиновител на ${pet.name}`,
          })
        );
        // TODO navigate to success page
      }
    } catch (error) {
      dispatch(
        setAlert({
          type: "error",
          message: `Кандидатурата не е изпратена ${error}`,
        })
      );
    }
  };

  return <Application name={pet.name} onApply={apply} />;
};

export default CreateApplicationWrapper;
