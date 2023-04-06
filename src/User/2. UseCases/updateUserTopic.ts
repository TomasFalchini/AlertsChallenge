import { TopicName } from "../../types";
import { UserRepository } from "../1.Domain/user.repository";

export interface UpdateUserTopicSubscriptionUseCase {
  updateUserTopicSubscription: (id: number, topic: TopicName) => void;
}

export class UpdateUserTopicSubscription
  implements UpdateUserTopicSubscriptionUseCase
{
  constructor(private userRepository: UserRepository) {}

  updateUserTopicSubscription(id: number, topic: TopicName) {
    this.userRepository.updateUserTopicSubscription(id, topic);
  }
}
