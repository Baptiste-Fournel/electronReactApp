import React from 'react';
import TaskColumn from './TaskColumn';
import '../style/TaskBoard.css';
import { TaskStatus } from '../../domain/enums/tasksEnum';
import { Task } from '../../domain/models/Task';

interface TaskBoardProps {
  tasks: Task[];
  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => Promise<void>;
  removeTask: (taskId: string) => Promise<void>;
  archiveTask: (taskId: string) => Promise<void>;
  addSubTask: (taskId: string, subTaskName: string) => void;
  updateSubTaskStatus: (taskId: string, subTaskId: string, newStatus: TaskStatus) => void;
  removeSubTask: (taskId: string, subTaskId: string) => void;
}

function TaskBoard({
  tasks,
  updateTaskStatus,
  removeTask,
  archiveTask,
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
        onDelete={(id) => archiveTask(id)} 
        addSubTask={undefined}
        updateSubTaskStatus={updateSubTaskStatus}
        removeSubTask={removeSubTask}
      />
    </div>
  );
}

export default TaskBoard;
