import { AlertEntity } from "../../1. Domain/alert.entity";
import { TopicEntity } from "../../1. Domain/topic.entity";
import { TopicRepository } from "../../1. Domain/topic.repository";

class TopicManager implements TopicRepository {
  private topics: TopicEntity[] = [];

  registerNewAlertTopic(topic: TopicEntity): void {
    this.topics.push(topic);
    return;
  }

  getNonExpiredTopicAlerts(topicName: string): AlertEntity[] {
    const topic = this.topics.find((topics) => topics.name === topicName);
    if (!topic) return [];
    return topic.alerts.filter((alerts) => {
      if (alerts.expirationDate) return alerts.expirationDate >= new Date();
      return true;
    });
  }
}

export default TopicManager;
