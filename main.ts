import express, { Application } from "express";
import auth from "./Router/authRouter";
import task from "./Router/taskRouter";
import step from "./Router/stepRouter";
import progress from "./Router/progressRouter";
import done from "./Router/doneRouter";
import cors from "cors"

const main = (app: Application) => {
  app.use(express.json());
  app.use(cors())
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/task", task);
  app.use("/api/v1/step", step);
  app.use("/api/v1/progress", progress);
  app.use("/api/v1/done", done);
};

export default main;
