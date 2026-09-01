import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/DefaultInput";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";
import styles from "./styles.module.css";
import { useRef } from "react";
import { useTaskContext } from "../../context/TaskContext";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../context/taskActions";

export function Settings() {
  const { state, dispatch } = useTaskContext();
  const wtRef = useRef<HTMLInputElement>(null);
  const stRef = useRef<HTMLInputElement>(null);
  const ltRef = useRef<HTMLInputElement>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const workTime = Number(wtRef.current?.value);
    const shortBreakTime = Number(stRef.current?.value);
    const longBreakTime = Number(ltRef.current?.value);
    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      showMessage("Use apenas números");
      return;
    }
    if (workTime < 1 || workTime > 99) {
      showMessage("Digite valores entre 1 e 99 para foco", "error");
      return;
    }
    if (shortBreakTime < 1 || shortBreakTime > 99) {
      showMessage("Digite valores entre 1 e 30 para descanso curto", "error");
      return;
    }
    if (longBreakTime < 1 || longBreakTime > 60) {
      showMessage("Digite valores entre 1 e 60 para descanso long", "error");
      return;
    }
    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: { workTime, shortBreakTime, longBreakTime },
    });
    showMessage("Configurações salvas");
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <p className={styles.paragraph}>TESTE</p>
      </Container>

      <Container>
        <form action="" className="form" onSubmit={onSubmit}>
          <div className="formRow">
            <DefaultInput
              id="workTime"
              labelText="Foco"
              ref={wtRef}
              defaultValue={state.config.workTime}
              type="number"
            />
          </div>
          <div className="formRow">
            <DefaultInput
              id="shortBreakTime"
              labelText="Descanso curto"
              ref={stRef}
              defaultValue={state.config.shortBreakTime}
              type="number"
            />
          </div>
          <div className="formRow">
            <DefaultInput
              id="longBreakTime"
              labelText="Descanso long"
              ref={ltRef}
              defaultValue={state.config.longBreakTime}
              type="number"
            />
          </div>
          <div className="formRow">
            <DefaultButton id="save" icon={<SaveIcon />} />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
