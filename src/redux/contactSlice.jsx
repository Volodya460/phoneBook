import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  fetchContactsPro,
  updateContact,
} from "./operations";

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: "",
};
const handlePending = (state) => {
  state.contacts.isLoading = true;
};

const handleRejected = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = action.payload;
  alert(action.payload);
};

export const contactSlice = createSlice({
  name: "contact",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(fetchContactsPro.pending, handlePending)
      .addCase(fetchContactsPro.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContactsPro.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;

        state.contacts.items = state.contacts.items.filter((item) => {
          return item._id !== action.payload.id;
        });
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(updateContact.pending, handlePending)
      .addCase(updateContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        const { _id } = action.payload;
        const index = state.contacts.items.findIndex(
          (item) => item._id === _id
        );

        if (index === -1) {
          return null;
        }

        state.contacts.items[index] = {
          ...action.payload,
        };
      })
      .addCase(updateContact.rejected, handleRejected);
  },
  reducers: {
    filterChange: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { filterChange } = contactSlice.actions;
export const getContacts = (state) => state.contact.contacts.items;
export const getInputFilter = (state) => state.contact.filter;
export const getIsLoading = (state) => state.contact.contacts.isLoading;
export const getError = (state) => state.contact.contacts.error;
