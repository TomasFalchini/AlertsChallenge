import { AlertType } from "../../types";
import { AlertEntity } from "./alert.entity";

export function isAlertEntity(obj: any): obj is AlertEntity {
  return typeof obj?.description === "string";
}
