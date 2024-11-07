import React from 'react';
import { Task } from '../../models/Task';
import '../../../style/ArchivePage.css';

interface ArchivePageProps {
  archivedTasks: Task[];
  removeArchivedTask: (taskId: string) => void;
}

function ArchivePage({ archivedTasks, removeArchivedTask }: ArchivePageProps) {
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
                onClick={() => removeArchivedTask(task.id)}
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
}

export default ArchivePage;
