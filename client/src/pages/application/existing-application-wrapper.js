/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import Application from ".";
import { changeApplicationStatus, getApplication } from "../../services/api";
import { setAlert } from "../../redux/slices/app/appSlice";
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Loading from "../../components/loading";
import ApplicationBox from "../../components/application-box";

const candidateStatusMessage = {
  approved:
    "Твоята кандидатура беше одобрена! Очаквай телефонно обаждане/мейл.",
  declined: "За съжаление товята кандидатура беше отказана :/",
  created: "Твоята кандидатура очаква разглеждане.",
};

const ExisitingApplicationWrapper = ({ applictionId, ownerView = false }) => {
  const [application, setApplication] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const getExistingApplication = async () => {
    try {
      const existingApplication = await getApplication(applictionId);
      setApplication(existingApplication);
    } catch (error) {
      dispatch(setAlert({ type: "error", message: error }));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getExistingApplication();
  }, []);

  const changeStatus = async (status) => {
    try {
      const updatedApplication = await changeApplicationStatus({
        applicationId: application.id,
        status,
      });
      setApplication(updatedApplication);
    } catch (error) {
      // alert
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Application pet={application.pet} readOnly>
      <ApplicationBox title="Персонално съобщение">
        <Typography variant="body2">{application.message}</Typography>
      </ApplicationBox>

      <ApplicationBox title="Данни за контакт">
        <Typography variant="body2">
          Телефон: {application.candidatePhone}
        </Typography>
        <Typography variant="body2">
          Имейл: {application.candidateEmail}
        </Typography>
      </ApplicationBox>

      {ownerView ? (
        <Box display="flex" gap={3} justifyContent="center">
          <Button
            variant="contained"
            size="big"
            color="red"
            disabled={application.status !== "created"}
            onClick={() => changeStatus("declined")}
          >
            Отхвърли
          </Button>
          <Button
            variant="contained"
            size="big"
            color="green"
            disabled={application.status !== "created"}
            onClick={() => changeStatus("approved")}
          >
            Одобри
          </Button>
        </Box>
      ) : (
        <Typography variant="body2" color="primary">
          <strong>{candidateStatusMessage[application.status]}</strong>
        </Typography>
      )}
    </Application>
  );
};

export default ExisitingApplicationWrapper;
