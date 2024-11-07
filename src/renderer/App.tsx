import React, { useEffect, useState } from 'react';
import TaskInput from './adapter/components/TaskInput';
import TaskBoard from './adapter/components/TaskBoard';
import { Task } from './models/Task';
import { LocalTaskService } from './services/LocalTaskService';
import { TaskStatus, TaskType } from '../constants/tasksEnum';
import '../../style/App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const taskService = new LocalTaskService();

  useEffect(() => {
    const storedTasks = taskService.loadTasks();
    setTasks(storedTasks);
  }, []);

  function addTask(taskName: string, type: TaskType, authorId: string) {
    setTasks(taskService.addTask(tasks, taskName, type, authorId));
  }

  function updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    setTasks(taskService.updateTaskStatus(tasks, taskId, newStatus));
  }

  function removeTask(taskId: string) {
    setTasks(taskService.removeTask(tasks, taskId));
  }

  function addSubTask(taskId: string, subTaskName: string) {
    setTasks(taskService.addSubTask(tasks, taskId, subTaskName));
  }

  function updateSubTaskStatus(taskId: string, subTaskId: string, newStatus: TaskStatus) {
    setTasks(taskService.updateSubTaskStatus(tasks, taskId, subTaskId, newStatus));
  }

  function removeSubTask(taskId: string, subTaskId: string) {
    setTasks(taskService.removeSubTask(tasks, taskId, subTaskId));
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

