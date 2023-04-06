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

routes
  .post("/newUser", registerUserCtrl.execute)
  .post("newTopic")
  .put("/suscribeToTopic", updateUserTopicSubscriptionCtrl.execute)
  .post("/sendAlert")
  .put("/readAlert", markAlertAsReadCtrl.execute)
  .get("/userAlerts", getUnreadNonExpiredUserAlertsCtrl.execute)
  .get("/topicAlerts");

export default routes;
