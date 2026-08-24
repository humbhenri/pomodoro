import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import React, { useRef } from "react";
import { initialTaskState } from "../../context/initialTaskState";
import { TaskActionTypes } from "../../context/taskActions";
import { useTaskContext } from "../../context/TaskContext";
import type { TaskModel } from "../../models/TaskModel";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { dismiss, showMessage } from "../../adapters/showMessage";

export function MainForm() {
  const taskNameInput = useRef<HTMLInputElement>(null);
  const { state, dispatch } = useTaskContext();
  const lastTaskName = state.tasks.at(-1)?.name || "";
  const numero = useRef<number>(0);

  // ciclos
  const nextCycle = getNextCycle(state.currentCycle);
  const workType = getNextCycleType(nextCycle);

  // tips
  const tipsForWhenActiveTask = {
    workTime: <span>Foque por {state.config.workTime} minutos</span>,
    shortBreakTime: (
      <span>Descanse por {state.config.shortBreakTime} minutos</span>
    ),
    longBreakTime: <span>Descanso longo</span>,
  };

  const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    dismiss();
    numero.current += 1;
    const taskName = taskNameInput.current?.value?.trim();
    if (!taskName?.length) {
      showMessage("Por favor, preencha o nome da tarefa", "warning");
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completedDate: null,
      interruptedDate: null,
      duration: initialTaskState.config[workType],
      type: workType,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
    showMessage(`Tarefa "${taskName}" iniciada!`, "success");
  };

  const handleInterruptTask = () => {
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
    showMessage("Tarefa interrompida!", "info");
  };

  return (
    <form className="form" action="" onSubmit={submit}>
      <div className="formRow">
        <DefaultInput
          id="task"
          type="text"
          labelText="Task"
          placeholder="Name your task"
          ref={taskNameInput}
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
        />
      </div>
      <div className="formRow">
        <p>
          {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
        </p>
      </div>
      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles />
        </div>
      )}
      <div className="formRow">
        {!state.activeTask ? (
          <DefaultButton
            type="submit"
            icon={<PlayCircleIcon />}
            title="Iniciar tarefa"
            key="SubmitButton"
          />
        ) : (
          <DefaultButton
            type="button"
            icon={<StopCircleIcon />}
            title="Parar tarefa"
            color="red"
            onClick={handleInterruptTask}
            key="InterruptButton"
          />
        )}
      </div>
    </form>
  );
}
