import { machineIdSync } from 'node-machine-id';

export class AuthService {
  getMachineId(): string {
    return machineIdSync();
  }
}
