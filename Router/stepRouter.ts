import { Router } from "express";
import {
  createStep,
  deleteOneStep,
  readOneStep,
  readSteps,
  readTask,
  updateOneStep,
} from "../Controller/stepController";

const stepRouter = Router();

stepRouter.route("/:id/create-step").post(createStep);
stepRouter.route("/:id/view-tasks").get(readTask);
stepRouter.route("/:id/view-step").get(readSteps);
stepRouter.route("/:id/view-one-step").get(readOneStep);
stepRouter.route("/:id/update-one-step").patch(updateOneStep);
stepRouter.route("/:taskId/:stepId/delete-one-step").delete(deleteOneStep);

export default stepRouter;
