import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/operations";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/auth/authSlice";
import { useState, useEffect, FC } from "react";
import { Modal } from "../Modal/Modal";
import css from "./Contact.module.css";
import { ContactType, Owner } from "../../assets/schemas/ContactSchema";
import { AppDispatch } from "../../redux/store";

type ContactProps = Omit<ContactType, "createdAt" | "favorite" | "updatedAt">;

export const Contact: FC<ContactProps> = ({
  _id,
  name,
  phone,
  email,
  owner,
}) => {
  const [buttonOn, setButtonOn] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(getUser);

  useEffect(() => {
    if (
      (typeof owner === "object" && owner._id === user._id) ||
      owner === user._id
    ) {
      setButtonOn(true);
    }
  }, [owner, user._id]);

  const openModal = () => {
    setOpenModalUpdate(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setOpenModalUpdate(false);
    document.body.style.overflow = "visible";
  };

  const getOwnerName = (owner: string | Owner) => {
    if (typeof owner === "object" && owner !== null) {
      return owner.name || "unknown";
    }
    if (owner === user._id) {
      return user.name;
    }
    return "unknown";
  };

  const getOwnerEmail = (owner: string | Owner) => {
    if (typeof owner === "object" && owner !== null) {
      return owner.email || "unknown";
    }
    if (owner === user._id) {
      return user.email;
    }
    return "unknown";
  };

  return (
    <>
      {" "}
      <li
        key={_id}
        className={`${css.contactCard} ${buttonOn ? css.ownerCard : ""}`}
      >
        <p>{name}</p>
        <p>{email}</p>
        <p>{phone}</p>
        <h2>Owner</h2>
        <ul>
          <li>{getOwnerName(owner)}</li>
          <li>{getOwnerEmail(owner)}</li>
        </ul>

        {buttonOn ? (
          <div className={css.buttonBox}>
            {" "}
            <button
              type="button"
              onClick={() => {
                dispatch(deleteContact(_id));
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
          _id={_id}
          name={name}
          email={email}
          phone={phone}
        />
      ) : null}
    </>
  );
};
