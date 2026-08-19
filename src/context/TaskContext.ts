import React, { useContext } from "react";
import { createContext } from "react";
import { initialTaskState } from "./initialTaskState";
import type { TaskStateModel } from "../models/TaskStateModel";
import type { TaskActionModel } from "./taskActions";

type TaskContextProps = {
    state: TaskStateModel,
    dispatch: React.Dispatch<TaskActionModel>
}

const initialContextValue = {
    state: initialTaskState,
    dispatch: () => {}
}

const TaskContext = createContext<TaskContextProps>(initialContextValue);

export function useTaskContext() {
    return useContext(TaskContext);
}

export { TaskContext };