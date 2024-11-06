import { Task } from '../models/Task';
import { v4 as uuidv4 } from 'uuid';
import { TaskStatus } from '../../constants/tasksEnum';
import { ITaskService } from './interface/ITaskService';

export class TaskService implements ITaskService {
  addTask(tasks: Task[], taskName: string): Task[] {
    const newTask: Task = {
      id: uuidv4(),
      name: taskName,
      status: TaskStatus.NotStarted,
    };
    return tasks.concat(newTask);
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
    return updatedTasks;
  }

  removeTask(tasks: Task[], taskId: string): Task[] {
    const remainingTasks: Task[] = [];
    for (const task of tasks) {
      if (task.id !== taskId) {
        remainingTasks.push(task);
      }
    }
    return remainingTasks;
  }
}
