import { AlertEntity } from "../../Alerts/1.Domain/alert.entity";
import { TopicName } from "../../types";
import { UserEntity } from "./user.entity";

export interface UserRepository {
  registerUserForAlerts(user: UserEntity): void;
  updateUserTopicSubscription(id: number, topic: TopicName): void;
  markAlertAsRead(alertId: number, userId: number): void;
  getUnreadNonExpiredUserAlerts(userId: number): AlertEntity[];
}
