import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsRegister } from "../../../redux/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import css from "./RegisteForm.module.css";
import { registeSchema } from "../../../formSchema/registeSchema";
import Input from "../Inputs/Inputs";

export const RegisteForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const isRegistered = useSelector(getIsRegister);

  useEffect(() => {
    if (isRegistered) {
      navigate("/login");
    }
  }, [isRegistered, navigate]);

  const { register, handleSubmit, formState } = useForm({
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
          autoComplete="given-name"
        />

        <span className={css.errorSpan}>{errors.name?.message}</span>
      </label>
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
