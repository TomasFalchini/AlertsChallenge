import { AlertEntity } from "./alert.entity";

export function isAlertEntity(obj: any): obj is AlertEntity {
  return typeof obj?.id === "number" && typeof obj?.type === "string";
}
