import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  ContactType,
  DeleteResponse,
  FetchContactsError,
  UpdateContact,
  UpdateContactParams,
} from "../assets/schemas/ContactSchema";

export const fetchContacts = createAsyncThunk<
  ContactType[],
  void,
  { rejectValue: FetchContactsError }
>("contacts/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios<ContactType[]>("/contacts");

    return response.data;
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

export const fetchContactsPro = createAsyncThunk<
  ContactType[],
  void,
  { rejectValue: FetchContactsError }
>("contacts/fetchAllPro", async (_, thunkAPI) => {
  try {
    const response = await axios<ContactType[]>("/contacts/pro");

    return response.data;
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

export const addContact = createAsyncThunk<
  ContactType,
  UpdateContact,
  { rejectValue: FetchContactsError }
>("contacts/addContact", async (newContact, thunkAPI) => {
  try {
    const response = await axios.post<ContactType>("/contacts", newContact);

    return response.data;
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

export const deleteContact = createAsyncThunk<
  DeleteResponse,
  string,
  { rejectValue: FetchContactsError }
>("contacts/deleteContact", async (_id, thunkAPI) => {
  try {
    const response = await axios.delete(`/contacts/${_id}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<FetchContactsError>;
      const message =
        axiosError.response?.data?.message || "An unexpected error occurred";
      return thunkAPI.rejectWithValue({ message });
    } else {
      return thunkAPI.rejectWithValue({
        message: "An unexpected error occurred",
      });
    }
  }
});

export const updateContact = createAsyncThunk<
  ContactType,
  UpdateContactParams,
  { rejectValue: FetchContactsError }
>("contacts/updateContactc", async ({ contact, _id }, thunkAPI) => {
  try {
    const response = await axios.put(`/contacts/${_id}`, contact);

    return response.data;
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
