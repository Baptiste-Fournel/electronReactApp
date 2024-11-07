import { Task, SubTask } from '../models/Task';
import { TaskStatus, TaskType } from '../../constants/tasksEnum';
import { ITaskService } from './interface/ITaskService';
import { v4 as uuidv4 } from 'uuid';

export class LocalTaskService implements ITaskService {
  private storageKey = 'tasks';

  async loadTasks(): Promise<Task[]> {
    const tasks = localStorage.getItem(this.storageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  async saveTasks(tasks: Task[]): Promise<void> {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  addTask(tasks: Task[], taskName: string, type: TaskType, authorId: string): Task[] {
    const newTask: Task = {
      id: uuidv4(),
      name: taskName,
      status: TaskStatus.NotStarted,
      type,
      authorId,
      subTasks: [],
    };
    const updatedTasks = tasks.concat(newTask);
    this.saveTasks(updatedTasks);
    return updatedTasks;
  }

  updateTaskStatus(tasks: Task[], taskId: string, newStatus: TaskStatus): Task[] {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    this.saveTasks(updatedTasks); 
    return updatedTasks;
  }

  removeTask(tasks: Task[], taskId: string): Task[] {
    const remainingTasks = tasks.filter(task => task.id !== taskId);
    this.saveTasks(remainingTasks);
    return remainingTasks;
  }

  addSubTask(tasks: Task[], taskId: string, subTaskName: string): Task[] {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const newSubTask: SubTask = {
          id: uuidv4(),
          name: subTaskName,
          status: TaskStatus.NotStarted,
        };
        const updatedSubTasks = task.subTasks ? [...task.subTasks, newSubTask] : [newSubTask];
        return { ...task, subTasks: updatedSubTasks };
      }
      return task;
    });
    this.saveTasks(updatedTasks);
    return updatedTasks;
  }

  updateSubTaskStatus(tasks: Task[], taskId: string, subTaskId: string, newStatus: TaskStatus): Task[] {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId && task.subTasks) {
        const updatedSubTasks = task.subTasks.map(subTask =>
          subTask.id === subTaskId ? { ...subTask, status: newStatus } : subTask
        );
        return { ...task, subTasks: updatedSubTasks };
      }
      return task;
    });
    this.saveTasks(updatedTasks);
    return updatedTasks;
  }

  removeSubTask(tasks: Task[], taskId: string, subTaskId: string): Task[] {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId && task.subTasks) {
        const updatedSubTasks = task.subTasks.filter(subTask => subTask.id !== subTaskId);
        return { ...task, subTasks: updatedSubTasks };
      }
      return task;
    });
    this.saveTasks(updatedTasks);
    return updatedTasks;
  }
}
