import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/operations";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/auth/authSlice";
import { useState, useEffect } from "react";
import { Modal } from "../Modal/Modal";
import css from "./Contact.module.css";

export function Contact({ id, name, phone, email, owner }) {
  const [buttonOn, setButtonOn] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    if (owner?._id === user._id || owner === user._id) {
      setButtonOn(true);
    }
  }, [owner?._id, user._id, owner]);

  const openModal = () => {
    setOpenModalUpdate(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setOpenModalUpdate(false);
    document.body.style.overflow = "visible";
  };

  const getOwner = () => {
    let ownerInf = {};
    if (owner?._id === user._id || owner === user._id) {
      ownerInf["name"] = user.name;
      ownerInf["email"] = user.email;
    }

    return ownerInf;
  };

  return (
    <>
      {" "}
      <li
        key={id}
        className={`${css.contactCard} ${buttonOn ? css.ownerCard : ""}`}
      >
        <p>{name}</p>
        <p>{email}</p>
        <p>{phone}</p>
        <h2>Owner</h2>
        <ul>
          <li>{owner?.name || getOwner().name || "unknow"} </li>
          <li>{owner?.email || getOwner().email || "unknow"}</li>
        </ul>

        {buttonOn ? (
          <div className={css.buttonBox}>
            {" "}
            <button
              type="button"
              onClick={() => {
                dispatch(deleteContact(id));
              }}
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => {
                openModal();
              }}
            >
              Update
            </button>
          </div>
        ) : null}
      </li>
      {openModalUpdate ? (
        <Modal
          closeModal={closeModal}
          id={id}
          name={name}
          email={email}
          phone={phone}
        />
      ) : null}
    </>
  );
}
