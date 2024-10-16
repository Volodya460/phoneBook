import { NavLink, Outlet } from "react-router-dom";
import { Suspense } from "react";
import css from "./SharedLayout.module.css";
import UserMenu from "../UserMenu/UserMenu";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../redux/auth/authSlice";
import { AuthLoader } from "../../assets/loaders/AuthLoader";

function SharedLayout() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <div>
      <header className={css.header}>
        {" "}
        <div className={css.headerContent}>
          {" "}
          <nav className={css.nav}>
            <NavLink to="/" className={css.navLink}>
              Home
            </NavLink>
            {isLoggedIn ? (
              <NavLink to="/contacts" className={css.navLink}>
                Contacts
              </NavLink>
            ) : (
              <div className={css.navAuth}>
                <NavLink to="/registe" className={css.navLink}>
                  Register
                </NavLink>
                <NavLink to="/login" className={css.navLink}>
                  Login
                </NavLink>
              </div>
            )}
          </nav>
          {isLoggedIn && <UserMenu />}
        </div>
      </header>

      <Suspense fallback={<AuthLoader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default SharedLayout;
