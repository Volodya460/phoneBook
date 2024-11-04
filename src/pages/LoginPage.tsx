import { LoginForm } from "../components/Forms/Login/LoginForm";
import { Container } from "../components/Container/Container";
import { Animation } from "../animation/Animation";

export default function LoginPage() {
  return (
    <Container>
      <Animation>
        <LoginForm />
      </Animation>
    </Container>
  );
}
