import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../redux/slices/app/appSlice";

const AlertNotification = () => {
  const [open, setOpen] = useState(false);
  const alert = useSelector((state) => state?.app?.alert);

  const dispatch = useDispatch();

  const clearAlert = () => {
    dispatch(setAlert({ severity: "", message: "" }));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    clearAlert();
  };

  useEffect(() => {
    if (alert.severity) {
      setOpen(true);
    }
  }, [alert.severity]);

  if (!alert.severity) {
    return;
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={alert.severity}
        sx={{ width: "100%" }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertNotification;
