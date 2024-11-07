import React from 'react';
import { Task } from '../../models/Task';
import { TaskStatus } from '../../../constants/tasksEnum';
import '../../../style/TaskItem.css';

interface TaskItemProps {
  task: Task;
  onAdvance?: () => void;
  onDelete?: () => void;
  addSubTask?: (subTaskName: string) => void;
  updateSubTaskStatus?: (subTaskId: string, newStatus: string) => void;
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
  return (
    <div className="task-item">
      <span>{task.name}</span>
      {onAdvance && <button onClick={onAdvance}>➕</button>}
      {onDelete && <button onClick={onDelete}>❌</button>}  
    </div>
  );
}

export default TaskItem;

