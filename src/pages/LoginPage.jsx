import { useDispatch } from "react-redux";
import { logIn } from "../redux/auth/authOperations";

import { LoginForm } from "../components/Forms/Login/LoginForm";
import { Container } from "../components/Container/Container";
import { Animation } from "../animation/Animation";

export default function LoginPage() {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    const { email, password } = e;

    if ((!email.trim(), !password.trim())) {
      return alert("Fill the fields");
    }
    dispatch(
      logIn({
        email: email,
        password: password,
      })
    );
  };
  return (
    <Container>
      <Animation>
        <LoginForm onSubmit={handleSubmit} />
      </Animation>
    </Container>
  );
}
