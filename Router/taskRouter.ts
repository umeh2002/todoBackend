import { Router } from "express";
import {
  createTask,
  deleteTask,
  readOneTask,
  readTask,
  updateOneTask,
  updateStateTask,
} from "../Controller/taskController";

const taskRouter = Router();

taskRouter.route("/:id/create-task").post(createTask);
taskRouter.route("/view-task").get(readTask);
taskRouter.route("/:id/view-one-task").get(readOneTask);
taskRouter.route("/:id/update-one-task").patch(updateOneTask);
taskRouter.route("/:id/update-step-task").patch(updateStateTask);
taskRouter.route("/:id/delete-one-task").delete(deleteTask);

export default taskRouter;
