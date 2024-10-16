import css from "./LoginForm.module.css";

import { NavLink } from "react-router-dom";

export const LoginForm = ({ handleSubmit }) => {
  return (
    <form className={css.login} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className={css.inputBx}>
        <input
          type="text"
          name="email"
          autoFocus
          placeholder="User email"
          autoComplete="given-email"
          required
        />
      </div>
      <div className={css.inputBx}>
        <input
          type="password"
          name="password"
          autoFocus
          placeholder="User password"
          autoComplete="given-password"
          required
        />
      </div>

      <button type="submit" className={css.button}>
        Sign in
      </button>

      <div className={css.links}>
        <NavLink to="/registe" className={css.nav}>
          Sign up
        </NavLink>
      </div>
    </form>
  );
};
