import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateContact } from "../../../redux/operations";
import css from "./UpdateForm.module.css";

export const UpdateForm = ({ id, name, phone, email }) => {
  const [nameInput, setNameInput] = useState(name);
  const [numberUnput, setNumbereInput] = useState(phone);
  const [emailInput, setEmailInput] = useState(email);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setNameInput(value);
        break;
      case "number":
        setNumbereInput(value);
        break;
      case "email":
        setEmailInput(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let contact = {
      name: nameInput,
      phone: numberUnput,
      email: emailInput,
    };
    dispatch(updateContact({ contact, id }));
    reset();
    document.body.style.overflow = "visible";
  };

  const reset = () => {
    setNameInput("");
    setNumbereInput("");
    setEmailInput("");
  };
  return (
    <>
      <form className={css.updateForm} onSubmit={handleSubmit}>
        <label className={css.inputBx}>
          <span>Name</span>
          <input
            type="text"
            name="name"
            value={nameInput}
            onChange={handleChange}
          />
        </label>
        <label className={css.inputBx}>
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={emailInput}
            onChange={handleChange}
          />
        </label>
        <label className={css.inputBx}>
          <span>Number</span>
          <input
            type="tel"
            name="number"
            value={numberUnput}
            onChange={handleChange}
          />
        </label>
        <button className={css.button}>Update</button>
      </form>
      <ul className={css.updateSchema}>
        <li>name: {nameInput}</li>
        <li>email: {emailInput}</li>
        <li>phone: {numberUnput}</li>
      </ul>
    </>
  );
};
