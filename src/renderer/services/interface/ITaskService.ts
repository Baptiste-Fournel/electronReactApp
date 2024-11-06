import { Task } from '../../models/Task';
import { TaskStatus } from '../../../constants/tasksEnum';

export interface ITaskService {
  addTask(tasks: Task[], taskName: string): Task[];
  updateTaskStatus(tasks: Task[], taskId: string, newStatus: TaskStatus): Task[];
  removeTask(tasks: Task[], taskId: string): Task[];
}
