import { AlertEntity } from "../../Alerts/1.Domain/alert.entity";
import { TopicName } from "../../types";
import { TopicEntity } from "./topic.entity";

export interface TopicRepository {
  registerNewAlertTopic(topic: TopicEntity): void;
  getNonExpiredTopicAlerts(topic: TopicName): AlertEntity[];
}
