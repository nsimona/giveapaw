import ChevronLeftOutlined from "@mui/icons-material/ChevronLeftOutlined";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
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

import { useState } from "react";
import ApplicationMatch from "../../components/application-match";
import ApplicationBox from "../../components/application-box";

const faceIcons = [
  <FaceIcon />,
  <Face2Icon />,
  <Face3Icon />,
  <Face4Icon />,
  <Face5Icon />,
  <Face6Icon />,
];

const mock = {
  breed: "Husky",
  gender: "Female",
  color: "Grey",
  size: "Large",
  trained: true,
};

const Application = ({
  pet: { name, type, id },
  readOnly = false,
  date = new Date().toLocaleDateString("bg-BG"),
  children,
}) => {
  const navigate = useNavigate();
  const [currentFaceIcon, setCurrentFaceIcon] = useState(0);

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
            {date}
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
                currentFaceIcon === faceIcons.length - 1
                  ? setCurrentFaceIcon(0)
                  : setCurrentFaceIcon(currentFaceIcon + 1)
              }
            >
              {faceIcons[currentFaceIcon]}
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
        {Object.keys(mock).map((feature, index) => (
          <ApplicationMatch
            key={index}
            type="full-match"
            petValue={[feature, mock[feature]]}
            userPreference={[feature, mock[feature]]}
          />
        ))}
        <ApplicationMatch type="full-match" />
        {/* <ApplicationMatch type="good-match" /> */}
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
        {children}
      </Container>
    </>
  );
};

export default Application;
