import React, { useEffect, useState } from 'react';
import TaskInput from './adapter/components/TaskInput';
import TaskBoard from './adapter/components/TaskBoard';
import ArchivePage from './adapter/components/ArchivePage';
import { Task } from './models/Task';
import { LocalTaskService } from './services/LocalTaskService';
import { TaskStatus, TaskType } from '../constants/tasksEnum';
import '../style/App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);
  const [showArchive, setShowArchive] = useState(false);
  const taskService = new LocalTaskService();

  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = await taskService.loadTasks();
      const storedArchivedTasks = await taskService.loadArchivedTasks();
      setTasks(storedTasks);
      setArchivedTasks(storedArchivedTasks);
    };
    
    fetchTasks();
  }, []);

  function addTask(taskName: string, type: TaskType, authorName: string) {
    setTasks(taskService.addTask(tasks, taskName, type, authorName));
  }

  function updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    setTasks(taskService.updateTaskStatus(tasks, taskId, newStatus));
  }

  function archiveTask(task: Task) {
    const updatedTasks = tasks.filter(t => t.id !== task.id);
    const updatedArchivedTasks = [...archivedTasks, task];
    setTasks(updatedTasks);
    setArchivedTasks(updatedArchivedTasks);
    taskService.saveTasks(updatedTasks);
    taskService.saveArchivedTasks(updatedArchivedTasks);
  }

  function removeTask(taskId: string) {
    const taskToRemove = tasks.find(task => task.id === taskId);
    if (taskToRemove && taskToRemove.status === TaskStatus.Completed) {
      archiveTask(taskToRemove);
    } else {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      taskService.saveTasks(updatedTasks);
    }
  }

  function removeArchivedTask(taskId: string) {
    const updatedArchivedTasks = archivedTasks.filter(task => task.id !== taskId);
    setArchivedTasks(updatedArchivedTasks);
    taskService.saveArchivedTasks(updatedArchivedTasks);
  }

  return (
    <div className="App">
      <h1>Gestionnaire de tâches</h1>
      {showArchive ? (
        <ArchivePage archivedTasks={archivedTasks} removeArchivedTask={removeArchivedTask} />
      ) : (
        <>
          <TaskInput addTask={addTask} />
          <TaskBoard
            tasks={tasks}
            updateTaskStatus={updateTaskStatus}
            removeTask={removeTask}
            addSubTask={(taskId, subTaskName) =>
              setTasks(taskService.addSubTask(tasks, taskId, subTaskName))
            }
            updateSubTaskStatus={(taskId, subTaskId, newStatus) =>
              setTasks(taskService.updateSubTaskStatus(tasks, taskId, subTaskId, newStatus))
            }
            removeSubTask={(taskId, subTaskId) =>
              setTasks(taskService.removeSubTask(tasks, taskId, subTaskId))
            }
          />
          <button onClick={() => setShowArchive(true)} className="view-archive-button">
            Voir les tâches terminées
          </button>
        </>
      )}
      {showArchive && (
        <button onClick={() => setShowArchive(false)} className="view-archive-button">
          Retour à la liste
        </button>
      )}
    </div>
  );
}

export default App;
