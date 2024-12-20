import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, lazy } from "react";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import { getIsRefreshing } from "./redux/auth/authSlice";
import { refreshUser } from "./redux/auth/authOperations";
import { PrivateRoute } from "./PrivateRout";
import { RestrictedRoute } from "./RestrictedRout";
import { AuthLoader } from "./assets/loaders/AuthLoader";
import { AppDispatch } from "./redux/store";

const HomePage = lazy(() => import("./pages/HomePage"));
const RegisterPage = lazy(() => import("./pages/RegistePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage"));

export default function App() {
  const dispatche = useDispatch<AppDispatch>();
  const IsRefreshing = useSelector(getIsRefreshing);

  useEffect(() => {
    dispatche(refreshUser());
  }, [dispatche]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/contacts"
          element={<PrivateRoute component={<ContactsPage />} redirectTo="/" />}
        />
        <Route
          path="/registe"
          element={
            <RestrictedRoute
              component={<RegisterPage />}
              redirectTo="/contacts"
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute component={<LoginPage />} redirectTo="/contacts" />
          }
        />
      </Route>
    )
  );

  return IsRefreshing ? <AuthLoader /> : <RouterProvider router={router} />;
}
