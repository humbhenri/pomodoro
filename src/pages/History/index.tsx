import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";

import styles from "./styles.module.css";
import { useTaskContext } from "../../context/TaskContext";
import { formatDate } from "../../utils/timeFormatter";
import { getTaskStatus } from "../../utils/getTaskStatus";

export function History() {
  const { state } = useTaskContext();

  const taskTypeMap = {
    workTime: "Foco",
    shortBreakTime: "Descanso curto",
    longBreakTime: "Descanso longo",
  };

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          <span className={styles.buttonContainer}>
            <DefaultButton
              icon={<TrashIcon />}
              color="red"
              title="Apagar todo o histórico"
            />
          </span>
        </Heading>
      </Container>
      <Container>
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Data</th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {state.tasks.reverse().map((task) => (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>{task.duration}min</td>
                  <td>{formatDate(task.startDate)}</td>
                  <td>{getTaskStatus(task, state.activeTask)}</td>
                  <td>{taskTypeMap[task.type]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </MainTemplate>
  );
}
