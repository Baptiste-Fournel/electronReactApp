import { Task } from '../models/Task';

export interface IArchiveRepository {
  loadArchivedTasks(): Promise<Task[]>;
  saveArchivedTasks(tasks: Task[]): Promise<void>;
  removeArchivedTask(taskId: string): Promise<void>;
}
