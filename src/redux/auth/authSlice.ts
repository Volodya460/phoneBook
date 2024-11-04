import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  changeUserSubscription,
  logIn,
  logOut,
  refreshUser,
  registerAuth,
} from "./authOperations";
import { AuthState } from "../../assets/schemas/authSchemas";
import { RootState } from "../store";
import { FetchContactsError } from "../../assets/schemas/ContactSchema";

const initialState: AuthState = {
  user: { name: null, email: null, subscription: null, _id: null },
  token: null,
  isLoggedIn: false,
  isRegister: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const handlePending = (state: AuthState) => {
  state.isLoading = true;
};

const handleRejected = (
  state: AuthState,
  action: PayloadAction<FetchContactsError | undefined>
) => {
  state.isLoading = false;
  state.error = action.payload?.message || "An unexpected error occurred";
  alert(action.payload?.message || "An unexpected error occurred");
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAuth.pending, handlePending)
      .addCase(registerAuth.fulfilled, (state) => {
        state.isRegister = true;
        state.isLoading = false;
      })
      .addCase(registerAuth.rejected, handleRejected)
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logIn.rejected, handleRejected)
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
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
      })

      .addCase(changeUserSubscription.pending, handlePending)
      .addCase(changeUserSubscription.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(changeUserSubscription.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;

export const getUserName = (state: RootState) => state.auth.user.name;
export const getIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const getIsRefreshing = (state: RootState) => state.auth.isRefreshing;
export const getIsRegister = (state: RootState) => state.auth.isRegister;
export const getUserSubscription = (state: RootState) =>
  state.auth.user.subscription;
export const getUser = (state: RootState) => state.auth.user;
export const getIsLoading = (state: RootState) => state.auth.isLoading;
