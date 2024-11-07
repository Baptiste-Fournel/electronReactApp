import React from 'react';
import { Task } from '../../models/Task';
import TaskColumn from './TaskColumn';
import { TaskStatus } from '../../../constants/tasksEnum';
import '../../../style/TaskBoard.css';

interface TaskBoardProps {
  tasks: Task[];
  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  removeTask: (taskId: string) => void;
  addSubTask: (taskId: string, subTaskName: string) => void;
  updateSubTaskStatus: (taskId: string, subTaskId: string, newStatus: TaskStatus) => void;
  removeSubTask: (taskId: string, subTaskId: string) => void;
}

function TaskBoard({
  tasks,
  updateTaskStatus,
  removeTask,
  addSubTask,
  updateSubTaskStatus,
  removeSubTask,
}: TaskBoardProps) {
  return (
    <div className="task-board">
      <TaskColumn
        title="Non commencées"
        tasks={tasks.filter(task => task.status === TaskStatus.NotStarted)}
        onAdvance={(id) => updateTaskStatus(id, TaskStatus.InProgress)}
        onDelete={undefined}
        addSubTask={addSubTask}
        updateSubTaskStatus={updateSubTaskStatus}
        removeSubTask={removeSubTask}
      />
      <TaskColumn
        title="En cours"
        tasks={tasks.filter(task => task.status === TaskStatus.InProgress)}
        onAdvance={(id) => updateTaskStatus(id, TaskStatus.Completed)}
        onDelete={undefined}
        addSubTask={addSubTask}
        updateSubTaskStatus={updateSubTaskStatus}
        removeSubTask={removeSubTask}
      />
      <TaskColumn
        title="Terminées"
        tasks={tasks.filter(task => task.status === TaskStatus.Completed)}
        onAdvance={undefined}
        onDelete={removeTask}
        addSubTask={undefined}
        updateSubTaskStatus={updateSubTaskStatus}
        removeSubTask={removeSubTask}
      />
    </div>
  );
}

export default TaskBoard;
