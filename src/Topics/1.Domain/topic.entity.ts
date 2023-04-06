import { TopicName } from "../../types";
import { AlertEntity } from "../../Alerts/1.Domain/alert.entity";

export interface TopicEntity {
  name: TopicName;
  alerts: AlertEntity[];
}
