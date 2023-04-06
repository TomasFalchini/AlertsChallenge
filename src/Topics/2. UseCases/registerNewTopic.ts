import { TopicEntity } from "../1.Domain/topic.entity";
import { TopicRepository } from "../1.Domain/topic.repository";

export interface RegisterNewAlertTopicUseCase {
  registerNewAlertTopic: (topic: TopicEntity) => void;
}

export class RegisterNewAlertTopic implements RegisterNewAlertTopicUseCase {
  constructor(private topicRepository: TopicRepository) {}

  registerNewAlertTopic(topic: TopicEntity) {
    this.topicRepository.registerNewAlertTopic(topic);
  }
}
