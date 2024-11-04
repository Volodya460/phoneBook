import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContactList } from "../components/ContactList/ContactList";
import AddForm from "../components/Forms/AddContact/AddForm";
import { Container } from "../components/Container/Container";
import { Filter } from "../components/Filter/Filter";
import { fetchContacts, fetchContactsPro } from "../redux/operations";
import { getError, getIsLoading } from "../redux/contactSlice";
import { getIsLoggedIn, getUserSubscription } from "../redux/auth/authSlice";
import css from "./contactsPage.module.css";
import { BookLoader } from "../assets/loaders/BookLoader";
import { AppDispatch } from "../redux/store";

export default function ContactsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const IsLoggedIn = useSelector(getIsLoggedIn);
  const Subscription = useSelector(getUserSubscription);

  useEffect(() => {
    if (!IsLoggedIn) {
      return;
    }
    if (Subscription === "pro") {
      dispatch(fetchContactsPro());
    } else {
      dispatch(fetchContacts());
    }
  }, [dispatch, IsLoggedIn, Subscription]);
  return (
    <Container>
      <section className={css.contactSection}>
        {" "}
        <AddForm />
        <div className={css.contactBox}>
          <Filter />
          {loading && !error ? <BookLoader /> : <ContactList />}
        </div>
      </section>
    </Container>
  );
}
