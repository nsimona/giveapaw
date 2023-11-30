import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // basic:
  name: "",
  type: "dog",
  breed: "",
  color: "",
  age: "",
  gender: "unknown",
  size: "medium",
  description: "",
  // characteristics:
  trained: false,
  livedInAHouse: [],
  healthState: [],
  goodWith: [],
  characteristics: [],
  // photos:
  selectedFiles: [],
  selectedCoverIndex: 0,
};

export const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {
    setPetEditorData: (state, action) =>
      (state = { ...state, ...action.payload }),
    addPetPhoto: (state, action) => {
      state.selectedFiles = [...state.selectedFiles, action.payload];
    },
    resetPetEditorData: (state) => (state = initialState),
  },
  // extraReducers: (builder) => {
  //   // loaded, rejected statuses as well
  //   builder.addCase(createNewPet.fulfilled, (state, action) => {
  //     console.log(state);
  //   });
  // },
});

export const { setPetEditorData, addPetPhoto, resetPetEditorData } =
  petSlice.actions;

export default petSlice.reducer;
