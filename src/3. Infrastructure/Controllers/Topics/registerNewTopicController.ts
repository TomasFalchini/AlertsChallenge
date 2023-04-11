import { Request, Response, NextFunction } from "express";
import { RegisterNewAlertTopicUseCase } from "../../../Topics/2. UseCases/registerNewTopic";
import { TopicEntity } from "../../../Topics/1.Domain/topic.entity";
import { Controller } from "../ControllersInterface";

export class RegisterNewTopicController implements Controller {
  constructor(private registerNewTopic: RegisterNewAlertTopicUseCase) {}

  execute = (req: Request, res: Response, next: NextFunction) => {
    const { topicName } = req.body;

    try {
      if (typeof topicName !== "string") {
        throw new Error("Invalid name");
      }
      const topic: TopicEntity = { name: topicName, alerts: [] };

      this.registerNewTopic.registerNewAlertTopic(topic);

      return res.status(200).send({ result: "New topic created" });
    } catch (err: any) {
      err.status = 404;
      next(err);
    }
  };
}
