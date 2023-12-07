import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  type: "",
  id: "",
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setApplicationPet: (state, action) => (state = action.payload),
    clearApplicationPet: (state) => (state = initialState),
  },
});

export const { setApplicationPet, clearApplicationPet } =
  applicationSlice.actions;

export default applicationSlice.reducer;
