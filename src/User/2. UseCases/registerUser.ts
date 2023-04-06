import { UserEntity } from "../1.Domain/user.entity";
import { UserRepository } from "../1.Domain/user.repository";

export interface RegisterUserUseCase {
  registerUser: (user: UserEntity) => void;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  registerUser(user: UserEntity) {
    this.userRepository.registerUserForAlerts(user);
  }
}
