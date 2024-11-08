import { TaskStatus, TaskType } from '../../domain/enums/tasksEnum';
import { ITaskRepository } from '../../domain/interface/ITaskRepository';
import { Task, SubTask } from '../../domain/models/Task';
import { v4 as uuidv4 } from 'uuid';
import { ArchiveService } from './ArchiveService';

export class TaskService {
  constructor(
    private taskRepository: ITaskRepository,
    private archiveService: ArchiveService
  ) {}

  async addTask(taskName: string, type: TaskType, authorId: string): Promise<Task> {
    const newTask: Task = {
      id: uuidv4(),
      name: taskName,
      status: TaskStatus.NotStarted,
      type,
      authorId,
      subTasks: [],
    };
    await this.taskRepository.addTask(newTask);
    return newTask;
  }

  async getTasks(): Promise<Task[]> {
    return await this.taskRepository.loadTasks();
  }

  async updateTaskStatus(taskId: string, newStatus: TaskStatus): Promise<void> {
    const tasks = await this.taskRepository.loadTasks();
    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (taskToUpdate) {
      taskToUpdate.status = newStatus;
      await this.taskRepository.updateTask(taskId, taskToUpdate);
    }
  }

  async removeTask(taskId: string): Promise<void> {
    await this.taskRepository.removeTask(taskId);
  }

  async archiveTask(taskId: string): Promise<void> {
    const tasks = await this.taskRepository.loadTasks();
    const taskToArchive = tasks.find(task => task.id === taskId);
    if (taskToArchive && taskToArchive.status === TaskStatus.Completed) {
      await this.archiveService.archiveTask(taskToArchive);
      await this.removeTask(taskId);
    }
  }

  async addSubTask(taskId: string, subTaskName: string): Promise<void> {
    const tasks = await this.taskRepository.loadTasks();
    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (taskToUpdate) {
      const newSubTask: SubTask = {
        id: uuidv4(),
        name: subTaskName,
        status: TaskStatus.NotStarted,
      };
      taskToUpdate.subTasks = taskToUpdate.subTasks ? [...taskToUpdate.subTasks, newSubTask] : [newSubTask];
      await this.taskRepository.updateTask(taskId, taskToUpdate);
    }
  }

  async updateSubTaskStatus(taskId: string, subTaskId: string, newStatus: TaskStatus): Promise<void> {
    const tasks = await this.taskRepository.loadTasks();
    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (taskToUpdate && taskToUpdate.subTasks) {
      const updatedSubTasks = taskToUpdate.subTasks.map(subTask =>
        subTask.id === subTaskId ? { ...subTask, status: newStatus } : subTask
      );
      taskToUpdate.subTasks = updatedSubTasks;
      await this.taskRepository.updateTask(taskId, taskToUpdate);
    }
  }

  async removeSubTask(taskId: string, subTaskId: string): Promise<void> {
    const tasks = await this.taskRepository.loadTasks();
    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (taskToUpdate && taskToUpdate.subTasks) {
      taskToUpdate.subTasks = taskToUpdate.subTasks.filter(subTask => subTask.id !== subTaskId);
      await this.taskRepository.updateTask(taskId, taskToUpdate);
    }
  }

  async getArchivedTasks(): Promise<Task[]> {
    return await this.archiveService.getArchivedTasks();
  }
}
