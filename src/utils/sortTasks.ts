import type { TaskModel } from '../models/TaskModel.ts';

export type SortTaskOptions = {
  tasks: TaskModel[];
  direction?: 'asc' | 'desc';
  field?: keyof TaskModel;
}

export function sortTasks({
  field = 'startDate',
  direction = 'desc',
  tasks = [],
}: SortTaskOptions): TaskModel[] {
  return [...tasks].sort((a, b) => {
    const av = a[field];
    const bv = b[field];
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    if (typeof av == 'number' && typeof bv == 'number') {
      return direction === 'asc' ? av - bv : bv - av;
    }
    if (typeof av == 'string' && typeof bv == 'string') {
      return direction === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    }
    return 0;
  });
}
