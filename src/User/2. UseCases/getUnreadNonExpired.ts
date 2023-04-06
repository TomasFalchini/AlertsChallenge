import { AlertEntity } from "../../Alerts/1.Domain/alert.entity";
import { UserRepository } from "../1.Domain/user.repository";

export interface GetUnreadNonExpiredUserAlertsUseCase {
  getUnreadNonExpiredUserAlerts: (userId: number) => AlertEntity[];
}

export class GetUnreadNonExpiredUserAlerts
  implements GetUnreadNonExpiredUserAlertsUseCase
{
  constructor(private userRepository: UserRepository) {}

  getUnreadNonExpiredUserAlerts(userId: number) {
    return this.userRepository.getUnreadNonExpiredUserAlerts(userId);
  }
}
