import React, { useState } from 'react';
import '../style/TaskInput.css';
import { TaskType } from '../../domain/enums/tasksEnum';

interface TaskInputProps {
  addTask: (taskName: string, type: TaskType, authorId: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ addTask }) => {
  const [taskName, setTaskName] = useState('');
  const [type, setType] = useState<TaskType>(TaskType.Personal);
  const [authorId, setAuthorId] = useState('');

  const handleAddTask = () => {
    if (taskName.trim() !== '' && authorId.trim() !== '') {
      addTask(taskName.trim(), type, authorId.trim());
      setTaskName('');
      setAuthorId('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="task-input">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nom de la tâche"
        className="task-input-field"
      />

      <div className="task-select-container">
        <select 
          value={type}
          onChange={(e) => setType(e.target.value as TaskType)}
          className="task-select"
        >
          <option value={TaskType.Personal}>Personnel</option>
          <option value={TaskType.Work}>Travail</option>
          <option value={TaskType.Family}>Famille</option>
        </select>
        <span className="task-select-arrow">▼</span>
      </div>

      <input
        type="text"
        value={authorId}
        onChange={(e) => setAuthorId(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nom de l'auteur"
        className="task-input-field"
      />

      <button onClick={handleAddTask} className="add-task-button">
        Ajouter
      </button>
    </div>
  );
};

export default TaskInput;
