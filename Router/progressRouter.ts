import { Router } from "express";
import {
  createProgress,
  deleteProgress,
  readProgress,
  readProgressDetail,
} from "../Controller/progressController";

const progressRouter = Router();

progressRouter.route("/create-progress").post(createProgress);
progressRouter.route("/view-progress").get(readProgress);
progressRouter.route("/:id/view-progress-info").get(readProgressDetail);
progressRouter.route("/:id/delete-progress").delete(deleteProgress);

export default progressRouter;
