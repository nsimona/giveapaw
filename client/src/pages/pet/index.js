/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Container,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import PetCardActionButton from "../../components/pet-card-action-button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setApplicationPet } from "../../redux/slices/application/applicationSlice";
import AdminPetControls from "./admin-pet-controls";
import UserPetControls from "./user-pet-controls";
import { setAlert } from "../../redux/slices/app/appSlice";
import { i18n } from "../../assets/i18n";
import IconCard from "../../components/icon-card";
import Tag from "../../components/tag";
import FemaleOutlined from "@mui/icons-material/FemaleOutlined";
import MaleOutlined from "@mui/icons-material/MaleOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import PetsIcon from "@mui/icons-material/Pets";
import Banner from "../../components/banner";
import placeholder from "../../assets/images/placeholder.png";
import { getPet } from "../../services/api";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const iterableCharacteristics = [
  "livedInAHouse",
  "healthState",
  "goodWith",
  "characteristics",
];

const imagePlaceholderUrl = placeholder;

const Pet = () => {
  const [pet, setPet] = useState({});
  let { id } = useParams();
  const userId = useSelector((state) => state.user.id);
  const adminView = useSelector((state) => state.user.role === "admin");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPetInfo = async () => {
    try {
      const petInfo = await getPet(id);
      const files = [...petInfo.selectedFiles];
      files.length = 5;
      files.fill(
        { name: "placeholder", url: imagePlaceholderUrl },
        petInfo.selectedFiles.length,
        files.length
      );

      setPet({
        ...petInfo,
        selectedFiles: files,
      });
    } catch (error) {
      console.error("Cannot fetch pet", error);
    }
  };

  useEffect(() => {
    getPetInfo();
  }, []);

  const apply = () => {
    const { name, type, id } = pet;
    dispatch(setApplicationPet({ name, type, id }));
    navigate("/application/create");
  };

  // admin controls

  const onChangeStatusButtonClick = async (status, message) => {
    try {
      const updatedPet = await changePetStatus({ petId: id, status, message });
      // an ugly workaround, apologies
      // setPet(updatedPet);
      getPetInfo();
      dispatch(
        setAlert({
          severity: "success",
          message: "Успешно променен статус",
        })
      );
    } catch (error) {
      dispatch(
        setAlert({
          severity: "error",
          message: "Грешка, статусът не беше променен",
        })
      );
    }
  };

  return (
    <Grid>
      <ImageList
        sx={{ width: "100%", mb: 4 }}
        variant="quilted"
        cols={4}
        rowHeight={260}
      >
        {pet.selectedFiles?.map((item, index) => (
          <ImageListItem
            key={item.img}
            cols={index === 0 ? 2 : 1}
            rows={index === 0 ? 2 : 1}
          >
            <img
              {...srcset(item.url, 121, item.rows, item.cols)}
              alt={item.name}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid container item md={8} xs={12}>
            <Grid item xs={10} color="text.secondary">
              <Typography variant="h4" color="text.primary">
                <strong>{pet.name}</strong>
              </Typography>
              {i18n[pet.type]}, порода- {i18n[pet.breed]}
              <Divider sx={{ my: 4 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Основна информация
              </Typography>
              <Grid container flexDirection="row">
                <IconCard
                  Icon={pet.gender === "male" ? MaleOutlined : FemaleOutlined}
                  title={i18n.gender}
                  text={i18n[pet.gender]}
                />
                <IconCard
                  Icon={StraightenOutlinedIcon}
                  title={i18n.size}
                  text={i18n[pet.size]}
                />
                <IconCard
                  Icon={AccessTimeOutlinedIcon}
                  title={i18n.age}
                  text={i18n.years[pet.age]}
                />
                <IconCard
                  Icon={ColorLensOutlinedIcon}
                  title={i18n.color}
                  text={i18n[pet.color]}
                />
                <IconCard
                  Icon={PetsIcon}
                  title={i18n.trained}
                  text={i18n[pet.trained]}
                />
              </Grid>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Характеристики
              </Typography>
              {iterableCharacteristics.map((c) => {
                if (pet[c]?.length === 0) {
                  return "";
                }
                return (
                  <>
                    <Typography variant="body1" sx={{ m: 1 }}>
                      {i18n[c]}
                    </Typography>
                    {pet[c]?.map((value) => (
                      <Tag text={i18n[value]} />
                    ))}
                  </>
                );
              })}
              <Divider sx={{ my: 4 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Опознай {pet.name}
              </Typography>
              <Typography variant="body2">
                {pet.description || "Липсва описание"}
              </Typography>
              <Divider sx={{ my: 4 }} />
            </Grid>
            <Grid item xs={2} justifyContent="end">
              <PetCardActionButton id={id} isEditable={pet.userId === userId} />
            </Grid>
          </Grid>
          <Grid item md={4} xs={12} color="text.secondary">
            <Box
              sx={{
                border: "1px solid",
                borderColor: "neutral.dark",
                borderRadius: 2,
                padding: 3,
                display: "flex",
                gap: 2,
                flexDirection: "column",
              }}
            >
              {adminView ? (
                <AdminPetControls
                  petStatus={pet.status}
                  onButtonClick={onChangeStatusButtonClick}
                />
              ) : (
                <UserPetControls
                  buttonDisabled={!userId || pet.userId === userId}
                  onButtonClick={apply}
                  petName={pet.name}
                />
              )}
            </Box>
          </Grid>
        </Grid>
        <Banner />
      </Container>
    </Grid>
  );
};
export default Pet;
