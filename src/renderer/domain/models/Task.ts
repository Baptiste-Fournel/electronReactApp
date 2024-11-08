import { TaskStatus, TaskType } from '../enums/tasksEnum';


export interface Task {
    id: string;
    name: string;
    status: TaskStatus;
    subTasks?: SubTask[]; 
    type?: TaskType;
    authorId?: string;
  }

  export interface SubTask {
    id: string;
    name: string;
    status: TaskStatus;
  }
  