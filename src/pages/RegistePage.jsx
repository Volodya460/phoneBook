import { useDispatch } from "react-redux";
import { register } from "../redux/auth/authOperations";

import { Container } from "../components/Container/Container";

import { RegisteForm } from "../components/Forms/Registe/RegisteForm";
import { Animation } from "../animation/Animation";

export default function RegisterPage() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    const { name, email, password } = e;
    if ((!name.trim(), !email.trim(), !password.trim())) {
      return alert("Fill the fields");
    }
    dispatch(
      register({
        name: name,
        email: email,
        password: password,
      })
    );
  };
  return (
    <Container>
      <Animation>
        {" "}
        <RegisteForm onSubmit={handleSubmit} />
      </Animation>
    </Container>
  );
}
