export interface User {
  _id: string | null;
  name: string | null;
  email: string | null;
  subscription: string | null;
}

export interface AuthState {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  isRegister: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface RegisterParams {
  name: string;
  email: string;
  password: string;
}
export type LoginParams = Omit<RegisterParams, "name">;

export interface LoginResponse {
  token: string;
  user: User;
}
export interface SubscriptionParams {
  subscription: string;
}
