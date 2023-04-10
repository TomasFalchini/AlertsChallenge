import { Request, Response, NextFunction } from "express";

export interface Controller {
  execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | undefined;
}
