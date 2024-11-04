export interface Owner {
  _id: string;
  email: string;
  name: string;
}

export interface ContactType {
  _id: string;
  name: string;
  phone: string;
  email: string;
  createdAt?: string;
  favorite: boolean;
  owner: string | Owner;
  updatedAt?: string;
}

export interface ContactsState {
  items: ContactType[];
  isLoading: boolean;
  error: string | null;
}

export interface DeleteResponse {
  message: string;
  _id: string;
}

export interface FetchContactsError {
  _id?: string;
  message: string;
}

export interface UpdateContact {
  name: string;
  phone: string;
  email: string;
}

export interface AddContact extends UpdateContact {}

export interface UpdateContactParams {
  _id: string;
  contact: UpdateContact;
}

export interface InitialState {
  contacts: ContactsState;
  filter: string | null;
}
