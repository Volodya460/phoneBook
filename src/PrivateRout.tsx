import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { getIsLoggedIn, getIsRefreshing } from "./redux/auth/authSlice";
import { FC, ReactNode } from "react";
interface PrivateRouteProps {
  component: ReactNode;
  redirectTo: string;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  redirectTo = "/",
}) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isRefreshing = useSelector(getIsRefreshing);
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
