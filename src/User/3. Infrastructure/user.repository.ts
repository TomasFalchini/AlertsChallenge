import { AlertEntity } from "../../Alerts/1.Domain/alert.entity";
import { UserEntity } from "../1.Domain/user.entity";
import { UserRepository } from "../1.Domain/user.repository";

class UserManager implements UserRepository {
  private static instance: UserManager;
  private users: UserEntity[] = [];

  private constructor() {}

  static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  getUser(userId: number) {
    return this.users.find((u) => u.id === userId);
  }

  getUsers() {
    return this.users;
  }

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
        if (
          alerts.expirationDate &&
          new Date(alerts.expirationDate) <= new Date()
        ) {
          return false;
        }

        return true;
      });
    }
    return [];
  }

  cleanTest() {
    this.users = [];
  }
}

export default UserManager.getInstance();
