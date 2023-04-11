import { AlertType } from "../../types";
import { AlertEntity } from "./alert.entity";

class AlertFactory {
  private static instance: AlertFactory;
  private idCounter = 0;

  private constructor() {}

  static getInstance(): AlertFactory {
    if (!AlertFactory.instance) {
      AlertFactory.instance = new AlertFactory();
    }
    return AlertFactory.instance;
  }

  createAlert(
    description: string,
    type: AlertType,
    recipient: number | undefined,
    expirationDate: Date | undefined,
    isRead: boolean | undefined
  ): AlertEntity {
    const alert: AlertEntity = {
      id: ++this.idCounter,
      type,
      description,
      recipient,
      expirationDate,
      isRead,
    };
    return alert;
  }
}

export default AlertFactory.getInstance();
