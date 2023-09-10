import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateFavorites } from "../../../services/api";

export const handleFavorites = createAsyncThunk(
  "user/updateFavorites",
  async (id, thunkAPI) => {
    let favorites = thunkAPI.getState().user.favorites;
    const isAddedToFav = favorites.includes(id);
    if (!isAddedToFav) {
      favorites = [...favorites, id];
    } else {
      favorites = favorites.filter((item) => item !== id);
    }

    const response = await updateFavorites({ favorites });
    return response;
  }
);
