import { Container } from "../components/Container/Container";
import { RegisteForm } from "../components/Forms/Registe/RegisteForm";
import { Animation } from "../animation/Animation";

export default function RegisterPage() {
  return (
    <Container>
      <Animation>
        {" "}
        <RegisteForm />
      </Animation>
    </Container>
  );
}
