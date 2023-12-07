import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  currentUser,
  updateFavorites as updateFavoritesAPI,
} from "../../../services/api";
import { setAlert } from "../app/appSlice";

export const updateFavorites = createAsyncThunk(
  "user/updatefavorites",
  async (id, thunkAPI) => {
    try {
      let favorites = thunkAPI.getState().user?.favorites || [];
      const isAddedToFav = favorites.includes(id);
      if (!isAddedToFav) {
        favorites = [...favorites, id];
      } else {
        favorites = favorites.filter((item) => item !== id);
      }

      const response = await updateFavoritesAPI({ favorites });
      return response;
    } catch (error) {
      thunkAPI.dispatch(
        setAlert({
          severity: "warning",
          message: 'Трябва да си логнат, за да добавиш животно в "любими"',
        })
      );
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "user/currentuser",
  async (_, thunkAPI) => {
    // Handle with try catch
    const response = await currentUser();
    return response;
  }
);
