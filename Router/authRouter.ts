import express, { Router } from "express";
import {
  createUser,
  deleteUser,
  readAllUsers,
  readOneUser,
  signIn,
  updateUser,
} from "../Controller/authController";

const router = Router();

router.route("/register").post(createUser);
router.route("/sign-in").post(signIn);
router.route("/read-all").get(readAllUsers);
router.route("/read-one/:id").get(readOneUser);
router.route("/update-user/:id").patch(updateUser);
router.route("/delete-user/:id").delete(deleteUser);

export default router;
