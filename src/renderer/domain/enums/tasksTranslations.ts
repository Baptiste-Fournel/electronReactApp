import { TaskStatus, TaskType } from "./tasksEnum";

export const taskTypeTranslations: { [key in TaskType]: string } = {
    [TaskType.Personal]: 'Personnel',
    [TaskType.Work]: 'Travail',
    [TaskType.Family]: 'Famille',
  };
  
  export const taskStatusTranslations: { [key in TaskStatus]: string } = {
    [TaskStatus.NotStarted]: 'Non commencée',
    [TaskStatus.InProgress]: 'En cours',
    [TaskStatus.Completed]: 'Terminée',
  };