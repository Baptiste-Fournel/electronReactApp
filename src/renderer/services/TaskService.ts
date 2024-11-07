import { Task, SubTask } from '../models/Task';
import { v4 as uuidv4 } from 'uuid';
import { TaskStatus, TaskType } from '../../constants/tasksEnum';
import { ITaskService } from './interface/ITaskService';

export class TaskService implements ITaskService {
  addTask(tasks: Task[], taskName: string, type: TaskType, authorId: string): Task[] {
    const newTask: Task = {
      id: uuidv4(),
      name: taskName,
      status: TaskStatus.NotStarted,
      type,
      authorId,
      subTasks: [], 
    };
    return tasks.concat(newTask);
  }

  updateTaskStatus(tasks: Task[], taskId: string, newStatus: TaskStatus): Task[] {
    return tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
  }

  removeTask(tasks: Task[], taskId: string): Task[] {
    return tasks.filter(task => task.id !== taskId);
  }

  addSubTask(tasks: Task[], taskId: string, subTaskName: string): Task[] {
    return tasks.map(task => {
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
  }

  updateSubTaskStatus(tasks: Task[], taskId: string, subTaskId: string, newStatus: TaskStatus): Task[] {
    return tasks.map(task => {
      if (task.id === taskId && task.subTasks) {
        const updatedSubTasks = task.subTasks.map(subTask =>
          subTask.id === subTaskId ? { ...subTask, status: newStatus } : subTask
        );
        return { ...task, subTasks: updatedSubTasks };
      }
      return task;
    });
  }

  removeSubTask(tasks: Task[], taskId: string, subTaskId: string): Task[] {
    return tasks.map(task => {
      if (task.id === taskId && task.subTasks) {
        const updatedSubTasks = task.subTasks.filter(subTask => subTask.id !== subTaskId);
        return { ...task, subTasks: updatedSubTasks };
      }
      return task;
    });
  }
}
