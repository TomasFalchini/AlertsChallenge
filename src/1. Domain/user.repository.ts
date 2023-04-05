import { TopicName } from "../types";
import { AlertEntity } from "./alert.entity";
import { UserEntity } from "./user.entity";

export interface UserRepository {
  registerUserForAlerts(user: UserEntity): void;
  updateUserTopicSubscription(id: number, topic: TopicName): void;
  markAlertAsRead(alertId: number): void;
  getUnreadNonExpiredUserAlerts(userId: number): AlertEntity[];
}
