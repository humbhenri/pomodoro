import { PlayCircleIcon } from "lucide-react";
import React, { useRef } from "react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import type { TaskModel } from "../../models/TaskModel";
import { getNextCycle } from "../../utils/getNextCycle";
import { useTaskContext } from "../../context/TaskContext";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { initialTaskState } from "../../context/initialTaskState";
import { formatSecodsToMinutes } from "../../utils/timeFormatter";

export function MainForm() {
  const taskNameInput = useRef<HTMLInputElement>(null);
  const { state, setState } = useTaskContext();
  const numero = useRef<number>(0);

  const nextCycle = getNextCycle(state.currentCycle);
  const workType = getNextCycleType(nextCycle);

  const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    numero.current += 1;
    const taskName = taskNameInput.current?.value?.trim();
    if (!taskName?.length) {
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

    const secondsRemaining = newTask.duration * 60;

    setState((prev) => {
      return {
        ...prev,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecodsToMinutes(secondsRemaining),
        tasks: [...prev.tasks, newTask],
      };
    });
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
        />
      </div>
      <div className="formRow">
        <p>
          Próximo intervalo é de{" "}
          {formatSecodsToMinutes(initialTaskState.config[workType] * 60)}{" "}
          minutos de{" "}
          {workType === "workTime"
            ? "trabalho"
            : workType === "shortBreakTime"
              ? "pausa curta"
              : "pausa longa"}
          .
        </p>
      </div>
      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles />
        </div>
      )}
      <div className="formRow">
        <DefaultButton type="submit" icon={<PlayCircleIcon />} />
      </div>
    </form>
  );
}
