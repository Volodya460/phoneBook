import { createSlice } from "@reduxjs/toolkit";
import {
  changeUserSubscription,
  logIn,
  logOut,
  refreshUser,
  register,
} from "./authOperations";

const initialState = {
  user: { name: null, email: null, subscription: null, _id: null },
  token: null,
  isLoggedIn: false,
  isRegister: false,
  isRefreshing: false,
  isLoading: false,
};

const handlePending = (state) => {
  state.isLoading = true;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state) => {
        state.isRegister = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        alert(action.payload);
      })
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        alert(action.payload);
      })
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state) => {
        state.user = { name: null, email: null, subscription: null, _id: null };
        state.token = null;
        state.isRegister = false;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })

      .addCase(changeUserSubscription.pending, handlePending)
      .addCase(changeUserSubscription.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(changeUserSubscription.rejected, (state, action) => {
        alert(action.payload);
        state.isLoading = false;
      });
  },
});

export const authReducer = authSlice.reducer;

export const getUserName = (state) => state.auth.user.name;
export const getIsLoggedIn = (state) => state.auth.isLoggedIn;
export const getIsRefreshing = (state) => state.auth.isRefreshing;
export const getIsRegister = (state) => state.auth.isRegister;
export const getUserSubscription = (state) => state.auth.user.subscription;
export const getUser = (state) => state.auth.user;
export const getIsLoading = (state) => state.auth.isLoading;
