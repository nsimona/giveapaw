import { Button, Typography } from "@mui/material";

const UserPetControls = ({ petName, buttonDisabled, onButtonClick }) => {
  return (
    <>
      <Typography variant="h6" color="primary">
        <strong>Искаш да осиновиш {petName}?</strong>
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        disabled={buttonDisabled}
        onClick={onButtonClick}
      >
        Кандидатствай за осиновител
      </Button>
      <Typography variant="body2">
        За да се свържеш със собственика на {petName}, канидадатствай през
        платформата
      </Typography>
    </>
  );
};

export default UserPetControls;
