import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  fetchContactsPro,
  updateContact,
} from "./operations";
import { RootState } from "./store";
import {
  InitialState,
  ContactType,
  FetchContactsError,
} from "../assets/schemas/ContactSchema";

const initialState: InitialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: "",
};
const handlePending = (state: InitialState) => {
  state.contacts.isLoading = true;
};

const handleRejected = (
  state: InitialState,
  action: PayloadAction<FetchContactsError | undefined>
) => {
  state.contacts.isLoading = false;
  state.contacts.error =
    action.payload?.message || "An unexpected error occurred";
  alert(action.payload?.message);
};

export const contactSlice = createSlice({
  name: "contact",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(
        fetchContacts.fulfilled,
        (state, action: PayloadAction<ContactType[]>) => {
          state.contacts.isLoading = false;
          state.contacts.error = null;
          state.contacts.items = action.payload;
        }
      )
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(fetchContactsPro.pending, handlePending)
      .addCase(
        fetchContactsPro.fulfilled,
        (state, action: PayloadAction<ContactType[]>) => {
          state.contacts.isLoading = false;
          state.contacts.error = null;
          state.contacts.items = action.payload;
        }
      )
      .addCase(fetchContactsPro.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(
        addContact.fulfilled,
        (state, action: PayloadAction<ContactType>) => {
          state.contacts.isLoading = false;
          state.contacts.error = null;
          state.contacts.items.push(action.payload);
        }
      )
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        console.log(action.payload._id);
        state.contacts.items = state.contacts.items.filter((item) => {
          return item._id !== action.payload._id;
        });
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(updateContact.pending, handlePending)
      .addCase(
        updateContact.fulfilled,
        (state, action: PayloadAction<ContactType>) => {
          state.contacts.isLoading = false;
          state.contacts.error = null;

          const { _id } = action.payload;
          const index = state.contacts.items.findIndex(
            (item) => item._id === _id
          );

          if (index === -1) {
            return;
          }

          state.contacts.items[index] = {
            ...action.payload,
          };
        }
      )
      .addCase(updateContact.rejected, handleRejected);
  },
  reducers: {
    filterChange: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { filterChange } = contactSlice.actions;
export const getContacts = (state: RootState) => state.contact.contacts.items;
export const getInputFilter = (state: RootState) => state.contact.filter;
export const getIsLoading = (state: RootState) =>
  state.contact.contacts.isLoading;
export const getError = (state: RootState) => state.contact.contacts.error;
