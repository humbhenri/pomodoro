import { PlayCircleIcon } from "lucide-react";
import React, { useRef } from "react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import type { TaskModel } from "../../models/TaskModel";
import { getNextCycle } from "../../utils/getNextCycle";
import { useTaskContext } from "../../context/TaskContext";

export function MainForm() {
  const taskNameInput = useRef<HTMLInputElement>(null);
  const {state, setState}= useTaskContext();
  const numero = useRef<number>(0);

  const nextCycle = getNextCycle(state.currentCycle);
  console.log("Next cycle: ", nextCycle);

  const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    numero.current += 1;
    const taskName = taskNameInput.current?.value?.trim();
    if (!taskName?.length) {
      return;
    }
    console.log(
      "Form submitted with task number ",
      numero.current,
      ":",
      taskName,
    );

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completedDate: null,
      interruptedDate: null,
      duration: 1,
      type: 'workTime'
    };

    const secondsRemaining = newTask.duration * 60;

    setState(prev => {
      return {
        ...prev,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formatedSecondsRemaining: '00:00', // TODO
        tasks: [...prev.tasks, newTask],
      }
    })
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatum.
        </p>
      </div>
      <div className="formRow">
        <Cycles />
      </div>
      <div className="formRow">
        <DefaultButton type="submit" icon={<PlayCircleIcon />} />
      </div>
    </form>
  );
}
