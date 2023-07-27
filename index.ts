import express, { Application } from "express";
import main from "./main";
import { dbConnect } from "./Config/db";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();

const newPort = parseInt(process.env.APPLICATION_PORT!);

const port: number = newPort;
main(app);

const server = app.listen(port, () => {
  console.log("");
  dbConnect();
  console.log("server is listening ");
});

process.on("uncaughtException", (err: any) => {
  console.log("server is shutting down due to uncaught exception");
  console.log(err);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("server is shuttting down due to unhandled rejection",reason);
  console.log(reason);

 process.exit(1)
});
