import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: {
    severity: "",
    message: "",
  },
  searchQuery: {
    type: "",
    breed: "",
    age: "",
    color: "",
    size: "",
    gender: "",
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
  },
});

export const { setAlert } = appSlice.actions;

export default appSlice.reducer;
