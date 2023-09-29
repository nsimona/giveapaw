import { Button, Typography } from "@mui/material";

const UserPetControls = ({ buttonDisabled, onButtonClick }) => {
  return (
    <>
      <Typography variant="h6">
        <strong>Искаш да осиновиш Плутон?</strong>
      </Typography>
      България, София-град
      <Button
        variant="contained"
        disabled={buttonDisabled}
        onClick={onButtonClick}
      >
        Кандидатствай за осиновител
      </Button>
      <Typography variant="body2">
        За да се свържеш със собственика на Плутон, канидадатствай през
        платформата
      </Typography>
    </>
  );
};

export default UserPetControls;
