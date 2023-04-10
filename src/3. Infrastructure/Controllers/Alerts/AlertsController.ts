import { Request, Response, NextFunction } from "express";
import { SendTopicAlertToAllSubscribersUseCase } from "../../../Alerts/2. UseCases/sendTopicAlertToAll";
import { SendTopicAlertToUserUseCase } from "../../../Alerts/2. UseCases/sendTopicAlertToUser";
import { AlertEntity } from "../../../Alerts/1.Domain/alert.entity";
import { isAlertEntity } from "../../../Alerts/1.Domain/isAlertEntity";
import { Controller } from "../ControllersInterface";

export class GetNonExpiredTopicAlertsController implements Controller {
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

      if (userId) {
        this.sendTopicAlertToUser.sendTopicAlertToUser(topic, alert, userId);
      } else {
        this.sendTopicAlertToAll.sendTopicAlertToAllSubscribers(topic, alert);
      }

      return res.status(200).send("The alert has been sent");
    } catch (err: any) {
      err.status = 404;
      next(err);
    }
  };
}
