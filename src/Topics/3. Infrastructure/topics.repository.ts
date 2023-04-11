import { AlertEntity } from "../../Alerts/1.Domain/alert.entity";
import { TopicEntity } from "../1.Domain/topic.entity";
import { TopicRepository } from "../1.Domain/topic.repository";

class TopicManager implements TopicRepository {
  private static instance: TopicManager;
  private topics: TopicEntity[] = [];

  private constructor() {}

  static getInstance(): TopicManager {
    if (!TopicManager.instance) {
      TopicManager.instance = new TopicManager();
    }
    return TopicManager.instance;
  }

  getTopic(topic: string) {
    return this.topics.find((t) => t.name === topic);
  }

  registerNewAlertTopic(topic: TopicEntity): void {
    this.topics.push(topic);
    return;
  }

  getNonExpiredTopicAlerts(topicName: string): AlertEntity[] {
    const topic = this.topics.find((topics) => topics.name === topicName);

    if (!topic) return [];
    return topic.alerts.filter((alerts) => {
      if (alerts.expirationDate) {
        const today = new Date();
        return new Date(alerts.expirationDate) >= today;
      }
      return true;
    });
  }

  cleanTest() {
    this.topics = [];
  }
}

export default TopicManager.getInstance();
