import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, updateFavorites } from "./userThunk";

const initialState = {
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => (state = action.payload),
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(getCurrentUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        return {
          isLoading: false,
          ...action.payload,
        };
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        // do something with the error
      });
  },
});

export const { setUser } = userSlice.actions;

export const selectIsInFavorites = (id) =>
  createSelector(
    (state) => state.user.favorites,
    (favorites) => favorites !== undefined && favorites.includes(id)
  );

export const selectIsLoggedin = () =>
  createSelector(
    (state) => state.user,
    (user) => Object.keys(user).length
  );

export const selectUser = () =>
  createSelector(
    (state) => state.user,
    (user) => user
  );

export default userSlice.reducer;
