import { TaskStatus } from '../../constants/tasksEnum';
import { TaskType } from '../../constants/taskType';
import { SubTask } from '../models/SubTask';


export interface Task {
    id: string;
    name: string;
    status: TaskStatus;
    subTasks?: SubTask[]; 
    type?: TaskType;
    authorId?: string;
  }
  