import express from "express";

const routes = express();

routes
  .post("/newUser")
  .post("newTopic")
  .put("/suscribeToTopic")
  .post("/sendAlert") //para todos los usuarios de un tema o para un usuario en especifico
  .put("/readAlert")
  .get("/alerts"); //para un usuario o para un tema

export default routes;
