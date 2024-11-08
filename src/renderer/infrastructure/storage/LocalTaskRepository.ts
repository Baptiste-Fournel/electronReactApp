import { IArchiveRepository } from '../../domain/interface/IArchiveRepository';
import { ITaskRepository } from '../../domain/interface/ITaskRepository';
import { Task } from '../../domain/models/Task';

export class LocalTaskRepository implements ITaskRepository, IArchiveRepository {
  private storageKey = 'tasks';
  private archiveStorageKey = 'archivedTasks';

  async loadTasks(): Promise<Task[]> {
    const tasks = localStorage.getItem(this.storageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  async loadArchivedTasks(): Promise<Task[]> {
    const archivedTasks = localStorage.getItem(this.archiveStorageKey);
    return archivedTasks ? JSON.parse(archivedTasks) : [];
  }

  async saveTasks(tasks: Task[]): Promise<void> {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  async saveArchivedTasks(tasks: Task[]): Promise<void> {
    localStorage.setItem(this.archiveStorageKey, JSON.stringify(tasks));
  }

  async addTask(task: Task): Promise<void> {
    const tasks = await this.loadTasks();
    tasks.push(task);
    await this.saveTasks(tasks);
  }

  async updateTask(taskId: string, updatedTask: Partial<Task>): Promise<void> {
    const tasks = await this.loadTasks();
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    await this.saveTasks(updatedTasks);
  }

  async removeTask(taskId: string): Promise<void> {
    const tasks = await this.loadTasks();
    const remainingTasks = tasks.filter(task => task.id !== taskId);
    await this.saveTasks(remainingTasks);
  }

  async archiveTask(task: Task): Promise<void> {
    const archivedTasks = await this.loadArchivedTasks();
    const updatedArchivedTasks = [...archivedTasks, task];
    await this.saveArchivedTasks(updatedArchivedTasks);
    await this.removeTask(task.id);
  }

  async removeArchivedTask(taskId: string): Promise<void> {
    const archivedTasks = await this.loadArchivedTasks();
    const updatedArchivedTasks = archivedTasks.filter(task => task.id !== taskId);
    await this.saveArchivedTasks(updatedArchivedTasks);
  }
}
