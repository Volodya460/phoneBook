import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchContactsError } from "../../assets/schemas/ContactSchema";
import {
  LoginParams,
  LoginResponse,
  RegisterParams,
  SubscriptionParams,
  User,
} from "../../assets/schemas/authSchemas";

axios.defaults.baseURL = "http://localhost:3000/api";

// axios.defaults.baseURL = "https://node-rest-api-phonebook.onrender.com/api";

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const registerAuth = createAsyncThunk<
  User,
  RegisterParams,
  { rejectValue: FetchContactsError }
>("auth/register", async (credentials, thunkAPI) => {
  try {
    const res = await axios.post("/users/register", credentials);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "An unexpected error occurred";
      return thunkAPI.rejectWithValue({ message });
    } else {
      return thunkAPI.rejectWithValue({
        message: "An unexpected error occurred",
      });
    }
  }
});

export const logIn = createAsyncThunk<
  LoginResponse,
  LoginParams,
  { rejectValue: FetchContactsError }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const res = await axios.post("/users/login", credentials);

    setAuthHeader(res.data.token);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "An unexpected error occurred";
      return thunkAPI.rejectWithValue({ message });
    } else {
      return thunkAPI.rejectWithValue({
        message: "An unexpected error occurred",
      });
    }
  }
});

export const logOut = createAsyncThunk<
  void,
  void,
  {
    rejectValue: FetchContactsError;
  }
>("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");

    clearAuthHeader();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "An unexpected error occurred";
      return thunkAPI.rejectWithValue({ message });
    } else {
      return thunkAPI.rejectWithValue({
        message: "An unexpected error occurred",
      });
    }
  }
});

export const refreshUser = createAsyncThunk<
  User,
  void,
  {
    rejectValue: FetchContactsError;
  }
>("auth/refresh", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as { auth: { token: string | null } };
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue({ message: "Unable to fetch user" });
  }

  try {
    setAuthHeader(persistedToken);
    const res = await axios.get("/users/current");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "An unexpected error occurred";
      return thunkAPI.rejectWithValue({ message });
    } else {
      return thunkAPI.rejectWithValue({
        message: "An unexpected error occurred",
      });
    }
  }
});

export const changeUserSubscription = createAsyncThunk<
  User,
  SubscriptionParams,
  {
    rejectValue: FetchContactsError;
  }
>(`auth/subscription`, async (credentials, thunkAPI) => {
  try {
    const res = await axios.patch("/users", credentials);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "An unexpected error occurred";
      return thunkAPI.rejectWithValue({ message });
    } else {
      return thunkAPI.rejectWithValue({
        message: "An unexpected error occurred",
      });
    }
  }
});
