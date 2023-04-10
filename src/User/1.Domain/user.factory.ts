import { UserEntity } from "./user.entity";

class UserFactory {
  private static instance: UserFactory;
  private idCounter = 0;

  private constructor() {}

  static getInstance(): UserFactory {
    if (!UserFactory.instance) {
      UserFactory.instance = new UserFactory();
    }
    return UserFactory.instance;
  }

  createUser(firstName: string, lastName: string): UserEntity {
    const user: UserEntity = {
      id: ++this.idCounter,
      firstName,
      lastName,
      topicSuscription: [],
      alerts: [],
    };
    return user;
  }
}

export default UserFactory.getInstance();
