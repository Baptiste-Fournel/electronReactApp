import { IArchiveRepository } from '../../domain/interface/IArchiveRepository';
import { Task } from '../../domain/models/Task';

export class ArchiveService {
  constructor(private archiveRepository: IArchiveRepository) {}

  async getArchivedTasks(): Promise<Task[]> {
    return await this.archiveRepository.loadArchivedTasks();
  }

  async archiveTask(task: Task): Promise<void> {
    const archivedTasks = await this.getArchivedTasks();
    archivedTasks.push(task);
    await this.archiveRepository.saveArchivedTasks(archivedTasks);
  }

  async removeArchivedTask(taskId: string): Promise<void> {
    await this.archiveRepository.removeArchivedTask(taskId);
  }
}
