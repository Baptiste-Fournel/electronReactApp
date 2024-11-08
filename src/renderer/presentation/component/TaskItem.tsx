import React, { useState } from 'react';
import { Task } from '../../domain/models/Task';
import { TaskStatus, TaskType } from '../../domain/enums/tasksEnum';
import '../style/TaskItem.css';
import { taskTypeTranslations } from '../../domain/enums/tasksTranslations';

interface TaskItemProps {
  task: Task;
  onAdvance?: () => void;
  onDelete?: () => void;
  addSubTask?: (subTaskName: string) => void;
  updateSubTaskStatus?: (subTaskId: string, newStatus: TaskStatus) => void;
  removeSubTask?: (subTaskId: string) => void;
}

function TaskItem({
  task,
  onAdvance,
  onDelete,
  addSubTask,
  updateSubTaskStatus,
  removeSubTask,
}: TaskItemProps) {
  const [newSubTaskName, setNewSubTaskName] = useState('');

  const handleAddSubTask = () => {
    if (addSubTask && newSubTaskName.trim()) {
      addSubTask(newSubTaskName.trim());
      setNewSubTaskName('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddSubTask();
    }
  };

  return (
    <div className="task-item">
      <div className="task-content">
        <span className="task-name">{task.name}</span>
        {onAdvance && <button onClick={onAdvance} className="advance-button">➕</button>}
        {onDelete && <button onClick={onDelete} className="delete-button">❌</button>}
      </div>
      <div className="task-details">
        <p className="task-category">
          Catégorie : {task.type ? taskTypeTranslations[task.type] : 'Non spécifiée'}
        </p>
        <p className="task-author">Créé par : {task.authorId}</p>
      </div>
      {task.subTasks && (
        <div className="subtasks">
          {task.subTasks.map(subTask => (
            <div key={subTask.id} className="subtask-item">
              <span className="subtask-name">{subTask.name}</span>
              {removeSubTask && (
                <button
                  onClick={() => removeSubTask(subTask.id)}
                  className="subtask-delete-button"
                >
                  🗑️
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="add-subtask">
        <input
          type="text"
          value={newSubTaskName}
          onChange={(e) => setNewSubTaskName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ajouter une sous-tâche..."
          className="subtask-input"
        />
      </div>
    </div>
  );
}

export default TaskItem;
