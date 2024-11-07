import { TaskStatus } from '../../constants/tasksEnum';

export interface SubTask {
  id: string;
  name: string;
  status: TaskStatus;
}
