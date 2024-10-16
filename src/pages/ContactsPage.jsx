import { ContactList } from "../components/ContactList/ContactList";

import AddForm from "../components/Forms/AddContact/AddForm";
import { Container } from "../components/Container/Container";
import { Filter } from "../components/Filter/Filter";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, fetchContactsPro } from "../redux/operations";
import { getError, getIsLoading } from "../redux/contactSlice";
import { getIsLoggedIn, getUserSubscription } from "../redux/auth/authSlice";
import css from "./contactsPage.module.css";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const loading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const IsLoggedIn = useSelector(getIsLoggedIn);
  const Subsciption = useSelector(getUserSubscription);

  useEffect(() => {
    if (!IsLoggedIn) {
      return;
    }
    if (Subsciption === "pro") {
      dispatch(fetchContactsPro());
    } else {
      dispatch(fetchContacts());
    }
  }, [dispatch, IsLoggedIn, Subsciption]);
  return (
    <Container>
      <section className={css.contactSection}>
        {" "}
        <AddForm />
        <div className={css.contactBox}>
          <Filter />
          {loading && !error ? <p>Loading</p> : <ContactList />}
        </div>
      </section>
    </Container>
  );
}
