import { Request, Response, NextFunction } from "express";
import { GetUnreadNonExpiredUserAlertsUseCase } from "../../../User/2. UseCases/getUnreadNonExpired";

export class GetUnreadNonExpiredController {
  constructor(
    private getUnreadNonExpired: GetUnreadNonExpiredUserAlertsUseCase
  ) {}

  execute = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;

    try {
      if (typeof userId !== "number") {
        throw new Error("Invalid userId. It must be a number");
      }

      const alerts =
        this.getUnreadNonExpired.getUnreadNonExpiredUserAlerts(userId);

      return res.status(200).send({ alerts });
    } catch (err: any) {
      err.status = 404;
      next(err);
    }
  };
}
