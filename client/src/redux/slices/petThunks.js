import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPet } from "../../services/api";
import { normalizePetEditorData } from "../../utils/normalizeData";

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
    const response = await createPet(pet);
    return response.data;
  }
);
