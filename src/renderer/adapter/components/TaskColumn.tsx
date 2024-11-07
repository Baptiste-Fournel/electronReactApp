import React, { memo } from 'react';
import { Task } from '../../models/Task';
import TaskItem from './TaskItem';
import '../../../style/TaskColumn.css';
import { TaskStatus } from '../../../constants/tasksEnum';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onAdvance?: (id: string) => void;
  onDelete?: (id: string) => void;
  addSubTask?: (taskId: string, subTaskName: string) => void;
  updateSubTaskStatus?: (taskId: string, subTaskId: string, newStatus: TaskStatus) => void;
  removeSubTask?: (taskId: string, subTaskId: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = memo(({ 
  title, 
  tasks, 
  onAdvance, 
  onDelete, 
  addSubTask, 
  updateSubTaskStatus, 
  removeSubTask 
}) => {
  return (
    <div className={`task-column ${title.replace(' ', '')}`}>
      <h2>{title}</h2>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onAdvance={onAdvance ? () => onAdvance(task.id) : undefined}
          onDelete={onDelete ? () => onDelete(task.id) : undefined}
          addSubTask={addSubTask ? (subTaskName) => addSubTask(task.id, subTaskName) : undefined}
          updateSubTaskStatus={
            updateSubTaskStatus
              ? (subTaskId, newStatus) =>
                  updateSubTaskStatus(task.id, subTaskId, newStatus as TaskStatus)
              : undefined
          }
          removeSubTask={
            removeSubTask ? (subTaskId) => removeSubTask(task.id, subTaskId) : undefined
          }
        />
      ))}
    </div>
  );
});

export default TaskColumn;
