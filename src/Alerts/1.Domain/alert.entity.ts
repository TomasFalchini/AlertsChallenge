import { AlertType } from "../../types";

type userId = number;

export interface AlertEntity {
  readonly id: number;
  description: string;
  type: AlertType;
  expirationDate?: Date;
  isRead?: boolean;
  recipient?: userId;
}
