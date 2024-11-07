import React, { useEffect, useState } from 'react';
import TaskInput from './adapter/components/TaskInput';
import TaskBoard from './adapter/components/TaskBoard';
import { Task } from './models/Task';
import { LocalTaskService } from './services/LocalTaskService';
import { TaskStatus, TaskType } from '../constants/tasksEnum';
import '../style/App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const taskService = new LocalTaskService();

  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = await taskService.loadTasks();
      setTasks(storedTasks);
    };
    fetchTasks();
  }, []);

  async function addTask(taskName: string, type: TaskType, authorId: string) {
    const updatedTasks = taskService.addTask(tasks, taskName, type, authorId);
    setTasks(updatedTasks);
  }

  async function updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    const updatedTasks = taskService.updateTaskStatus(tasks, taskId, newStatus);
    setTasks(updatedTasks);
  }

  async function removeTask(taskId: string) {
    const updatedTasks = taskService.removeTask(tasks, taskId);
    setTasks(updatedTasks);
  }

  async function addSubTask(taskId: string, subTaskName: string) {
    const updatedTasks = taskService.addSubTask(tasks, taskId, subTaskName);
    setTasks(updatedTasks);
  }

  async function updateSubTaskStatus(taskId: string, subTaskId: string, newStatus: TaskStatus) {
    const updatedTasks = taskService.updateSubTaskStatus(tasks, taskId, subTaskId, newStatus);
    setTasks(updatedTasks);
  }

  async function removeSubTask(taskId: string, subTaskId: string) {
    const updatedTasks = taskService.removeSubTask(tasks, taskId, subTaskId);
    setTasks(updatedTasks);
  }

  return (
    <div className="App">
      <h1>Gestionnaire de tâches</h1>
      <TaskInput addTask={addTask} />
      <TaskBoard
        tasks={tasks}
        updateTaskStatus={updateTaskStatus}
        removeTask={removeTask}
        addSubTask={addSubTask}
        updateSubTaskStatus={updateSubTaskStatus}
        removeSubTask={removeSubTask}
      />
    </div>
  );
}

export default App;
