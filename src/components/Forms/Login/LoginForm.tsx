import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import css from "./LoginForm.module.css";
import { loginSchema } from "../../../formSchema/loginSchema";
import Input from "../Inputs/Input";
import { getIsLoading } from "../../../redux/auth/authSlice";
import { UserLoader } from "../../../assets/loaders/UserLoader";
import { AppDispatch } from "../../../redux/store";
import { LoginParams } from "../../../assets/schemas/authSchemas";
import { logIn } from "../../../redux/auth/authOperations";

export const LoginForm = () => {
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (e: LoginParams) => {
    const { email, password } = e;

    dispatch(
      logIn({
        email: email,
        password: password,
      })
    );
  };
  const { register, handleSubmit, formState } = useForm<LoginParams>({
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
          autoComplete="email"
        />

        <span className={css.errorSpan}>{errors.email?.message}</span>
      </label>

      <label className={css.inputBx}>
        <Input
          {...register("password")}
          placeholder="User password"
          autoComplete="password"
        />

        <span className={css.errorSpan}>{errors.password?.message}</span>
      </label>

      <button type="submit" className={css.button}>
        {isLoading ? <UserLoader /> : " Sign in"}
      </button>

      <label className={css.links}>
        <NavLink to="/registe" className={css.nav}>
          Sign up
        </NavLink>
      </label>
    </form>
  );
};
