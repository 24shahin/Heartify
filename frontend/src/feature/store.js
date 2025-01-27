import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import userSlice from "./userSlices/authSlice";
import themeSlice from "./modeSlice/darkModeSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    user: userSlice,
    thememode: themeSlice,
  },
  devTools: import.meta.env.MODE == !"production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
