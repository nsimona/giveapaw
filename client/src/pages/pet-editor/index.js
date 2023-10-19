import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PetEditorBasicInfo from "./pet-editor-basic-info";
import PetEditorCharacteristics from "./pet-editor-characteristics";
import Wrapper from "../../components/wrapper";
import PetEditorUploadPhotos from "./pet-editor-upload-photos";
import { Link, Tooltip } from "@mui/material";
import { createNewPet, updateExistingPet } from "../../redux/slices/petThunks";
import { useDispatch, useSelector } from "react-redux";
import { getPet } from "../../services/api";
import { useParams } from "react-router";
import { setPetEditorData } from "../../redux/slices/petSlice";
import { setAlert } from "../../redux/slices/app/appSlice";

const steps = ["Основна информация", "Характеристики", "Снимки"];

function getStepContent(step, onUploadPhotos) {
  switch (step) {
    case 0:
      return <PetEditorBasicInfo />;
    case 1:
      return <PetEditorCharacteristics />;
    case 2:
      return <PetEditorUploadPhotos onUploadPhotos={onUploadPhotos} />;
    default:
      throw new Error("Unknown step");
  }
}

const PetEditor = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [formDataWithAppendedPhotos, setFormDataWithAppendedPhotos] =
    React.useState();
  const dispatch = useDispatch();
  let { id } = useParams();

  React.useEffect(() => {
    if (id) {
      getPet(id)
        .then((resp) => {
          dispatch(setPetEditorData(resp));
        })
        .catch((error) => {
          dispatch(
            setAlert({
              severity: "error",
              message: `Грешка при зареждане, ${error}`,
            })
          );
        });
    }
  }, [id]);

  // this is generally not a good practice; need to refactor this, but for this project it is not worth it
  const onUploadPhotos = (formData) => {
    if (id) {
      dispatch(
        setAlert({
          severity: "warning",
          message:
            "Промяна на снимките няма да бъде отразена към настоящия момент",
        })
      );
    }
    setFormDataWithAppendedPhotos(formData);
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  // obviously I am in hurry, otherwise this won't be like that
  // I hate being in hurry :/
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      if (id) {
        dispatch(updateExistingPet({ formData: formDataWithAppendedPhotos }));
        return;
      }
      dispatch(createNewPet({ formData: formDataWithAppendedPhotos }));
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  return (
    <Wrapper sx={{ width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} sx={{ mb: 8 }} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">незадължително</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <Typography sx={{ mt: 2, mb: 1, textAlign: "center" }}>
            Успешно запазване! След одобрение от администратор обявата ще бъде
            видима на сайта.
            <br />
            <Link to="/">Начало</Link>
          </Typography>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep, onUploadPhotos)}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="neutralText"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                variant="outlined"
              >
                Назад
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button
                  color="neutralText"
                  onClick={handleSkip}
                  sx={{ mr: 1 }}
                  variant="outlined"
                >
                  Пропусни тази стъпка
                </Button>
              )}
              <Tooltip
                title="За да преминеш към следващата стъпка, първо трябва да завършиш тази"
                followCursor
              >
                <span>
                  <Button onClick={handleNext} variant="contained">
                    {activeStep === steps.length - 1
                      ? "Запази"
                      : "Следваща стъпка"}
                  </Button>
                </span>
              </Tooltip>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Wrapper>
  );
};

export default PetEditor;
