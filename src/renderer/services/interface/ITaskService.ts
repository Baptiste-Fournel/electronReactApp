import { Task, SubTask } from '../../models/Task';
import { TaskStatus, TaskType } from '../../../constants/tasksEnum';

export interface ITaskService {
  addTask(tasks: Task[], taskName: string, type: TaskType, authorId: string): Task[];
  updateTaskStatus(tasks: Task[], taskId: string, newStatus: TaskStatus): Task[];
  removeTask(tasks: Task[], taskId: string): Task[];

  addSubTask(tasks: Task[], taskId: string, subTaskName: string): Task[];
  updateSubTaskStatus(tasks: Task[], taskId: string, subTaskId: string, newStatus: TaskStatus): Task[];
  removeSubTask(tasks: Task[], taskId: string, subTaskId: string): Task[];
}
