import css from "./LoginForm.module.css";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../formSchema/loginSchema";
import Input from "../Inputs/Inputs";

export const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const { errors } = formState;

  return (
    <form className={css.login} onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      <label className={css.inputBx}>
        <Input
          {...register("email")}
          placeholder="User email"
          autoComplete="given-email"
        />

        <span className={css.errorSpan}>{errors.email?.message}</span>
      </label>

      <label className={css.inputBx}>
        <Input
          {...register("password")}
          placeholder="User password"
          autoComplete="given-password"
        />

        <span className={css.errorSpan}>{errors.password?.message}</span>
      </label>

      <button type="submit" className={css.button}>
        Sign in
      </button>

      <label className={css.links}>
        <NavLink to="/registe" className={css.nav}>
          Sign up
        </NavLink>
      </label>
    </form>
  );
};
