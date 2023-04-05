import { UserEntity } from "../../1. Domain/user.entity";
import { UserRepository } from "../../1. Domain/user.repository";

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

  markAlertAsRead(alertId: number) {}
}
