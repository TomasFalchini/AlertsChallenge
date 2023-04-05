import { AlertType, Topic } from "../types";

export interface AlertEntity {
  readonly id: number;
  type: AlertType;
  topic: Topic;
  expirationDate?: Date;
}
