import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { updateContact } from "../../../redux/operations";
import css from "./UpdateForm.module.css";
import { updateSchema } from "../../../formSchema/updateSchema";
import Input from "../Inputs/Inputs";

export const UpdateForm = ({ id, name, phone, email }) => {
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    const { name, email, number } = e;

    let contact = {
      name: name,
      phone: number,
      email: email,
    };
    dispatch(updateContact({ contact, id }));

    document.body.style.overflow = "visible";
  };

  const { register, handleSubmit, formState, watch } = useForm({
    defaultValues: {
      name: name,
      email: email,
      number: phone,
    },
    resolver: zodResolver(updateSchema),
  });

  const { errors } = formState;
  const emailInput = watch("email");
  const nameInput = watch("name");
  const phoneInput = watch("number");
  return (
    <>
      <form className={css.updateForm} onSubmit={handleSubmit(onSubmit)}>
        <label className={css.inputName}>
          <span>Name</span>

          <Input {...register("name")} />
          <div className={css.errorSpan}>{errors.name?.message}</div>
        </label>
        <label className={css.inputEmail}>
          <span>Email</span>

          <Input {...register("email")} />
          <div className={css.errorSpan}>{errors.email?.message}</div>
        </label>
        <label className={css.inputNumber}>
          <span>Number</span>

          <Input {...register("number")} />
          <div className={css.errorSpan}>{errors.number?.message}</div>
        </label>
        <button className={css.button}>Update</button>
      </form>
      <ul className={css.updateSchema}>
        <li>name: {nameInput}</li>
        <li>email: {emailInput}</li>
        <li>phone: {phoneInput}</li>
      </ul>
    </>
  );
};
