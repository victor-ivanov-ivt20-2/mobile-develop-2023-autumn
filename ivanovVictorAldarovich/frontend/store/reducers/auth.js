import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    username: "Гость",
    id: ""
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload
    }
  },
});

export const { setToken } = authSlice.actions;
export const { setUsername } = authSlice.actions;
export const { setId } = authSlice.actions;
export default authSlice.reducer;
