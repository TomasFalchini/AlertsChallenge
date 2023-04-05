import { TopicName } from "../types";
import { AlertEntity } from "./alert.entity";

export interface TopicEntity {
  name: TopicName;
  alerts: AlertEntity[];
}
