import { Request, Response, NextFunction } from "express";
import { UpdateUserTopicSubscriptionUseCase } from "../../../User/2. UseCases/updateUserTopic";
import { Controller } from "../ControllersInterface";

export class UpdateUserTopicController implements Controller {
  constructor(private updateUserTopic: UpdateUserTopicSubscriptionUseCase) {}

  execute = (req: Request, res: Response, next: NextFunction) => {
    const { userId, topic } = req.body;
    try {
      if (typeof userId !== "number" || typeof topic !== "string") {
        throw new Error(
          "Invalid ID or topicName, ID must be a number and topic must be a string"
        );
      }
      this.updateUserTopic.updateUserTopicSubscription(userId, topic);
      return res.status(200).send({
        result: `The user with ID = ${userId} has been suscribed to the topic: ${topic}`,
      });
    } catch (err: any) {
      err.status = 404;
      next(err);
    }
  };
}
