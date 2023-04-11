import { Request, Response, NextFunction } from "express";
import { RegisterUserUseCase } from "../../../User/2. UseCases/registerUser";
import { UserEntity } from "../../../User/1.Domain/user.entity";
import { Controller } from "../ControllersInterface";
import UserFactory from "../../../User/1.Domain/user.factory";

export class RegisterUserController implements Controller {
  private userFactory = UserFactory;

  constructor(private registerUseCase: RegisterUserUseCase) {}

  execute = (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName } = req.body;

    try {
      if (typeof firstName !== "string" || typeof lastName !== "string") {
        throw new Error("Invalid name or lastName");
      }

      const user: UserEntity = this.userFactory.createUser(firstName, lastName);
      this.registerUseCase.registerUser(user);
      return res
        .status(200)
        .send({ result: `User registered with ID: ${user.id}` });
    } catch (err: any) {
      err.status = 404;
      next(err);
    }
  };
}
