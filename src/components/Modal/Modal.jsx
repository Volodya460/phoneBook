import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { UpdateForm } from "../Forms/Update/UpdateForm";

const modalRoot = document.querySelector("#modal-root");

export const Modal = ({ closeModal, id, name, phone, email }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  const handleBackDropClick = (e) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <div>
      <div className={css.overlay} onClick={handleBackDropClick}>
        <div className={css.modalWindow}>
          <UpdateForm id={id} name={name} email={email} phone={phone} />
        </div>
      </div>
    </div>,
    modalRoot
  );
};
