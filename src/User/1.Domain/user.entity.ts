import { TopicName } from "../../types";
import { AlertEntity } from "../../Alerts/1.Domain/alert.entity";

export interface UserEntity {
  readonly id: number;
  firstName: string;
  lastName: string;
  topicSuscription: TopicName[];
  alerts: AlertEntity[];
}
