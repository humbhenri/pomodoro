import { useEffect, useReducer, useRef } from "react";
import { TaskContext } from "./TaskContext";
import { initialTaskState } from "./initialTaskState";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../workers/TimerWorkerManager";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const workerRef = useRef<TimerWorkerManager | null>(null);

  useEffect(() => {
    const worker = TimerWorkerManager.getInstance();
    workerRef.current = worker;

    worker.onMessage((event) => {
      const countDownSeconds = event.data;
      console.log("Mensagem recebida do worker: ", countDownSeconds);
      if (countDownSeconds <= 0) {
        console.log("Task completed");
        worker.terminate();
        workerRef.current = null;
      }
    });

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  useEffect(() => {
    console.log("Estado atualizado: ", state);

    if (!state.activeTask) {
      console.log("Nenhuma tarefa ativa.");
      return;
    }

    const worker = workerRef.current ?? TimerWorkerManager.getInstance();
    workerRef.current = worker;

    worker.onMessage((event) => {
      const countDownSeconds = event.data;
      console.log("Mensagem recebida do worker: ", countDownSeconds);
      if (countDownSeconds <= 0) {
        console.log("Task completed");
        worker.terminate();
        workerRef.current = null;
      }
    });

    worker.postMessage(state);
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
