import React, { useState } from 'react';
import '../../../style/TaskInput.css';
import { TaskType } from '../../../constants/tasksEnum';
import { taskTypeTranslations } from '../../../constants/tasksTranslations';

interface TaskInputProps {
  addTask: (taskName: string, type: TaskType, authorName: string) => void;
}

function TaskInput({ addTask }: TaskInputProps) {
  const [taskName, setTaskName] = useState('');
  const [type, setType] = useState<TaskType>(TaskType.Personal);
  const [authorName, setAuthorName] = useState('');
  const [error, setError] = useState(false);

  function handleAddTask() {
    if (taskName.trim() && authorName.trim()) {
      addTask(taskName.trim(), type, authorName.trim());
      setTaskName('');
      setAuthorName('');
      setError(false);
    } else {
      setError(true);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  }

  return (
    <div className="task-input">
      <input
        type="text"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nom de la tâche"
        className="task-input-field"
      />
      <select
        value={type}
        onChange={(event) => setType(event.target.value as TaskType)}
        className="task-select"
      >
        <option value={TaskType.Personal}>{taskTypeTranslations[TaskType.Personal]}</option>
        <option value={TaskType.Work}>{taskTypeTranslations[TaskType.Work]}</option>
        <option value={TaskType.Family}>{taskTypeTranslations[TaskType.Family]}</option>
      </select>
      <input
        type="text"
        value={authorName}
        onChange={(event) => setAuthorName(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nom de l'auteur"
        className="task-input-field"
      />
      <button onClick={handleAddTask} className="add-task-button">Ajouter +</button>
      {error && <p className="error-message">Veuillez remplir tous les champs.</p>}
    </div>
  );
}

export default TaskInput;

