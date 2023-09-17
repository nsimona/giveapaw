import { Container, Grid, InputAdornment } from "@mui/material";
import CustomSelect from "../pet-form-inputs/custom-select";
import PetsIcon from "@mui/icons-material/Pets";
import TypeSpecimenOutlinedIcon from "@mui/icons-material/TypeSpecimenOutlined";
// import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";
import { petTypeOptions } from "../../assets/pet-options";

const CustomSelectFiltersWrapper = ({ id, options, label, value, icon }) => {
  return (
    <CustomSelect
      id="search-age"
      options={petTypeOptions}
      label={label}
      value="dog"
      fullWidth={false}
      selectProps={{
        size: "small",
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
      onChange={(e) => {}}
      sx={{ flex: 1 }}
    />
  );
};

const SearchFilters = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        pb: 2,
        mb: 2,
        borderBottom: "1px solid",
        borderColor: "#ececec",
      }}
    >
      <Grid
        sx={{
          display: "flex",
          gap: 2,
          my: 2,
        }}
      >
        <CustomSelectFiltersWrapper icon={<PetsIcon />} label="Вид" />
        <CustomSelectFiltersWrapper
          icon={<TypeSpecimenOutlinedIcon />}
          label="Порода"
        />
        <CustomSelectFiltersWrapper
          icon={<AccessTimeOutlinedIcon />}
          label="Възраст"
        />
        <CustomSelectFiltersWrapper
          icon={<ColorLensOutlinedIcon />}
          label="Цвят"
        />
        <CustomSelectFiltersWrapper
          icon={<StraightenOutlinedIcon />}
          label="Размер"
        />
        <CustomSelectFiltersWrapper icon={<FemaleOutlinedIcon />} label="Пол" />
      </Grid>
    </Container>
  );
};

export default SearchFilters;

// type: string;
// age: number;
// breed: string;
// gender: string;
// color: string;
// size: string;
