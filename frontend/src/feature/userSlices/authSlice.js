import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

export const userSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    LogedInUser: (state, action) => {
      state.userInfo = action.payload;
    },
    LogedOutUser: (state) => {
      state.userInfo = null;
    },
  },
});

export const { LogedInUser, LogedOutUser } = userSlice.actions;

export default userSlice.reducer;
