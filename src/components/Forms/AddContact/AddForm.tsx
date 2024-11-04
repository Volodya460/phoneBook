import { getUser } from "../../../redux/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getContacts } from "../../../redux/contactSlice";
import { addContact } from "../../../redux/operations";
import css from "./AddForm.module.css";
import { addSchema } from "../../../formSchema/addSchema";
import Input from "../Inputs/Input";
import { AppDispatch } from "../../../redux/store";
import { AddContact } from "../../../assets/schemas/ContactSchema";

export default function AddForm() {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector(getContacts);
  const user = useSelector(getUser);

  const { register, handleSubmit, formState } = useForm<AddContact>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(addSchema),
  });

  const { errors } = formState;

  const checkContactAdd = (email: string) => {
    let normolizeEmail = email.toLowerCase();
    const ownerContacts = contacts.filter((contact) => {
      let ownerId =
        typeof contact.owner === "object" ? contact.owner._id : contact.owner;

      return ownerId === user._id;
    });
    return ownerContacts.find(
      ({ email }) => email.toLowerCase() === normolizeEmail
    );
  };

  const onSubmit = (e: AddContact) => {
    const { name, email, phone } = e;

    let contact = {
      name,
      phone,
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
      <label className={css.lableEmail}>
        <span>Email</span>
        <Input {...register("email")} placeholder="Contact email" />
        <div className={css.errorSpan}>{errors.email?.message}</div>
      </label>
      <label className={css.lableNumber}>
        <span>Phone</span>
        <Input {...register("phone")} placeholder="Contact number" />
        <div className={css.errorSpan}>{errors.phone?.message}</div>
      </label>
      <button type="submit" className={css.formButton}>
        Add Contact
      </button>
    </form>
  );
}
