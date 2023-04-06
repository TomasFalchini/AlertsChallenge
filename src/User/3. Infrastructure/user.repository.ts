import { AlertEntity } from "../../Alerts/1.Domain/alert.entity";
import { UserEntity } from "../1.Domain/user.entity";
import { UserRepository } from "../1.Domain/user.repository";


class UserManager implements UserRepository {
  private users: UserEntity[] = [];

  registerUserForAlerts(user: UserEntity) {
    this.users.push(user);
    return;
  }

  updateUserTopicSubscription(id: number, topic: string) {
    const user = this.users.find((user: UserEntity) => user.id === id);
    if (user) {
      user.topicSuscription.push(topic);
    }
    return;
  }

  markAlertAsRead(alertId: number, userId: number) {
    const user = this.users.find((users) => users.id === userId);
    if (!user) return;
    const alert = user.alerts.find((alerts) => alerts.id === alertId);
    if (!alert) return;
    alert.isRead = true;
    return;
  }

  getUnreadNonExpiredUserAlerts(userId: number): AlertEntity[] {
    const user = this.users.find((users) => users.id === userId);
    if (user) {
      return user.alerts.filter((alerts) => {
        if (alerts.isRead) return false;
        if (alerts.expirationDate && alerts.expirationDate <= new Date())
          return false;

        return true;
      });
    }
    return [];
  }
}

export default UserManager;
