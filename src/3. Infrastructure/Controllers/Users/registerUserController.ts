import { Request, Response, NextFunction } from "express";
import { RegisterUserUseCase } from "../../../User/2. UseCases/registerUser";
import { UserEntity } from "../../../User/1.Domain/user.entity";

export class RegisterUserController {
  constructor(private registerUseCase: RegisterUserUseCase) {}

  execute = (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName } = req.body;

    try {
      if (typeof firstName !== "string" || typeof lastName !== "string") {
        throw new Error("Invalid name or lastName");
      }

      //sacar a Factory
      const user: UserEntity = {
        id: 1000, // corregir
        firstName,
        lastName,
        topicSuscription: [],
        alerts: [],
      };
      this.registerUseCase.registerUser(user);
      return res.status(200).send("User registered");
    } catch (err: any) {
      err.status = 404;
      next(err);
    }
  };
}
