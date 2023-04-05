import { AlertEntity } from "../../1. Domain/alert.entity";
import { AlertsRepository } from "../../1. Domain/alerts.repository";

class AlertManager implements AlertsRepository {
  sendTopicAlertToAllSubscribers(topic: string, alert: AlertEntity): void {}

  sendTopicAlertToUser(
    topic: string,
    alert: AlertEntity,
    userId: number
  ): void {}
}
