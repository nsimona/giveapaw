import { useDispatch, useSelector } from "react-redux";
import Application from ".";
import { createApplication } from "../../services/api";
import { setAlert } from "../../redux/slices/app/appSlice";
import ApplicationBox from "../../components/application-box";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const CreateApplicationWrapper = () => {
  const [message, setMessage] = useState("");
  const [candidatePhone, setCandidatePhone] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");

  const pet = useSelector((state) => state.application);
  const dispatch = useDispatch();

  const apply = async () => {
    try {
      const application = await createApplication({
        petId: pet.id,
        message,
        candidatePhone,
        candidateEmail,
        // candidate name
      });

      if (application.id) {
        dispatch(
          setAlert({
            severity: "success",
            message: `Успешно кандидатсва за осиновител на ${pet.name}`,
          })
        );
        // TODO navigate to success page
      }
    } catch (error) {
      dispatch(
        setAlert({
          severity: "error",
          message: `Кандидатурата не е изпратена ${error}`,
        })
      );
    }
  };

  return (
    <Application pet={pet}>
      <ApplicationBox title="Допълни своята кандидатура">
        <TextField
          required
          multiline
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          rows={5}
          fullWidth
          placeholder={`Изпрати персонално съобщение до собственика на ${pet.name}`}
        />
      </ApplicationBox>
      <ApplicationBox title="Информация*">
        <TextField
          required
          id="name"
          name="name"
          label="Телефон"
          value={candidatePhone}
          onChange={(e) => {
            setCandidatePhone(e.target.value);
          }}
          fullWidth
        />
        <TextField
          required
          id="name"
          name="name"
          label="Имейл"
          value={candidateEmail}
          onChange={(e) => {
            setCandidateEmail(e.target.value);
          }}
          fullWidth
          sx={{ my: 2 }}
        />
        <Typography variant="body2" sx={{ px: 1 }} color="neutral">
          *Задължително е да попълниш полетата преди да изпратиш кандидатурата;
          провери два път данните, които предоставяш
        </Typography>
      </ApplicationBox>

      <Button
        variant="contained"
        size="big"
        sx={{ alignSelf: "center" }}
        onClick={apply}
      >
        Изпрати
      </Button>
    </Application>
  );
};

export default CreateApplicationWrapper;
