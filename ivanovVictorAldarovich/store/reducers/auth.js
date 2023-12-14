import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    username: "Гость",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;
export const { setUsername } = authSlice.actions;
export default authSlice.reducer;
