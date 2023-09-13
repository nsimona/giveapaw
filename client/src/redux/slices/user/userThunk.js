import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  currentUser,
  updateFavorites as updateFavoritesAPI,
} from "../../../services/api";

export const updateFavorites = createAsyncThunk(
  "user/updatefavorites",
  async (id, thunkAPI) => {
    let favorites = thunkAPI.getState().user.favorites;
    const isAddedToFav = favorites.includes(id);
    if (!isAddedToFav) {
      favorites = [...favorites, id];
    } else {
      favorites = favorites.filter((item) => item !== id);
    }

    const response = await updateFavoritesAPI({ favorites });
    return response;
  }
);

export const getCurrentUser = createAsyncThunk(
  "user/currentuser",
  async (_, thunkAPI) => {
    const response = await currentUser();
    return response;
  }
);
