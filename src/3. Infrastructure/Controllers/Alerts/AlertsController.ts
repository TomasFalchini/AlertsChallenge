import { Request, Response, NextFunction } from "express";
import { SendTopicAlertToAllSubscribersUseCase } from "../../../Alerts/2. UseCases/sendTopicAlertToAll";
import { SendTopicAlertToUserUseCase } from "../../../Alerts/2. UseCases/sendTopicAlertToUser";
import { AlertEntity } from "../../../Alerts/1.Domain/alert.entity";
import { isAlertEntity } from "../../../Alerts/1.Domain/isAlertEntity";
import { Controller } from "../ControllersInterface";
import alertFactory from "../../../Alerts/1.Domain/alert.factory";

export class AlertsController implements Controller {
  private alertFactory = alertFactory;

  constructor(
    private sendTopicAlertToAll: SendTopicAlertToAllSubscribersUseCase,
    private sendTopicAlertToUser: SendTopicAlertToUserUseCase
  ) {}

  execute = (req: Request, res: Response, next: NextFunction) => {
    const { topic, alert, userId } = req.body;

    try {
      if (typeof topic !== "string") {
        throw new Error("Invalid name");
      }

      if (!isAlertEntity(alert)) {
        throw new Error("Invalid Alert");
      }

      const Alert: AlertEntity = alertFactory.createAlert(
        alert.description,
        alert.type,
        alert.recipient,
        alert.expirationDate,
        alert.isRead
      );

      if (userId) {
        this.sendTopicAlertToUser.sendTopicAlertToUser(topic, Alert, userId);
      } else {
        this.sendTopicAlertToAll.sendTopicAlertToAllSubscribers(topic, Alert);
      }

      return res.status(200).send({ result: "The alert has been sent" });
    } catch (err: any) {
      err.status = 404;
      next(err);
    }
  };
}
