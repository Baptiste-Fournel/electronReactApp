import React, { useState } from 'react';
import '../../../style/TaskInput.css';

interface TaskInputProps {
  addTask: (taskName: string) => void;
}

function TaskInput({ addTask }: TaskInputProps) {
  const [input, setInput] = useState('');

  function handleAddTask() {
    if (input.trim() !== '') {
      addTask(input.trim());
      setInput('');
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
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Kestu veux faire"
      />
      <button onClick={handleAddTask}>Ajouter +</button>
    </div>
  );
}

export default TaskInput;
