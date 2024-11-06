import React from 'react';
import { Task } from '../../models/Task';
import TaskItem from './TaskItem';
import '../../../style/TaskColumn.css';


interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onAdvance?: (id: string) => void;
  onDelete?: (id: string) => void;
}

function TaskColumn({ title, tasks, onAdvance, onDelete }: TaskColumnProps) {
  return (
    <div className="task-column">
      <h2>{title}</h2>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onAdvance={onAdvance ? () => onAdvance(task.id) : () => {}}
          onDelete={onDelete ? () => onDelete(task.id) : () => {}}
        />
      ))}
    </div>
  );
}

export default TaskColumn;
