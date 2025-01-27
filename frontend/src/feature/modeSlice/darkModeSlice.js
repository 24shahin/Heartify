import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("mode")
    ? JSON.parse(localStorage.getItem("mode"))
    : null,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    themeSwitch: (state, action) => {
      state.mode = action.payload;
    },
    themeSwitchOff: (state, action) => {
      state.mode = null;
    },
  },
});

export const { themeSwitch, themeSwitchOff } = themeSlice.actions;

export default themeSlice.reducer;
