import { TopicName } from "../types";
import { AlertEntity } from "./alert.entity";

export interface TopicRepository {
  registerNewAlertTopic(topic: TopicName): void;
  getNonExpiredTopicAlerts(topic: TopicName): AlertEntity[];
}
