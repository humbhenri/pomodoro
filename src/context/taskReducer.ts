import type { TaskStateModel } from "../models/TaskStateModel";
import { getNextCycle } from "../utils/getNextCycle";
import { formatSecodsToMinutes } from "../utils/timeFormatter";
import { TaskActionTypes, type TaskActionModel } from "./taskActions";

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const secondsRemaining = newTask.duration * 60;
      const nextCycle = getNextCycle(state.currentCycle);
      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecodsToMinutes(secondsRemaining),
        tasks: [...state.tasks, newTask],
      };
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: formatSecodsToMinutes(0),
        tasks: state.tasks.map((task) => {
          if (task.id === state.activeTask?.id) {
            return {
              ...task,
              interruptedDate: Date.now(),
            };
          }
          return task;
        }),
      };
    }
    case TaskActionTypes.COUNT_DOWN: {
      console.log(action.payload.secondsRemaining)
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formatSecodsToMinutes(
          action.payload.secondsRemaining,
        ),
      };
    }
    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        secondsRemaining: 0,
        formattedSecondsRemaining: formatSecodsToMinutes(0),
        activeTask: null,
        tasks: state.tasks.map((task) => {
          if (task.id === state.activeTask?.id) {
            return {
              ...task,
              completedDate: Date.now(),
            };
          }
          return task;
        }),
      };
    }
    default:
      return state;
  }
}
