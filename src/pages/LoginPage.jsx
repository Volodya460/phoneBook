import { useDispatch } from "react-redux";
import { logIn } from "../redux/auth/authOperations";

import { LoginForm } from "../components/Forms/Login/LoginForm";
import { Container } from "../components/Container/Container";
import { Animation } from "../animation/Animation";

export default function LoginPage() {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (
      (!form.elements.email.value.trim(), !form.elements.password.value.trim())
    ) {
      form.reset();
      return alert("Fill the fields");
    }
    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };
  return (
    <Container>
      <Animation>
        <LoginForm handleSubmit={handleSubmit} />
      </Animation>
    </Container>
  );
}
