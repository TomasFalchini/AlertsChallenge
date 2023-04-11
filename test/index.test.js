const supertest = require("supertest");
const request = supertest("http://localhost:8080");
const { faker } = require("@faker-js/faker");

describe("TESTING API", () => {
  describe("RUTA /newUser", () => {
    test("El estado de respuesta debe ser 200 si en req.body se envían bien los datos del usuario", async () => {
      const newUser = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      };
      const res = await request.post("/newUser").send(newUser);
      expect(res.status).toEqual(200);
      expect(res.body.result).toEqual("User registered with ID: 1");
    });

    test("El ID se debe incrementar al crearse un nuevo usuario", async () => {
      const newUser = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      };
      const res = await request.post("/newUser").send(newUser);
      expect(res.body.result).toEqual("User registered with ID: 2");
    });

    test("Si falta algún dato, deberia devolver un Error", async () => {
      const newUser = {
        firstName: faker.name.firstName(),
      };
      const res = await request.post("/newUser").send(newUser);
      expect(res.status).toEqual(404);
      expect(res.body.error).toBeTruthy();
    });
  });

  describe("RUTA /newTopic", () => {
    test("El estado de respuesta debe ser 200 si en req.body se envían bien los datos del topic", async () => {
      const newTopic = {
        topicName: "Ofertas",
      };
      const res = await request.post("/newTopic").send(newTopic);
      expect(res.status).toEqual(200);
    });

    test("El estado de respuesta debe ser 404 si en req.body se envían incorrectos los datos del topic", async () => {
      const newTopic = {
        topicName: 123,
      };
      const res = await request.post("/newTopic").send(newTopic);
      expect(res.status).toEqual(404);
    });
  });

  describe("RUTA /suscribeToTopic", () => {
    test("Si no se envian los datos en el formato correcto, no se debería poder suscribir al tema", async () => {
      const res = await request.put("/suscribeToTopic").send({
        userId: "ochocientostres",
        topic: "Ofertas",
      });
      expect(res.status).toEqual(404);
      expect(res.body.error).toEqual(
        "Invalid ID or topicName, ID must be a number and topic must be a string"
      );
    });
    test("Si se envian los datos en el formato correcto se debería poder suscribir al tema y retornar con un status 200", async () => {
      const res = await request.put("/suscribeToTopic").send({
        userId: 1,
        topic: "Ofertas",
      });
      expect(res.status).toEqual(200);
    });

    test("Si se envian los datos en el formato correcto se debería poder suscribir al tema y retornar el id del usuario y el tema al cual se suscribio", async () => {
      const body = {
        userId: 1,
        topic: "Ofertas",
      };
      const res = await request.put("/suscribeToTopic").send(body);
      expect(res.body.result).toEqual(
        `The user with ID = ${body.userId} has been suscribed to the topic: ${body.topic}`
      );
    });

    test("Si se envian los datos en el formato correcto se debería poder suscribir al tema y retornar el id del usuario y el tema al cual se suscribio", async () => {
      const body = {
        userId: 2,
        topic: "Ofertas",
      };
      const res = await request.put("/suscribeToTopic").send(body);
      expect(res.body.result).toEqual(
        `The user with ID = ${body.userId} has been suscribed to the topic: ${body.topic}`
      );
    });
  });

  describe("RUTA /sendAlert y /topicAlerts", () => {
    test("Si se envían mal por body el topic o la alerta, debería retornar un error", async () => {
      const alert = {
        no: "esta alerta esta mal",
      };
      const topic = "Ofertas";
      const body = {
        topic,
        alert,
      };
      const res = await request.post("/sendAlert").send(body);
      expect(res.status).toEqual(404);
      expect(res.body.error).toEqual("Invalid Alert");
    });

    test("Si se envia un id de usuario, se deberia enviar la alerta solo a ese usuario en específico, pero deberia encontrarse igualmente la alerta en un topic", async () => {
      const alert = {
        description: "esta alerta esta bien",
        type: "INFORMATIVA",
        expirationDate: new Date(2023, 9, 15),
      };
      await request
        .put("/suscribeToTopic")
        .send({ userId: 1, topic: "Ofertas" });
      const res = await request
        .post("/sendAlert")
        .send({ userId: 1, alert: alert, topic: "Ofertas" });
      expect(res.body.result).toEqual("The alert has been sent");
      expect(res.status).toEqual(200);

      const res2 = await request.get("/topicAlerts?topicName=Ofertas");

      expect(res2.body.alerts[0].description).toEqual("esta alerta esta bien");
    });
  });

  describe("Test de integración", () => {
    test("Si se crea un usuario, este se suscribe a un topic y se envía una alerta a todos los usuarios de ese topic, este deberia poder recibirla, y también marcarla como leida", async () => {
      const newUser1 = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      };
      const newUser2 = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      };
      const newTopic = {
        topicName: "Noticias",
      };
      await request.post("/newUser").send(newUser1);
      await request.post("/newUser").send(newUser2);

      await request.post("/newTopic").send(newTopic);

      await request
        .put("/suscribeToTopic")
        .send({ userId: 3, topic: "Noticias" });
      await request
        .put("/suscribeToTopic")
        .send({ userId: 4, topic: "Noticias" });

      const alert1 = {
        description: "esta alerta esta bien",
        type: "URGENTE",
      };

      const alert2 = {
        description: "esta alerta esta bien también, y va a quedar primera",
        type: "URGENTE",
      };

      const alert3 = {
        description: "esta alerta esta bien pero no tiene prioridad",
        type: "INFORMATIVA",
      };

      const alert4 = {
        description: "esta alerta esta bien pero va a quedar última",
        type: "INFORMATIVA",
      };

      await request
        .post("/sendAlert")
        .send({ topic: "Noticias", alert: alert1 });
      await request
        .post("/sendAlert")
        .send({ topic: "Noticias", alert: alert2 });
      await request
        .post("/sendAlert")
        .send({ topic: "Noticias", alert: alert3 });
      await request
        .post("/sendAlert")
        .send({ topic: "Noticias", alert: alert4 });

      await request.put("/readAlert").send({ alertId: 4, userId: 3 });

      const res = await request.get("/userAlerts?userId=3");
      const res2 = await request.get("/topicAlerts?topicName=Noticias");

      expect(res.body.alerts.length).toBe(3);
      expect(res2.body.alerts.length).toBe(4);
    });
  });
});
