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
import { changePetStatus, getPet } from "../../services/api";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setApplicationPet } from "../../redux/slices/application/applicationSlice";
import AdminPetControls from "./admin-pet-controls";
import UserPetControls from "./user-pet-controls";
import { setAlert } from "../../redux/slices/app/appSlice";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const images = [
  {
    img: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/06154034/Akita-standing-outdoors-in-the-summer.jpg",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://cdn.britannica.com/59/234759-050-DA4F2DCF/Akita-dog-Japan.jpg",
    title: "Burger",
  },
  {
    img: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/06155050/Akita-puppy-standing-in-the-grass.jpg",
    title: "Camera",
  },
  {
    img: "https://www.thefarmersdog.com/digest/wp-content/uploads/2022/08/Akita.jpg",
    title: "Coffee",
  },
  {
    img: "https://images.saymedia-content.com/.image/t_share/MTczOTQ1NTY2MTM5OTE3NjE5/dog-breeds-the-akita.jpg",
    title: "Hats",
  },
];

const Pet = () => {
  const [pet, setPet] = useState({});
  let { id } = useParams();
  const userId = useSelector((state) => state.user.id);
  const adminView = useSelector((state) => state.user.role === "admin");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPetInfo = async () => {
    const petInfo = await getPet(id);
    setPet(petInfo);
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
      setPet(updatedPet);
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
        {images.map((item) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
          >
            <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              alt={item.title}
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
              България, София-град
              <Divider sx={{ my: 4 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Основна информация
              </Typography>
              порода, вид, пол...
              <Divider sx={{ my: 4 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Опознай Плутон
              </Typography>
              Описание...
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
                />
              )}
            </Box>
          </Grid>
        </Grid>
        <Grid xs={12}>suggested pets</Grid>
      </Container>
    </Grid>
  );
};
export default Pet;
