import React, { createContext, useContext, useEffect, useState } from 'react';
import { TaskService } from '../service/TaskService';
import { ArchiveService } from '../service/ArchiveService';
import { LocalTaskRepository } from '../../infrastructure/storage/LocalTaskRepository';
import { TaskStatus, TaskType } from '../../domain/enums/tasksEnum';
import { Task } from '../../domain/models/Task';

type TaskContextType = {
  tasks: Task[];
  archivedTasks: Task[];
  addTask: (name: string, type: TaskType, author: string) => Promise<void>;
  updateTaskStatus: (id: string, status: TaskStatus) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  archiveTask: (id: string) => Promise<void>;
  addSubTask: (taskId: string, subTaskName: string) => Promise<void>;
  updateSubTaskStatus: (taskId: string, subTaskId: string, newStatus: TaskStatus) => Promise<void>;
  removeSubTask: (taskId: string, subTaskId: string) => Promise<void>;
  loadArchivedTasks: () => Promise<void>;
  removeArchivedTask: (id: string) => Promise<void>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);

  const taskRepository = new LocalTaskRepository();
  const archiveService = new ArchiveService(taskRepository);
  const taskService = new TaskService(taskRepository, archiveService);

  useEffect(() => {
    const loadInitialTasks = async () => {
      const loadedTasks = await taskService.getTasks();
      setTasks(loadedTasks);
    };
    loadInitialTasks();
  }, []);

  const loadArchivedTasks = async () => {
    const loadedArchivedTasks = await archiveService.getArchivedTasks();
    setArchivedTasks(loadedArchivedTasks);
  };

  const removeArchivedTask = async (id: string) => {
    await archiveService.removeArchivedTask(id);
    setArchivedTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        archivedTasks,
        addTask: async (name, type, author) => {
          const newTask = await taskService.addTask(name, type, author);
          setTasks((prev) => [...prev, newTask]);
        },
        updateTaskStatus: async (id, status) => {
          await taskService.updateTaskStatus(id, status);
          setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, status } : task))
          );
        },
        removeTask: async (id) => {
          await taskService.removeTask(id);
          setTasks((prev) => prev.filter((task) => task.id !== id));
        },
        archiveTask: async (id) => {
          await taskService.archiveTask(id);
          setTasks((prev) => prev.filter((task) => task.id !== id));
          await loadArchivedTasks();
        },
        addSubTask: async (taskId, subTaskName) => {
          await taskService.addSubTask(taskId, subTaskName);
          const updatedTasks = await taskService.getTasks();
          setTasks(updatedTasks);
        },
        updateSubTaskStatus: async (taskId, subTaskId, newStatus) => {
          await taskService.updateSubTaskStatus(taskId, subTaskId, newStatus);
          const updatedTasks = await taskService.getTasks();
          setTasks(updatedTasks);
        },
        removeSubTask: async (taskId, subTaskId) => {
          await taskService.removeSubTask(taskId, subTaskId);
          const updatedTasks = await taskService.getTasks();
          setTasks(updatedTasks);
        },
        loadArchivedTasks,
        removeArchivedTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
