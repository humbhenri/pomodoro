import React, { useContext } from "react";
import { createContext } from "react";
import { initialTaskState } from "./initialTaskState";
import type { TaskStateModel } from "../models/TaskStateModel";

type TaskContextProps = {
    state: TaskStateModel,
    setState: React.Dispatch<React.SetStateAction<TaskStateModel>>
}

const initialContextValue = {
    state: initialTaskState,
    setState: () => {}
}

const TaskContext = createContext<TaskContextProps>(initialContextValue);

export function useTaskContext() {
    return useContext(TaskContext);
}

export { TaskContext };