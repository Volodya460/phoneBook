import css from './RegisteForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsRegister } from '../../../redux/auth/authSlice';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export const RegisteForm = ({ handleSubmit }) => {
  const navigate = useNavigate();
  const isRegistered = useSelector(getIsRegister);

  useEffect(() => {
    if (isRegistered) {
      navigate('/login');
    }
  }, [isRegistered, navigate]);

  return (
    <form className={css.registe} onSubmit={handleSubmit}>
      <h2>Register</h2>
      <label className={css.inputBx}>
        <input
          type="text"
          name="name"
          autoFocus
          placeholder="User name"
          autoComplete="given-name"
          required
        />
      </label>
      <label className={css.inputBx}>
        <input
          type="email"
          name="email"
          autoFocus
          placeholder="User email"
          autoComplete="true"
          required
        />
      </label>
      <label className={css.inputBx}>
        <input
          type="password"
          name="password"
          autoFocus
          placeholder="User password"
          autoComplete="given-password"
          minLength="5"
          required
        />
      </label>

      <button type="submit" className={css.button}>
        Signup
      </button>

      <div className={css.links}>
        <NavLink to="/login" className={css.nav}>
          Sign in
        </NavLink>
      </div>
    </form>
  );
};
