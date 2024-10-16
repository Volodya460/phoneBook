import { useState } from "react";
import { getUser } from "../../../redux/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { getContacts } from "../../../redux/contactSlice";
import { addContact } from "../../../redux/operations";
import css from "./AddForm.module.css";

export default function AddForm() {
  const [name, setName] = useState("");
  const [number, setNumbere] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const user = useSelector(getUser);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumbere(value);
        break;
      case "email":
        setEmail(value);
        break;

      default:
        break;
    }
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    let contact = {
      name,
      phone: number,
      email,
    };
    if (checkContactAdd(contact.email)) {
      alert(`${email} already added`);
      reset();
      return;
    }

    dispatch(addContact(contact));

    reset();
  };
  const reset = () => {
    setName("");
    setNumbere("");
    setEmail("");
  };

  return (
    <form className={css.formBox} onSubmit={handleSubmit}>
      <label className={css.lableName}>
        <span>Name</span>
        <input
          type="text"
          name="name"
          value={name}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={handleChange}
          required
        />
      </label>
      <label className={css.lableEmail}>
        <span>Email</span>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
      </label>
      <label className={css.lableNumber}>
        <span>Number</span>
        <input
          type="tel"
          name="number"
          value={number}
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit" className={css.formButton}>
        Add Contact
      </button>
    </form>
  );
}
