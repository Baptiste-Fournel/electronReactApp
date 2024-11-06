import React from 'react';
import { Task } from '../../models/Task';
import { TaskStatus } from '../../../constants/tasksEnum';
import '../../../style/TaskItem.css';

interface TaskItemProps {
  task: Task;
  onAdvance: () => void;
  onDelete: () => void;
}

function TaskItem({ task, onAdvance, onDelete }: TaskItemProps) {
  return (
    <div className="task-item">
      <span>{task.name}</span>
      
      {(task.status === TaskStatus.NotStarted || task.status === TaskStatus.InProgress) && (
        <button onClick={onAdvance} className="advance-button">➕</button>
      )}
      
      {task.status === TaskStatus.Completed && (
        <button onClick={onDelete} className="delete-button">❌</button>
      )}
    </div>
  );
}

export default TaskItem;
