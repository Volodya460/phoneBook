import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoading, getIsRegister } from "../../../redux/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import css from "./RegisteForm.module.css";
import { registeSchema } from "../../../formSchema/registeSchema";
import Input from "../Inputs/Input";
import { UserLoader } from "../../../assets/loaders/UserLoader";
import { AppDispatch } from "../../../redux/store";
import { RegisterParams } from "../../../assets/schemas/authSchemas";
import { registerAuth } from "../../../redux/auth/authOperations";

export const RegisteForm = () => {
  const navigate = useNavigate();
  const isRegistered = useSelector(getIsRegister);
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    if (isRegistered) {
      navigate("/login");
    }
  }, [isRegistered, navigate]);

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (e: RegisterParams) => {
    const { name, email, password } = e;

    dispatch(
      registerAuth({
        name: name,
        email: email,
        password: password,
      })
    );
  };

  const { register, handleSubmit, formState } = useForm<RegisterParams>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registeSchema),
  });

  const { errors } = formState;

  return (
    <form className={css.registe} onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>
      <label className={css.inputBx}>
        <Input
          {...register("name")}
          placeholder="User name"
          autoComplete="name"
        />

        <span className={css.errorSpan}>{errors.name?.message}</span>
      </label>
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
        {isLoading ? <UserLoader /> : " Sign up"}
      </button>

      <div className={css.links}>
        <NavLink to="/login" className={css.nav}>
          Sign in
        </NavLink>
      </div>
    </form>
  );
};
