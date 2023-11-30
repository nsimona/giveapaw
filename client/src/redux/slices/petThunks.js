import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPet, updatePet } from "../../services/api";
import { normalizePetEditorData } from "../../utils/normalizeData";
import { setAlert } from "./app/appSlice";

export const createNewPet = createAsyncThunk(
  "pets/create",
  async ({ formData }, thunkAPI) => {
    const data = formData || new FormData();
    const petData = thunkAPI.getState().petEditor;
    const pet = {
      ...petData,
      healthState: normalizePetEditorData(petData.healthState),
      livedInAHouse: normalizePetEditorData(petData.livedInAHouse),
      goodWith: normalizePetEditorData(petData.goodWith),
      characteristics: normalizePetEditorData(petData.characteristics),
    };

    for (let prop in pet) {
      if (prop === "selectedFiles") {
        continue;
      }
      data.append(prop, pet[prop]);
    }
    try {
      const response = await createPet(data);
      thunkAPI.dispatch(
        setAlert({
          severity: "success",
          message: `Успешно запазване`,
        })
      );
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setAlert({
          severity: "error",
          message: `Грешка при запазване на обява, ${error.response.data.errors[0].message}`,
        })
      );
    }
    return {};
  }
);

export const updateExistingPet = createAsyncThunk(
  "pets/update",
  async ({ formData }, thunkAPI) => {
    // const data = formData || new FormData();
    const petData = thunkAPI.getState().petEditor;
    const pet = {
      ...petData,
      healthState: normalizePetEditorData(petData.healthState),
      livedInAHouse: normalizePetEditorData(petData.livedInAHouse),
      goodWith: normalizePetEditorData(petData.goodWith),
      characteristics: normalizePetEditorData(petData.characteristics),
    };

    // for (let prop in pet) {
    //   if (prop === "selectedFiles" || prop === "id") {
    //     continue;
    //   }
    //   data.append(prop, pet[prop]);
    // }
    try {
      const response = await updatePet(pet);
      thunkAPI.dispatch(
        setAlert({
          severity: "success",
          message: `Успешно запазване`,
        })
      );
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setAlert({
          severity: "error",
          message: `Грешка при запазване на обява, ${error.response.data.errors[0].message}`,
        })
      );
    }
    return {};
  }
);
