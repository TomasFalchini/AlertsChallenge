import { AlertType } from "../types";

type userId = number;

export interface AlertEntity {
  readonly id: number;
  type: AlertType;
  expirationDate?: Date;
  isRead?: boolean;
  recipient?: userId;
}
