import { Task } from '../models/Task';

export interface ITaskRepository {
  loadTasks(): Promise<Task[]>;
  saveTasks(tasks: Task[]): Promise<void>;
  addTask(task: Task): Promise<void>;
  updateTask(taskId: string, updatedTask: Partial<Task>): Promise<void>;
  removeTask(taskId: string): Promise<void>;
  archiveTask(task: Task): Promise<void>; 
}
