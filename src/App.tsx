import "./styles/theme.css";
import "./styles/global.css";
import { Container } from "./components/Container";
import { Logo } from "./components/Logo";
import { Menu } from "./components/Menu";
import { CountDown } from "./components/CountDown";
import { DefaultInput } from "./components/DefaultInput";

export default function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      <Container>
        <CountDown />
      </Container>

      <Container>
        <form className="form" action="">
          <div className="formRow">
            <DefaultInput id="task" type="text" labelText="Task" />
          </div>
          <div className="formRow">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
          </div>
          <div className="formRow">
            <p>Ciclos: 0 0 0 0</p>
          </div>
          <div className="formRow">
            <button type="button">Enviar</button>
          </div>
        </form>
      </Container>
    </>
  );
}
