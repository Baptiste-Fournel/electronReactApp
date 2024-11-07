import React, { useState } from 'react';
import '../../../style/TaskInput.css';
import { TaskType } from '../../../constants/tasksEnum';

interface TaskInputProps {
  addTask: (taskName: string, type: TaskType, authorId: string) => void;
}

function TaskInput({ addTask }: TaskInputProps) {
  const [taskName, setTaskName] = useState('');
  const [type, setType] = useState<TaskType>(TaskType.Personal);
  const [authorId, setAuthorId] = useState(''); 

  function handleAddTask() {
    if (taskName.trim() !== '' && authorId.trim() !== '') {
      addTask(taskName.trim(), type, authorId.trim());
      setTaskName('');
      setAuthorId('');
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
      />
      <select value={type} onChange={(event) => setType(event.target.value as TaskType)}>
        <option value={TaskType.Personal}>Personnel</option>
        <option value={TaskType.Work}>Travail</option>
        <option value={TaskType.Family}>Famille</option>
      </select>
      <input
        type="text"
        value={authorId}
        onChange={(event) => setAuthorId(event.target.value)}
        placeholder="ID de l'auteur"
      />
      <button onClick={handleAddTask}>Ajouter +</button>
    </div>
  );
}

export default TaskInput;

