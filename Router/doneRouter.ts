import { Router } from "express";
import {
  deleteProgrsesUser,
  doneCreate,
  readDoneUser,
  readOneDoneUser,
} from "../Controller/doneController";

const doneRouter = Router();

doneRouter.route("/read").get(readDoneUser);
doneRouter.route("/read-one/:id").get(readOneDoneUser);
doneRouter.route("/done-task").post(doneCreate);
doneRouter
  .route("/:prgressId/:progressStepId/delete-progress-step")
  .delete(deleteProgrsesUser);

export default doneRouter;
