import { TaskStatus, TaskType } from '../../constants/tasksEnum';


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
  