import { Container, Grid, InputAdornment, useMediaQuery } from "@mui/material";
import CustomSelect from "../pet-form-inputs/custom-select";
import PetsIcon from "@mui/icons-material/Pets";
import TypeSpecimenOutlinedIcon from "@mui/icons-material/TypeSpecimenOutlined";
// import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";
import {
  basicBreedsOptions,
  breedsOptions,
  petAgeOptions,
  petColorsOptions,
  petGenderOptions,
  petSizeOptions,
  petTypeOptions,
} from "../../assets/pet-options";
import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";

// TODO export as select with icon separate component
const CustomSelectFiltersWrapper = ({ id, options, label, icon }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectValue, setSelectValue] = useState(searchParams.get(id) || "all");

  const onChange = (e) => {
    setSelectValue(e.target.value);
    searchParams.set(id, e.target.value);
    if (e.target.value === "all") {
      searchParams.delete(id);
    }
    if (id === "type") {
      searchParams.delete("breed");
    }
    setSearchParams(searchParams);
  };

  return (
    <CustomSelect
      id={id}
      options={options}
      label={label}
      value={selectValue}
      fullWidth={false}
      selectProps={{
        size: "small",
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
      onChange={onChange}
      sx={{ flex: 1 }}
    />
  );
};

const enhanceOptions = (options) => {
  return [
    ...options.filter((o) => o.value !== "unknown"),
    { value: "all", title: "всички", selected: true },
  ];
};

const SearchFilters = () => {
  let [searchParams] = useSearchParams();
  const type = searchParams.get("type");
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
        <CustomSelectFiltersWrapper
          id="type"
          icon={<PetsIcon />}
          label="Вид"
          options={enhanceOptions(petTypeOptions)}
        />
        {/* <CustomSelectFiltersWrapper
          id="breed"
          icon={<TypeSpecimenOutlinedIcon />}
          label="Порода"
          options={enhanceOptions(breedsOptions[type])}
        /> */}
        <CustomSelectFiltersWrapper
          id="age"
          icon={<AccessTimeOutlinedIcon />}
          label="Възраст"
          options={enhanceOptions(petAgeOptions)}
        />
        <CustomSelectFiltersWrapper
          id="color"
          icon={<ColorLensOutlinedIcon />}
          label="Цвят"
          options={enhanceOptions(petColorsOptions)}
        />
        <CustomSelectFiltersWrapper
          id="size"
          icon={<StraightenOutlinedIcon />}
          label="Размер"
          options={enhanceOptions(petSizeOptions)}
        />
        <CustomSelectFiltersWrapper
          id="gender"
          icon={<FemaleOutlinedIcon />}
          label="Пол"
          options={enhanceOptions(petGenderOptions)}
        />
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
