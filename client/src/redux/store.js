import { configureStore } from "@reduxjs/toolkit";
import petSlice from "./slices/petSlice";

export const store = configureStore({
  reducer: {
    petEditor: petSlice,
  },
});
