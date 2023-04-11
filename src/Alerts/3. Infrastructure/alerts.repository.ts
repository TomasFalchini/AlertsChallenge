import { AlertEntity } from "../1.Domain/alert.entity";
import { AlertsRepository } from "../1.Domain/alerts.repository";
import topicsRepository from "../../Topics/3. Infrastructure/topics.repository";
import userRepository from "../../User/3. Infrastructure/user.repository";
import { AlertType } from "../../types";

class AlertManager implements AlertsRepository {
  private topicsManager = topicsRepository;
  private usersManager = userRepository;

  sendTopicAlertToAllSubscribers(topic: string, alert: AlertEntity): void {
    const top = this.topicsManager.getTopic(topic);

    if (!top) return;
    const alertToUser = { ...alert };
    const alertToTopic = { ...alert };
    if (alert.type === AlertType.Urgente) {
      top.alerts.unshift(alertToTopic);
    } else {
      top.alerts.push(alertToTopic);
    }

    const users = this.usersManager.getUsers();
    users.forEach((user) => {
      if (user.topicSuscription.includes(topic)) {
        if (alert.type === AlertType.Urgente) {
          user.alerts.unshift(alertToUser);
        } else {
          user.alerts.push(alertToUser);
        }
      }
    });

    return;
  }

  sendTopicAlertToUser(
    topic: string,
    alert: AlertEntity,
    userId: number
  ): void {
    const user = this.usersManager.getUser(userId);
    if (!user) return;

    if (!user.topicSuscription.includes(topic)) return;

    const top = this.topicsManager.getTopic(topic);

    if (!top) return;

    alert.recipient = userId;

    if (alert.type === AlertType.Urgente) {
      top.alerts.unshift(alert);
      user.alerts.unshift(alert);
    } else {
      top.alerts.push(alert);
      user.alerts.push(alert);
    }

    return;
  }
}

export default AlertManager;
