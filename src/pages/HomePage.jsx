import css from "./homePage.module.css";
import { Container } from "../components/Container/Container";
export default function HomePage() {
  return (
    <div className={css.section}>
      {" "}
      <Container>
        {" "}
        <div className={css.animationBody}>
          <div className={css.ring}>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div
            className={css.ring}
            style={{ position: "absolute", height: "100px" }}
          >
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
        </div>
      </Container>
    </div>
  );
}
