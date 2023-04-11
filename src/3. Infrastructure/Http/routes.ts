import express from "express";
import { RegisterUserController } from "../Controllers/Users/registerUserController";
import { RegisterUser } from "../../User/2. UseCases/registerUser";
import userRepository from "../../User/3. Infrastructure/user.repository";
import { MarkAlertAsReadController } from "../Controllers/Users/markAlertAsReadController";
import { MarkAlertAsRead } from "../../User/2. UseCases/markAlertAsRead";
import { UpdateUserTopicController } from "../Controllers/Users/updateUserTopicController";
import { UpdateUserTopicSubscription } from "../../User/2. UseCases/updateUserTopic";
import { GetUnreadNonExpiredController } from "../Controllers/Users/getUnreadNonExpiredController";
import { GetUnreadNonExpiredUserAlerts } from "../../User/2. UseCases/getUnreadNonExpired";
import { GetNonExpiredTopicAlertsController } from "../Controllers/Topics/getNonExpiredTopicAlertsController";
import { GetNonExpiredTopicAlerts } from "../../Topics/2. UseCases/getNonExpiredTopicAlerts";
import topicsRepository from "../../Topics/3. Infrastructure/topics.repository";
import { RegisterNewTopicController } from "../Controllers/Topics/registerNewTopicController";
import { RegisterNewAlertTopic } from "../../Topics/2. UseCases/registerNewTopic";
import { AlertsController } from "../Controllers/Alerts/AlertsController";
import { SendTopicAlertToAllSubscribers } from "../../Alerts/2. UseCases/sendTopicAlertToAll";
import { SendTopicAlertToUser } from "../../Alerts/2. UseCases/sendTopicAlertToUser";
import AlertManager from "../../Alerts/3. Infrastructure/alerts.repository";

const routes = express();

const registerUserCtrl = new RegisterUserController(
  new RegisterUser(userRepository)
);

const markAlertAsReadCtrl = new MarkAlertAsReadController(
  new MarkAlertAsRead(userRepository)
);

const updateUserTopicSubscriptionCtrl = new UpdateUserTopicController(
  new UpdateUserTopicSubscription(userRepository)
);

const getUnreadNonExpiredUserAlertsCtrl = new GetUnreadNonExpiredController(
  new GetUnreadNonExpiredUserAlerts(userRepository)
);

const registerNewTopicCtrl = new RegisterNewTopicController(
  new RegisterNewAlertTopic(topicsRepository)
);

const getNonExpiredTopicAlertsCtrl = new GetNonExpiredTopicAlertsController(
  new GetNonExpiredTopicAlerts(topicsRepository)
);

const alertsController = new AlertsController(
  new SendTopicAlertToAllSubscribers(new AlertManager()),
  new SendTopicAlertToUser(new AlertManager())
);

routes
  .post("/newUser", registerUserCtrl.execute)
  .post("/newTopic", registerNewTopicCtrl.execute)
  .put("/suscribeToTopic", updateUserTopicSubscriptionCtrl.execute)
  .post("/sendAlert", alertsController.execute)
  .put("/readAlert", markAlertAsReadCtrl.execute)
  .get("/userAlerts", getUnreadNonExpiredUserAlertsCtrl.execute)
  .get("/topicAlerts", getNonExpiredTopicAlertsCtrl.execute);

export default routes;
