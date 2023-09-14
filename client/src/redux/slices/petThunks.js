import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPet } from "../../services/api";
import { normalizePetEditorData } from "../../utils/normalizeData";
import { setAlert } from "./app/appSlice";

export const createNewPet = createAsyncThunk(
  "pets/createNew",
  async (_, thunkAPI) => {
    const data = thunkAPI.getState().petEditor;
    const pet = {
      ...data,
      healthState: normalizePetEditorData(data.healthState),
      livedInAHouse: normalizePetEditorData(data.livedInAHouse),
      goodWith: normalizePetEditorData(data.goodWith),
      characteristics: normalizePetEditorData(data.characteristics),
    };
    try {
      const response = await createPet(pet);
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
