import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";

import styles from "./styles.module.css";
import { useTaskContext } from "../../context/TaskContext";
import { formatDate } from "../../utils/timeFormatter";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks, type SortTaskOptions } from "../../utils/sortTasks";
import { useEffect, useState } from "react";
import { TaskActionTypes } from "../../context/taskActions";

export function History() {
  const { state, dispatch } = useTaskContext();
  const hasTasks = state.tasks.length > 0;

  useEffect(() => {
    setSortTaskOptions((prevState) => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  const taskTypeMap = {
    workTime: "Foco",
    shortBreakTime: "Descanso curto",
    longBreakTime: "Descanso longo",
  };

  const [sortTasksOptions, setSortTaskOptions] = useState<SortTaskOptions>(
    () => {
      return {
        field: "startDate",
        direction: "desc",
        tasks: sortTasks({ tasks: state.tasks }),
      };
    },
  );

  function handleSortTasks({
    field,
  }: Omit<SortTaskOptions, "tasks" | "direction">) {
    const newDirection = sortTasksOptions.direction == "desc" ? "asc" : "desc";
    setSortTaskOptions({
      direction: newDirection,
      tasks: sortTasks({
        field,
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
      }),
      field,
    });
  }

  function handleResetHistory() {
    if (!confirm("Tem certeza?")) {
      return;
    }
    dispatch({ type: TaskActionTypes.RESET_STATE });
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<TrashIcon />}
                color="red"
                title="Apagar todo o histórico"
                onClick={handleResetHistory}
              />
            </span>
          )}
        </Heading>
      </Container>
      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSortTasks({ field: "name" })}>
                    Tarefa ↕
                  </th>
                  <th onClick={() => handleSortTasks({ field: "duration" })}>
                    Duração ↕
                  </th>
                  <th onClick={() => handleSortTasks({ field: "startDate" })}>
                    Data ↕
                  </th>
                  <th>Status</th>
                  <th onClick={() => handleSortTasks({ field: "type" })}>
                    Tipo ↕
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortTasksOptions.tasks.map((task) => (
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
        )}
        {!hasTasks && (
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            Ainda não existem tarefas criadas.
          </p>
        )}
      </Container>
    </MainTemplate>
  );
}
