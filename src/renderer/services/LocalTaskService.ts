import { Task } from '../models/Task';
import { TaskStatus } from '../../constants/tasksEnum';
import { ITaskService } from './interface/ITaskService';
import { v4 as uuidv4 } from 'uuid';

export class LocalTaskService implements ITaskService {
  private storageKey = 'tasks';

  loadTasks(): Task[] {
    const tasks = localStorage.getItem(this.storageKey);
    if (tasks) {
      return JSON.parse(tasks);
    } else {
      return [];
    }
  }

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  addTask(tasks: Task[], taskName: string): Task[] {
    const newTask: Task = {
      id: uuidv4(),
      name: taskName,
      status: TaskStatus.NotStarted,
    };
    const updatedTasks = tasks.concat(newTask);
    this.saveTasks(updatedTasks);
    return updatedTasks;
  }

  updateTaskStatus(tasks: Task[], taskId: string, newStatus: TaskStatus): Task[] {
    const updatedTasks: Task[] = [];
    for (const task of tasks) {
      if (task.id === taskId) {
        updatedTasks.push({ ...task, status: newStatus });
      } else {
        updatedTasks.push(task);
      }
    }
    this.saveTasks(updatedTasks);
    return updatedTasks;
  }

  removeTask(tasks: Task[], taskId: string): Task[] {
    const remainingTasks: Task[] = [];
    for (const task of tasks) {
      if (task.id !== taskId) {
        remainingTasks.push(task);
      }
    }
    this.saveTasks(remainingTasks);
    return remainingTasks;
  }
}
