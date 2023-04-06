import { UserRepository } from "../1.Domain/user.repository";

export interface MarkAlertAsReadUseCase {
  markAlertAsRead: (alertId: number, userId: number) => void;
}

export class MarkAlertAsRead implements MarkAlertAsReadUseCase {
  constructor(private userRepository: UserRepository) {}

  markAlertAsRead(alertId: number, userId: number) {
    this.userRepository.markAlertAsRead(alertId, userId);
  }
}
