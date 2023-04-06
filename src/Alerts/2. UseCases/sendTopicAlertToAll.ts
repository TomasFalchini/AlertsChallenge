import { TopicName } from "../../types";
import { AlertEntity } from "../1.Domain/alert.entity";
import { AlertsRepository } from "../1.Domain/alerts.repository";

export interface SendTopicAlertToAllSubscribersUseCase {
  sendTopicAlertToAllSubscribers: (
    topic: TopicName,
    alert: AlertEntity
  ) => void;
}

export class SendTopicAlertToAllSubscribers
  implements SendTopicAlertToAllSubscribersUseCase
{
  constructor(private alertsRepository: AlertsRepository) {}

  sendTopicAlertToAllSubscribers(topic: TopicName, alert: AlertEntity) {
    this.alertsRepository.sendTopicAlertToAllSubscribers(topic, alert);
  }
}
