import { Topic } from "../types";
import { AlertEntity } from "./alert.entity";

export interface AlertsRepository {
  registerNewAlertTopic(topic: Topic): void;
  sendTopicAlertToAllSubscribers(topic: Topic, alert: AlertEntity): void;
  sendTopicAlertToUser(topic: Topic, alert: AlertEntity, userId: number): void;
  getNonExpiredTopicAlerts(topic: Topic): AlertEntity[];
}
