import { useEffect, useReducer, useRef } from "react";
import type { TaskStateModel } from "../models/TaskStateModel";
import { TimerWorkerManager } from "../workers/TimerWorkerManager";
import { initialTaskState } from "./initialTaskState";
import { TaskActionTypes } from "./taskActions";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { loadBeep } from "../utils/loadBeep";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storageState = localStorage.getItem("state");

    if (storageState === null) return initialTaskState;

    const parsedStorageState = JSON.parse(storageState) as TaskStateModel;

    return {
      ...parsedStorageState,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: "00:00",
    };
  });

  const workerRef = useRef<TimerWorkerManager | null>(null);

  function getWorker() {
    if (!workerRef.current) {
      workerRef.current = TimerWorkerManager.getInstance();
    }
    return workerRef.current;
  }

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;

    if (!state.activeTask) {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
      return;
    }

    const worker = getWorker();

    worker.onmessage((e) => {
      const countDownSeconds = e.data;

      if (countDownSeconds <= 0) {
        if (playBeepRef.current) {
          playBeepRef.current();
          playBeepRef.current = null;
        }
        dispatch({
          type: TaskActionTypes.COMPLETE_TASK,
        });
        worker.terminate();
        workerRef.current = null;
      } else {
        dispatch({
          type: TaskActionTypes.COUNT_DOWN,
          payload: { secondsRemaining: countDownSeconds },
        });
      }
    });

    worker.postMessage(state);
  }, [state]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
