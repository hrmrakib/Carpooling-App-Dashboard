/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  userToggle: boolean;
  user: any | null;
  token: any | null;
};

const initialState: AuthState = {
  userToggle: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userTrack: (state) => {
      state.userToggle = !state.userToggle;
    },

    setUser: (state, action: PayloadAction<{ user: any; token: any }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { userTrack, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
