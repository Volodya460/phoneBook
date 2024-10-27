import { getUser } from "../../../redux/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getContacts } from "../../../redux/contactSlice";
import { addContact } from "../../../redux/operations";
import css from "./AddForm.module.css";
import { addSchema } from "../../../formSchema/addSchema";
import Input from "../Inputs/Inputs";

export default function AddForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const user = useSelector(getUser);

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      name: "",
      email: "",
      number: "",
    },
    resolver: zodResolver(addSchema),
  });

  const { errors } = formState;

  const checkContactAdd = (email) => {
    let normolizeEmail = email.toLowerCase();
    const ownerContacts = contacts.filter((contact) => {
      let ownerId = contact.owner._id || contact.owner;

      return ownerId === user._id;
    });
    return ownerContacts.find(
      ({ email }) => email.toLowerCase() === normolizeEmail
    );
  };

  const onSubmit = (e) => {
    const { name, email, number } = e;
    console.log(name);
    let contact = {
      name,
      phone: number,
      email,
    };
    if (checkContactAdd(contact.email)) {
      alert(`${email} already added`);

      return;
    }

    dispatch(addContact(contact));
  };

  return (
    <form className={css.formBox} onSubmit={handleSubmit(onSubmit)}>
      <label className={css.lableName}>
        <span>Name</span>

        <Input {...register("name")} placeholder="Contact name" />
        <div className={css.errorSpan}>{errors.name?.message}</div>
      </label>
      <label className={css.lableEmail} placeholder="User name">
        <span>Email</span>
        <Input {...register("email")} placeholder="Contact email" />
        <div className={css.errorSpan}>{errors.email?.message}</div>
      </label>
      <label className={css.lableNumber}>
        <span>Number</span>
        <Input {...register("number")} placeholder="Contact number" />
        <div className={css.errorSpan}>{errors.number?.message}</div>
      </label>
      <button type="submit" className={css.formButton}>
        Add Contact
      </button>
    </form>
  );
}
