import { Request, Response, NextFunction } from "express";
import { MarkAlertAsReadUseCase } from "../../../User/2. UseCases/markAlertAsRead";
import { Controller } from "../ControllersInterface";

export class MarkAlertAsReadController implements Controller {
  constructor(private markAlertUseCase: MarkAlertAsReadUseCase) {}

  execute = (req: Request, res: Response, next: NextFunction) => {
    const { alertId, userId } = req.body;

    try {
      if (typeof alertId !== "number" || typeof userId !== "number") {
        throw new Error("Invalid ID");
      }
      this.markAlertUseCase.markAlertAsRead(alertId, userId);
      return res.status(200).send({ result: "Alert mark as read" });
    } catch (err: any) {
      err.status = 404;
      next(err);
    }
  };
}
