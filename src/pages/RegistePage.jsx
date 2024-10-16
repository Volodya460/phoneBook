import { useDispatch } from "react-redux";
import { register } from "../redux/auth/authOperations";

import { Container } from "../components/Container/Container";

import { RegisteForm } from "../components/Forms/Registe/RegisteForm";
import { Animation } from "../animation/Animation";

export default function RegisterPage() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (
      (!form.elements.name.value.trim(),
      !form.elements.email.value.trim(),
      !form.elements.password.value.trim())
    ) {
      form.reset();
      return alert("Fill the fields");
    }
    dispatch(
      register({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };
  return (
    <Container>
      <Animation>
        {" "}
        <RegisteForm handleSubmit={handleSubmit} />
      </Animation>
    </Container>
  );
}
