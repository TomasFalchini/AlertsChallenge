import { TopicName } from "../types";
import { AlertEntity } from "./alert.entity";

export interface AlertsRepository {
  sendTopicAlertToAllSubscribers(topic: TopicName, alert: AlertEntity): void;
  sendTopicAlertToUser(
    topic: TopicName,
    alert: AlertEntity,
    userId: number
  ): void;
}
