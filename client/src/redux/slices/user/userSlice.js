import { createSelector, createSlice } from "@reduxjs/toolkit";
import { handleFavorites } from "./userThunk";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => (state = action.payload),
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(handleFavorites.rejected, (state, action) => {});
  },
});

export const { setUser } = userSlice.actions;

export const selectIsInFavorites = (id) =>
  createSelector(
    (state) => state.user.favorites,
    (favorites) => favorites !== undefined && favorites.includes(id)
  );

export const selectIsLoggedin = (id) =>
  createSelector(
    (state) => state.user,
    (user) => Object.keys(user).length
  );

export default userSlice.reducer;
