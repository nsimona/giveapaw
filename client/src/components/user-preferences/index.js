import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { updatePreferences } from "../../services/api";
import { setAlert } from "../../redux/slices/app/appSlice";
import { i18n } from "../../assets/i18n";

const enhnaceOptions = (options) => {
  const removedUnknownOption = options.filter((o) => o.value !== "unknown");
  return [
    ...removedUnknownOption,
    { value: "noPreference", title: "Без преференции" },
  ];
};

const UserPreferences = () => {
  const savedPreferences = useSelector((state) => state.user?.preferences);
  const [preferences, setPreferences] = React.useState(savedPreferences);

  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   setPreferences({ ...preferences, savedPreferences });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [savedPreferences]);

  const handleChange = (e) => {
    setPreferences((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleAutocompleteChange = (_e, values, name) => {
    setPreferences((prev) => {
      return {
        ...prev,
        [name]: values,
      };
    });
  };

  const submitPreferences = async () => {
    try {
      await updatePreferences(preferences);
      dispatch(
        setAlert({
          severity: "success",
          message: "Успешно запази преференциите си!",
        })
      );
      // update redux store
      // setPreferences(updatedPreferences);
    } catch (error) {
      dispatch(
        setAlert({
          severity: "error",
          message: `Грешка при запис на преференции, ${
            error.response.data.errors[0].message || ""
          }`,
        })
      );
    }
  };

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
              value={preferences.ownerType}
              selectProps={{ name: "ownerType" }}
              onChange={handleChange}
              options={ownerTypeOptions}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomAutocomplete
              id="current-house"
              options={houseConditionsOptions}
              value={preferences.currentHouse}
              onChange={(e, values) => {
                handleAutocompleteChange(e, values, "currentHouse");
              }}
              label="Домът ти е"
            />
          </Grid>
          <Grid item xs={12}>
            <CustomAutocomplete
              id="outdoor-spaces"
              options={outdoorSpacesOptions}
              value={preferences.outdoorSpaces}
              onChange={(e, values) => {
                handleAutocompleteChange(e, values, "outdoorSpaces");
              }}
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
              id="type"
              options={petTypeOptions}
              label="Бих искал да осиновя"
              value={preferences.type}
              onChange={handleChange}
            />
          </Grid>

          {/* <Grid item xs={12}>
            <CustomSelect
              id="pet-breed"
              options={enhnaceOptions(basicBreedsOptions)}
              label="Порода"
              value={preferences.breed}
              selectProps={{ name: "breed" }}
              onChange={handleChange}
            />
          </Grid> */}

          <Grid item xs={12}>
            <CustomSelect
              id="color"
              options={enhnaceOptions(petColorsOptions)}
              value={preferences.color}
              onChange={handleChange}
              label="Предпочитания за цвят"
              selectProps={{ name: "color" }}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomSelect
              id="age"
              options={enhnaceOptions(petAgeOptions)}
              label="Възраст"
              value={preferences.age}
              selectProps={{ name: "age" }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomRadioGroup
              id="gender"
              options={enhnaceOptions(petGenderOptions)}
              label="Пол"
              value={preferences.gender}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomRadioGroup
              id="size"
              options={enhnaceOptions(petSizeOptions)}
              label="Размер"
              value={preferences.size}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12}>
              <CustomRadioGroup
                id="trained"
                options={enhnaceOptions(petTrainedOptions)}
                label="Предпочитание за дресиран домашен любимец"
                value={preferences.trained}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <CustomAutocomplete
              id="characteristics"
              options={enhnaceOptions(characteristicsOptions)}
              value={preferences.characteristics.map((p) => ({
                value: p,
                title: i18n[p],
              }))}
              onChange={(e, values) => {
                handleAutocompleteChange(e, values, "characteristics");
              }}
              label="Моят домашен любимец трябва да е"
            />
          </Grid>
          <Button
            variant="contained"
            size="large"
            sx={{ my: 3 }}
            onClick={submitPreferences}
          >
            Запази
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserPreferences;
