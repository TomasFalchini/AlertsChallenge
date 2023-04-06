import { AlertEntity } from "../../Alerts/1.Domain/alert.entity";
import { TopicRepository } from "../1.Domain/topic.repository";

export interface GetNonExpiredTopicAlertsUseCase {
  getNonExpiredTopicAlerts: (topicName: string) => AlertEntity[];
}

export class GetNonExpiredTopicAlerts
  implements GetNonExpiredTopicAlertsUseCase
{
  constructor(private topicRepository: TopicRepository) {}

  getNonExpiredTopicAlerts(topicName: string) {
    return this.topicRepository.getNonExpiredTopicAlerts(topicName);
  }
}
