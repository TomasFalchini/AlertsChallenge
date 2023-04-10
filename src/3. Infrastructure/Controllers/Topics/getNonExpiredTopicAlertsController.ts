import { Request, Response, NextFunction } from "express";
import { GetNonExpiredTopicAlertsUseCase } from "../../../Topics/2. UseCases/getNonExpiredTopicAlerts";
import { Controller } from "../ControllersInterface";

export class GetNonExpiredTopicAlertsController implements Controller {
  constructor(
    private getNonExpiredTopicAlerts: GetNonExpiredTopicAlertsUseCase
  ) {}

  execute = (req: Request, res: Response, next: NextFunction) => {
    const { topicName } = req.body;

    try {
      if (typeof topicName !== "string") {
        throw new Error("Invalid name");
      }
      const alerts =
        this.getNonExpiredTopicAlerts.getNonExpiredTopicAlerts(topicName);

      return res.status(200).send({ alerts });
    } catch (err: any) {
      err.status = 404;
      next(err);
    }
  };
}
