import { AlertEntity } from "../1.Domain/alert.entity";
import { AlertsRepository } from "../1.Domain/alerts.repository";
import TopicManager from "../../Topics/3. Infrastructure/topics.repository";

class AlertManager implements AlertsRepository {
  sendTopicAlertToAllSubscribers(topic: string, alert: AlertEntity): void {}

  sendTopicAlertToUser(
    topic: string,
    alert: AlertEntity,
    userId: number
  ): void {}

  /* private sortAlerts(alerts: AlertEntity[]): AlertEntity[] {
    const urgents = alerts.filter((alert) => alert.type === "Urgent");
    const informatives = alerts.filter((alert) => alert.type === "Informative");

    return [...urgents.reverse(), ...informatives];
  } */
}
