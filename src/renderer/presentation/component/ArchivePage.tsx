import React from 'react';
import { useTasks } from '../../application/context/TaskContext';
import '../style/ArchivePage.css';

const ArchivePage: React.FC = () => {
  const { archivedTasks, removeArchivedTask } = useTasks();

  const handleDelete = async (taskId: string) => {
    await removeArchivedTask(taskId);
  };

  return (
    <div className="archive-page">
      <h2>Tâches archivées</h2>
      {archivedTasks.length === 0 ? (
        <p>Aucune tâche archivée.</p>
      ) : (
        archivedTasks.map(task => (
          <div key={task.id} className="archived-task">
            <div className="archived-task-header">
              <h3>{task.name}</h3>
              <button
                onClick={() => handleDelete(task.id)}
                className="delete-archive-button"
                title="Supprimer la tâche archivée"
              >
                🗑️
              </button>
            </div>
            <p>Catégorie : {task.type}</p>
            <p>Créé par : {task.authorId}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ArchivePage;
