import { TaskStatus } from '../../constants/tasksEnum';

export interface Task {
    id: string;
    name: string;
    status: TaskStatus;
  }
  