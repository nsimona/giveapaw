import ChevronLeftOutlined from "@mui/icons-material/ChevronLeftOutlined";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import FaceIcon from "@mui/icons-material/Face";
import Face2Icon from "@mui/icons-material/Face2";
import Face3Icon from "@mui/icons-material/Face3";
import Face4Icon from "@mui/icons-material/Face4";
import Face5Icon from "@mui/icons-material/Face5";
import Face6Icon from "@mui/icons-material/Face6";
import PetsIcon from "@mui/icons-material/Pets";

import { useEffect, useState } from "react";
import ApplicationMatch from "../../components/application-match";
import ApplicationBox from "../../components/application-box";

const faces = [
  <FaceIcon />,
  <Face2Icon />,
  <Face3Icon />,
  <Face4Icon />,
  <Face5Icon />,
  <Face6Icon />,
];

const Application = ({
  name,
  type,
  id,
  onApply,
  readOnly = false,
  application,
}) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [candidatePhone, setCandidatePhone] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [currentFaceIcon, setCurrentFaceIcon] = useState(0);

  useEffect(() => {
    if (application !== undefined) {
      setCandidatePhone(application.candidatePhone);
      setCandidateEmail(application.candidateEmail);
      setMessage(application.message);
    }
  }, [application]);

  const onApplyClick = () => {
    onApply(message, candidatePhone, candidateEmail);
  };

  return (
    <>
      <AppBar sx={{ py: 2 }} position="static" color="secondary">
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Button
            disabled={readOnly}
            startIcon={<ChevronLeftOutlined />}
            sx={{ alignSelf: "flex-start" }}
            color="neutral"
            onClick={() => navigate(-1)}
          >
            Назад
          </Button>
          <Typography variant="body2" sx={{ color: "#fff" }}>
            Кандидатура за осиновяване | {name}
          </Typography>
          <Typography variant="body2" sx={{ color: "#fff" }}>
            {new Date().toLocaleDateString("bg-BG")}
          </Typography>
        </Container>
      </AppBar>
      <Container
        maxWidth="sm"
        sx={{ py: 4, display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            color: "neutral",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              color: "neutral",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              disabled={readOnly}
              onClick={() =>
                currentFaceIcon === faces.length - 1
                  ? setCurrentFaceIcon(0)
                  : setCurrentFaceIcon(currentFaceIcon + 1)
              }
            >
              {faces[currentFaceIcon]}
            </IconButton>
            <Typography variant="subtitle1" sx={{ px: 1 }}>
              <strong>Юлия</strong>
            </Typography>
          </Box>
          <Box
            sx={{
              color: "neutral",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <PetsIcon color="neutralText" />
            <Typography variant="subtitle1" sx={{ px: 1 }}>
              <strong>{name}</strong>
            </Typography>
          </Box>
        </Box>
        <Divider />

        <ApplicationMatch type="full-match" />
        <ApplicationMatch type="good-match" />

        {/* <ApplicationBox title="Повече за Юлия">
        </ApplicationBox> */}
        <ApplicationBox title="Идеалният домашен любимец на Юлия е">
          <Box
            sx={{
              bgcolor: "neutral.grey",
              px: 2,
              py: 1,
              borderRadius: 5,
              color: "neutral.contrastText",
              display: "inline-flex",
            }}
          >
            активен
          </Box>
        </ApplicationBox>

        <ApplicationBox title="Допълни своята кандидатура">
          <TextField
            disabled={readOnly}
            required
            multiline
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            rows={5}
            fullWidth
            placeholder={`Изпрати персонално съобщение до собственика на ${name}`}
          />
        </ApplicationBox>
        <ApplicationBox title="Информация*">
          <TextField
            disabled={readOnly}
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
            disabled={readOnly}
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
          {!readOnly && (
            <Typography variant="body2" sx={{ px: 1 }} color="neutral">
              *Задължително е да попълниш полетата преди да изпратиш
              кандидатурата; провери два път данните, които предоставяш
            </Typography>
          )}
        </ApplicationBox>

        {!readOnly && (
          <Button
            variant="contained"
            size="big"
            sx={{ alignSelf: "center" }}
            onClick={onApplyClick}
          >
            Изпрати
          </Button>
        )}
        {/* 
        <ApplicationBox title="Изпрати персонално съобщение до Юлия">
          <TextField
            required
            multiline
            rows={5}
            fullWidth
            placeholder="Имейл, телефон..."
          />
        </ApplicationBox>

        <Box display="flex" gap={3} justifyContent="center">
          <Button variant="contained" size="big" color="red">
            Отхвърли
          </Button>
          <Button variant="contained" size="big" color="green">
            Одобри
          </Button>
        </Box> */}
      </Container>
    </>
  );
};

export default Application;
