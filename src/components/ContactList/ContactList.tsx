import { getInputFilter, getContacts } from "../../redux/contactSlice";
import { Contact } from "../Contact/Contact";
import { useSelector } from "react-redux";
import css from "../ContactList/ContactList.module.css";
import { useState } from "react";
import { getUser, getUserSubscription } from "../../redux/auth/authSlice";
import { ContactType } from "../../assets/schemas/ContactSchema";

export function ContactList() {
  const filter: string | null = useSelector(getInputFilter) || "";
  const array = useSelector(getContacts);
  const user = useSelector(getUser);
  const userSubscription = useSelector(getUserSubscription);

  const [seeAllContacts, setSeeAllContacts] = useState(false);

  const sortedItems = [...array].sort((a, b) => {
    const aOwnerId = typeof a.owner === "object" ? a.owner?._id : a.owner;
    const bOwnerId = typeof b.owner === "object" ? b.owner?._id : b.owner;
    if (aOwnerId === user._id && bOwnerId !== user._id) {
      return -1;
    } else if (aOwnerId !== user._id && bOwnerId === user._id) {
      return 1;
    }
    return 0;
  });

  const contactsFilterPro = (contactsArray: ContactType[]) => {
    if (!seeAllContacts) {
      return contactsArray.filter((contact) => {
        const ownerId =
          typeof contact.owner === "object" ? contact.owner._id : contact.owner;
        return ownerId === user._id;
      });
    }
    return contactsArray;
  };
  const renderButtonContacts = () => {
    if (userSubscription === "pro") {
      return (
        <>
          {seeAllContacts ? (
            <button
              className={css.buttonFiltr}
              type="button"
              onClick={() => {
                setSeeAllContacts((prev) => !prev);
              }}
            >
              See only yours contacts
            </button>
          ) : (
            <button
              className={css.buttonFiltr}
              type="button"
              onClick={() => {
                setSeeAllContacts((prev) => !prev);
              }}
            >
              See all contacts
            </button>
          )}
        </>
      );
    }
  };

  const filterList = contactsFilterPro(sortedItems).filter((fil) =>
    fil.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      {renderButtonContacts()}

      <ul className={css.contactList}>
        {filterList.map(({ _id, name, phone, email, owner }) => {
          return (
            <Contact
              key={_id}
              _id={_id}
              name={name}
              phone={phone}
              email={email}
              owner={owner}
            />
          );
        })}
      </ul>
    </>
  );
}
