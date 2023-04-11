import { Request, Response, NextFunction } from "express";
import { GetUnreadNonExpiredUserAlertsUseCase } from "../../../User/2. UseCases/getUnreadNonExpired";
import { Controller } from "../ControllersInterface";

export class GetUnreadNonExpiredController implements Controller {
  constructor(
    private getUnreadNonExpired: GetUnreadNonExpiredUserAlertsUseCase
  ) {}

  execute = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.query;

    try {
      if (typeof userId !== "string") {
        throw new Error("Invalid Request");
      }

      if (typeof parseInt(userId) !== "number") {
        throw new Error("Invalid userId. It must be a number");
      }

      const alerts = this.getUnreadNonExpired.getUnreadNonExpiredUserAlerts(
        parseInt(userId)
      );

      return res.status(200).send({ alerts });
    } catch (err: any) {
      err.status = 404;
      next(err);
    }
  };
}
