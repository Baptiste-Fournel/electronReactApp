import React from 'react';
import { Task, SubTask } from '../../models/Task';
import { TaskStatus } from '../../../constants/tasksEnum';
import '../../../style/TaskItem.css';

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
  return (
    <div className="task-item">
      <span>{task.name}</span>
      {onAdvance && <button onClick={onAdvance} className="advance-button">➕</button>}
      {onDelete && <button onClick={onDelete} className="delete-button">❌</button>}
      
      {task.subTasks && (
        <div className="subtasks">
          {task.subTasks.map(subTask => (
            <div key={subTask.id} className="subtask-item">
              <span>{subTask.name}</span>
              {updateSubTaskStatus && (
                <button
                  onClick={() => updateSubTaskStatus(subTask.id, TaskStatus.InProgress)}
                  className="advance-button"
                >➕</button>
              )}
              {removeSubTask && (
                <button
                  onClick={() => removeSubTask(subTask.id)}
                  className="delete-button"
                >❌</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskItem;
