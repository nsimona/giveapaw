import { Box, Button, Container, Grid, Typography } from "@mui/material";
import CustomSelect from "../pet-form-inputs/custom-select";
import {
  basicBreedsOptions,
  breedsOptions,
  petColorsOptions,
  petTypeOptions,
} from "../../assets/pet-options";
import { useState } from "react";
import { useNavigate } from "react-router";
import main from "../../assets/images/main.jpg";

// import PetsIcon from "@mui/icons-material/Pets";
// import TypeSpecimenOutlinedIcon from "@mui/icons-material/TypeSpecimenOutlined";
// import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
// import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
// import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
// import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";

const SearchMain = () => {
  const [query, setQuery] = useState({
    breed: "",
    color: "",
    type: "",
  });
  const [breeds, setBreeds] = useState(basicBreedsOptions);

  const navigate = useNavigate();

  const setSearchQuery = (value, selectName) => {
    console.log(breedsOptions[value]);
    if (selectName === "type") {
      setBreeds([...breedsOptions[value], ...basicBreedsOptions]);
    }
    setQuery({
      ...query,
      [selectName]: value,
    });
  };

  const search = () => {
    const { type, breed, color } = query;
    if (type === "" && breed === "" && color === "") {
      return;
    }
    const queryParams = [];

    if (type !== "all") {
      queryParams.push(`type=${type}`);
    }

    if (breed !== "all") {
      queryParams.push(`breed=${breed}`);
    }

    if (color !== "all") {
      queryParams.push(`color=${color}`);
    }

    const searchQuery = queryParams.join("&");
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Box
      sx={{
        height: "500px",
        backgroundImage: `url(${main})`,
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
                options={[...petTypeOptions, { value: "all", title: "всички" }]}
                label="Вид"
                value={query.type}
                selectProps={{
                  size: "small",
                  // startAdornment: (
                  //   <InputAdornment position="start">
                  //     <PetsIcon />
                  //   </InputAdornment>
                  // ),
                }}
                onChange={(e) => setSearchQuery(e.target.value, "type")}
              />
            </Grid>

            <Grid item flex={1}>
              <CustomSelect
                id="search-breed"
                options={[...breeds, { value: "all", title: "всички" }]}
                label="Порода"
                value={query.breed}
                selectProps={{ size: "small" }}
                onChange={(e) => setSearchQuery(e.target.value, "breed")}
              />
            </Grid>

            <Grid item flex={1}>
              <CustomSelect
                id="search-color"
                options={[
                  ...petColorsOptions,
                  { value: "all", title: "всички" },
                ]}
                label="Цвят"
                value={query.color}
                selectProps={{ size: "small" }}
                onChange={(e) => setSearchQuery(e.target.value, "color")}
              />
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                sx={{ px: 2 }}
                onClick={search}
              >
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
