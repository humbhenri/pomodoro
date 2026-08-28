import type { TaskModel } from "../models/TaskModel";

export function getTaskStatus(task: TaskModel, activeTask: TaskModel | null) {
  if (task.completedDate) return "Completa";
  if (task.interruptedDate) return "Interrompida";
  if (task.id === activeTask?.id) return "Em progresso";
  return "Abandonada";
}
