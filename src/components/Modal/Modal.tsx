import { FC, useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { UpdateForm } from "../Forms/Update/UpdateForm";

const modalRoot = document.querySelector("#modal-root");
interface ModalProps {
  closeModal: () => void;
  _id: string;
  name: string;
  phone: string;
  email: string;
}
export const Modal: FC<ModalProps> = ({
  closeModal,
  _id,
  name,
  phone,
  email,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  const handleBackDropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  if (!modalRoot) return null;
  return createPortal(
    <div>
      <div className={css.overlay} onClick={handleBackDropClick}>
        <div className={css.modalWindow}>
          <UpdateForm _id={_id} name={name} email={email} phone={phone} />
        </div>
      </div>
    </div>,
    modalRoot
  );
};
