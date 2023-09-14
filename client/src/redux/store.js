import { configureStore } from "@reduxjs/toolkit";
import petSlice from "./slices/petSlice";
import userSlice from "./slices/user/userSlice";
import appSlice from "./slices/app/appSlice";

export const store = configureStore({
  reducer: {
    petEditor: petSlice,
    user: userSlice,
    app: appSlice,
  },
});
