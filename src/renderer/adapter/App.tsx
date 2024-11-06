import React, { useEffect, useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskBoard from './components/TaskBoard';
import { Task } from '../models/Task';
import { LocalTaskService } from '../services/LocalTaskService';
import '../../style/App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const taskService = new LocalTaskService(); 

  useEffect(() => {
    const storedTasks = taskService.loadTasks(); 
    setTasks(storedTasks);
  }, []);

  function addTask(taskName: string) {
    setTasks(taskService.addTask(tasks, taskName));
  }

  function updateTaskStatus(taskId: string, newStatus: Task['status']) {
    setTasks(taskService.updateTaskStatus(tasks, taskId, newStatus));
  }

  function removeTask(taskId: string) {
    setTasks(taskService.removeTask(tasks, taskId));
  }

  return (
    <div className="App">
      <h1>Gestionnaire de tâches</h1>
      <TaskInput addTask={addTask} />
      <TaskBoard
        tasks={tasks}
        updateTaskStatus={updateTaskStatus}
        removeTask={removeTask}
      />
    </div>
  );
}

export default App;
