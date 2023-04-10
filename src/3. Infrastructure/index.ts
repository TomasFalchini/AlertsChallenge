import express from "express";
import cors from "express";
import routes from "./Http/routes";
import errorMiddleware from "./Http/Middleware/errorMiddleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(errorMiddleware);

export default app;
