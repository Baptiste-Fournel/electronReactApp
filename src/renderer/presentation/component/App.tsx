import React, { useState } from 'react';
import '../style/App.css';
import TaskBoard from './TaskBoard';
import TaskInput from './TaskInput';
import ArchivePage from './ArchivePage';
import { TaskProvider, useTasks } from '../../application/context/TaskContext';

const App = () => {
  const { 
    tasks, 
    addTask, 
    updateTaskStatus, 
    removeTask, 
    archiveTask, 
    addSubTask, 
    updateSubTaskStatus, 
    removeSubTask, 
    loadArchivedTasks 
  } = useTasks();

  const [showArchive, setShowArchive] = useState(false);

  const handleLoadArchivedTasks = async () => {
    await loadArchivedTasks();
    setShowArchive(true);
  };

  return (
    <div className="App">
      <h1>Gestionnaire de tâches</h1>
      {!showArchive ? (
        <>
          <TaskInput addTask={addTask} />
          <TaskBoard
            tasks={tasks}
            updateTaskStatus={updateTaskStatus}
            removeTask={removeTask}
            archiveTask={archiveTask}
            addSubTask={addSubTask}
            updateSubTaskStatus={updateSubTaskStatus}
            removeSubTask={removeSubTask}
          />
          <button onClick={handleLoadArchivedTasks} className="view-archive-button">
            Voir les tâches terminées
          </button>
        </>
      ) : (
        <ArchivePage />
      )}
      {showArchive && (
        <button onClick={() => setShowArchive(false)} className="back-button">
          Retour aux tâches en cours
        </button>
      )}
    </div>
  );
};

const AppContainer = () => (
  <TaskProvider>
    <App />
  </TaskProvider>
);

export default AppContainer;
