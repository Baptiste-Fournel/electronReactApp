import { machineIdSync } from 'node-machine-id';

export class AuthService {
  getMachineId(): string {
    try {
      return machineIdSync();
    } catch (error) {
      console.error("Échec de la récupération de l'ID machine:", error);
      return '';
    }
  }
}
