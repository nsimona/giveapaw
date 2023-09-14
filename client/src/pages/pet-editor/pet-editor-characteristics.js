import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  characteristicsOptions,
  goodWithOptions,
  healthStateOptions,
  houseConditionsOptions,
  petTrainedOptions,
} from "../../assets/pet-options";

import { useSelector, useDispatch } from "react-redux";
import { setPetEditorData } from "../../redux/slices/petSlice";
import CustomAutocomplete from "../../components/pet-form-inputs/custom-autocomplete";
import CustomRadioGroup from "../../components/pet-form-inputs/custom-radio-group";

const PetEditorCharacteristics = () => {
  const { trained, livedInAHouse, healthState, goodWith, characteristics } =
    useSelector((state) => state.petEditor);
  const dispatch = useDispatch();

  return (
    <Grid container spacing={2} sx={{ justifyContent: "center" }}>
      <Grid item md={6} sm={12}>
        <Typography variant="h5" sx={{ mb: 5, textAlign: "center" }}>
          Характеристики
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CustomRadioGroup
              id="pet-trained"
              options={petTrainedOptions}
              label="Дресирано ли е животното?"
              value={trained}
              onChange={(e) =>
                dispatch(setPetEditorData({ trained: e.target.value }))
              }
            />
          </Grid>
          <Grid item xs={12}>
            <CustomAutocomplete
              id="livedInAhouse-tags"
              options={houseConditionsOptions}
              value={livedInAHouse}
              onChange={(e, n) =>
                dispatch(
                  setPetEditorData({
                    livedInAHouse: n,
                  })
                )
              }
              label="Животното живее в дом"
            />
          </Grid>

          <Grid item xs={12}>
            <CustomAutocomplete
              id="healthState-tags"
              options={healthStateOptions}
              value={healthState}
              onChange={(e, n) =>
                dispatch(
                  setPetEditorData({
                    healthState: n,
                  })
                )
              }
              label="Здравословно състояние"
            />
          </Grid>

          <Grid item xs={12}>
            <CustomAutocomplete
              id="goodWith-tags"
              options={goodWithOptions}
              value={goodWith}
              onChange={(e, n) => dispatch(setPetEditorData({ goodWith: n }))}
              label="Държи се добре с"
            />
          </Grid>

          <Grid item xs={12}>
            <CustomAutocomplete
              id="characteristics-tags"
              options={characteristicsOptions}
              value={characteristics}
              onChange={(e, n) =>
                dispatch(
                  setPetEditorData({
                    characteristics: n,
                  })
                )
              }
              label="Характеристики"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PetEditorCharacteristics;
