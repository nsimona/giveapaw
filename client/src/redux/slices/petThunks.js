import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPet } from "../../services/api";
import { normalizePetEditorData } from "../../utils/normalizeData";
import { setAlert } from "./app/appSlice";

export const createNewPet = createAsyncThunk(
  "pets/createNew",
  async (formData, thunkAPI) => {
    const petData = thunkAPI.getState().petEditor;
    const pet = {
      ...petData,
      healthState: normalizePetEditorData(petData.healthState),
      livedInAHouse: normalizePetEditorData(petData.livedInAHouse),
      goodWith: normalizePetEditorData(petData.goodWith),
      characteristics: normalizePetEditorData(petData.characteristics),
      selectedFiles: formData,
    };

    try {
      const response = await createPet(formData);
      thunkAPI.dispatch(
        setAlert({
          severity: "success",
          message: `Успешно добавена обява`,
        })
      );
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setAlert({
          severity: "error",
          message: `Грешка при създаване на обява, ${error.response.data.errors[0].message}`,
        })
      );
    }
    return {};
  }
);
