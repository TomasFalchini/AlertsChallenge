import { TopicName } from "../../types";
import { AlertEntity } from "../1.Domain/alert.entity";
import { AlertsRepository } from "../1.Domain/alerts.repository";

export interface SendTopicAlertToUserUseCase {
  sendTopicAlertToUser: (
    topic: TopicName,
    alert: AlertEntity,
    userId: number
  ) => void;
}

export class SendTopicAlertToUser implements SendTopicAlertToUserUseCase {
  constructor(private alertsRepository: AlertsRepository) {}

  sendTopicAlertToUser(topic: TopicName, alert: AlertEntity, userId: number) {
    this.alertsRepository.sendTopicAlertToUser(topic, alert, userId);
  }
}
