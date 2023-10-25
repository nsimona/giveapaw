import { Box, Button, Container, Grid, Typography } from "@mui/material";
import CustomSelect from "../pet-form-inputs/custom-select";
import { basicBreedsOptions, petTypeOptions } from "../../assets/pet-options";
// import PetsIcon from "@mui/icons-material/Pets";
// import TypeSpecimenOutlinedIcon from "@mui/icons-material/TypeSpecimenOutlined";
// import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
// import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
// import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
// import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";
// https://images.unsplash.com/photo-1551779891-b83901e1f8b3?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D

const SearchMain = () => {
  return (
    <Box
      sx={{
        height: "500px",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        display: "flex",
        alignItems: "end",
        mb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            py: 5,
          }}
        >
          <Typography variant="h2" color="#fff">
            <strong>Намери своя нов най-добър приятел</strong>
          </Typography>

          <Typography variant="h4" color="#fff">
            Разгледай над 300 домашни любимци от България
          </Typography>
        </Box>
        <Box
          sx={{
            background: "rgba( 255, 255, 255, 0.7 )",
            backdropFilter: "blur( 5px )",
            borderRadius: "24px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
            mb: 5,
            p: 5,
          }}
        >
          <Grid container gap={2}>
            <Grid item flex={1}>
              <CustomSelect
                id="search-type"
                options={petTypeOptions}
                label="Вид"
                value=""
                selectProps={{
                  size: "small",
                  // startAdornment: (
                  //   <InputAdornment position="start">
                  //     <PetsIcon />
                  //   </InputAdornment>
                  // ),
                }}
                onChange={(e) => {}}
              />
            </Grid>

            <Grid item flex={1}>
              <CustomSelect
                id="search-breed"
                options={basicBreedsOptions}
                label="Порода"
                value=""
                selectProps={{ size: "small" }}
                onChange={(e) => {}}
              />
            </Grid>

            <Grid item flex={1}>
              <CustomSelect
                id="search-age"
                options={basicBreedsOptions}
                label="Възраст"
                value=""
                selectProps={{ size: "small" }}
                onChange={(e) => {}}
              />
            </Grid>

            <Grid item>
              <Button variant="contained" color="secondary" sx={{ px: 2 }}>
                Търсене
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
export default SearchMain;
