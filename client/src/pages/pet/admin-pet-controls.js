import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { setAlert } from "../../redux/slices/app/appSlice";
import { useDispatch } from "react-redux";

const AdminPetControls = ({ petName, petStatus, onButtonClick }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const onClick = (status) => {
    if (!message) {
      dispatch(
        setAlert({
          severity: "error",
          message:
            "Задължително е да оставиш коментар преди да промениш статуса на обявата",
        })
      );
      return;
    }
    onButtonClick(status, message);
    setMessage("");
  };

  return (
    <>
      <Typography variant="h6">
        <strong>Промени статуса на обявата за {petName}</strong>
      </Typography>
      {petStatus === "pending" && (
        <>
          <Button
            variant="contained"
            color="green"
            onClick={() => onClick("active")}
          >
            Одобри
          </Button>
          <Button
            variant="contained"
            color="red"
            onClick={() => onClick("declined")}
          >
            Отхвърли
          </Button>
        </>
      )}

      {petStatus === "active" && (
        <Button
          variant="contained"
          color="blue"
          onClick={() => onClick("archived")}
        >
          Архивирай
        </Button>
      )}

      {(petStatus === "archived" || petStatus === "declined") && (
        <Typography variant="body2">
          Обявата не е активна и не могат да бъдат правени промени по нейния
          статус
        </Typography>
      )}

      {petStatus !== "archived" && petStatus !== "declined" && (
        <>
          <Typography variant="body2">
            Задължително е да оставиш коментар преди да промениш статуса на
            обявата
          </Typography>
          <TextField
            multiline
            rows={3}
            fullWidth
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Коментар при промяна на статус"
          />
        </>
      )}
    </>
  );
};

export default AdminPetControls;
