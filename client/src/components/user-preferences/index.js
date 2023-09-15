import * as React from "react";
import Grid from "@mui/material/Grid";
import CustomAutocomplete from "../pet-form-inputs/custom-autocomplete";
import {
  characteristicsOptions,
  houseConditionsOptions,
  petTrainedOptions,
  petTypeOptions,
} from "../../assets/pet-options";
import { Button, Typography } from "@mui/material";
import CustomSelect from "../pet-form-inputs/custom-select";
import {
  basicBreedsOptions,
  petAgeOptions,
  petColorsOptions,
  petGenderOptions,
  petSizeOptions,
} from "../../assets/pet-options";
import {
  ownerTypeOptions,
  outdoorSpacesOptions,
} from "../../assets/preferences-options";
import CustomRadioGroup from "../pet-form-inputs/custom-radio-group";

const UserPreferences = () => {
  return (
    <Grid container>
      <Grid item md={6} sm={12}>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Разкажи ни повече за себе си
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CustomSelect
              id="owner-type"
              label="Имаш ли други домашни любимци"
              value=""
              onChange={() => {}}
              options={ownerTypeOptions}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomAutocomplete
              id="current-house-tags"
              options={houseConditionsOptions}
              value={[]}
              onChange={() => {}}
              label="Домът ти е"
            />
          </Grid>
          <Grid item xs={12}>
            <CustomAutocomplete
              id="outdoor-spaces-tags"
              options={outdoorSpacesOptions}
              value={[]}
              onChange={() => {}}
              label="Външни пространства"
            />
          </Grid>
        </Grid>
        <Typography variant="h6" color="text.secondary" sx={{ my: 2 }}>
          Разкажи ни повече за твоя бъдещ домашен любимец
        </Typography>
        <Grid container spacing={3} sx={{ justifyContent: "end" }}>
          <Grid item xs={12}>
            <CustomRadioGroup
              id="pet-type"
              options={petTypeOptions}
              label="Бих искал да осиновя"
              value="dog"
              onChange={() => {}}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomSelect
              required
              id="pet-breed"
              options={basicBreedsOptions}
              label="Порода"
              value=""
              onChange={() => {}}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomAutocomplete
              id="pet-color-tags"
              options={petColorsOptions}
              value={[]}
              onChange={() => {}}
              label="Предпочитания за цвят"
            />
          </Grid>

          <Grid item xs={12}>
            <CustomSelect
              required
              id="pet-age"
              options={petAgeOptions}
              label="Възраст"
              value=""
              onChange={() => {}}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomRadioGroup
              id="pet-gender"
              options={petGenderOptions}
              label="Пол"
              value=""
              onChange={() => {}}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomRadioGroup
              id="pet-size"
              options={petSizeOptions}
              label="Размер"
              value=""
              onChange={() => {}}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12}>
              <CustomRadioGroup
                id="pet-trained"
                options={petTrainedOptions}
                label="Предпочитание за дресиран домашен любимец"
                value=""
                onChange={() => {}}
              />
            </Grid>
          </Grid>

          {/* <Grid item xs={12}>
            <CustomAutocomplete
              id="healthState-tags"
              options={healthStateOptions}
              value={[]}
              onChange={() => {}}
              label="Здравословно състояние"
            />
          </Grid> */}

          <Grid item xs={12}>
            <CustomAutocomplete
              id="characteristics-tags"
              options={characteristicsOptions}
              value={[]}
              onChange={() => {}}
              label="Моят домашен любимец трябва да е"
            />
          </Grid>
          <Button variant="contained" size="large" sx={{ my: 3 }}>
            Запази
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserPreferences;
