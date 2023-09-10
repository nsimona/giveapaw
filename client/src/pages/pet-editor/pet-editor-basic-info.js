import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { setPetEditorData } from "../../redux/slices/petSlice";
import CustomSelect from "../../components/pet-form-inputs/custom-select";
import {
  basicBreedsOptions,
  petAgeOptions,
  petColorsOptions,
  petGenderOptions,
  petSizeOptions,
  petTypeOptions,
} from "../../assets/pet-options";
import CustomRadioGroup from "../../components/pet-form-inputs/custom-radio-group";

const PetEditorBasicInfo = () => {
  const { name, type, breed, gender, size, age, color, description } =
    useSelector((state) => state.petEditor);
  const dispatch = useDispatch();

  return (
    <Grid container spacing={2} sx={{ justifyContent: "center" }}>
      <Grid item md={6} sm={12}>
        <Typography variant="h5" sx={{ mb: 5, textAlign: "center" }}>
          Основна информация
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="name"
              name="name"
              label="Име"
              value={name}
              onChange={(e) =>
                dispatch(setPetEditorData({ name: e.target.value }))
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <CustomRadioGroup
              id="pet-type"
              options={petTypeOptions}
              label="Вид"
              value={type}
              onChange={(e) =>
                dispatch(setPetEditorData({ type: e.target.value }))
              }
            />
          </Grid>

          <Grid item xs={12}>
            <CustomSelect
              required
              id="pet-breed"
              options={basicBreedsOptions}
              label="Порода"
              value={breed}
              onChange={(e) =>
                dispatch(setPetEditorData({ breed: e.target.value }))
              }
            />
          </Grid>

          <Grid item xs={12}>
            <CustomSelect
              id="pet-color"
              options={petColorsOptions}
              label="Цвят"
              value={color}
              onChange={(e) =>
                dispatch(setPetEditorData({ color: e.target.value }))
              }
            />
          </Grid>

          <Grid item xs={12}>
            <CustomSelect
              required
              id="pet-age"
              options={petAgeOptions}
              label="Възраст"
              value={age}
              onChange={(e) =>
                dispatch(setPetEditorData({ age: e.target.value }))
              }
            />
          </Grid>

          <Grid item xs={12}>
            <CustomRadioGroup
              id="pet-gender"
              options={petGenderOptions}
              label="Пол"
              value={gender}
              onChange={(e) =>
                dispatch(setPetEditorData({ gender: e.target.value }))
              }
            />
          </Grid>

          <Grid item xs={12}>
            <CustomRadioGroup
              id="pet-size"
              options={petSizeOptions}
              label="Размер"
              value={size}
              onChange={(e) =>
                dispatch(setPetEditorData({ size: e.target.value }))
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Кратко описание"
              multiline
              rows={5}
              fullWidth
              value={description}
              onChange={(e) =>
                dispatch(setPetEditorData({ description: e.target.value }))
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PetEditorBasicInfo;
