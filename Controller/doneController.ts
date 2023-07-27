import express, { Request, Response } from "express";
import doneModel from "../Model/doneModel";
import progressModel from "../Model/progressModel";
import stepModel from "../Model/stepModel";
import mongoose from "mongoose";

export const doneCreate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { assignedAvatar, assignedName, assignedPriority, assignedTask } =
      req.body;
    const user = await doneModel.create({
      assignedAvatar,
      assignedName,
      assignedPriority,
      assignedTask,
    });

    return res.status(201).json({
      message: "done successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "not done",
      data: error.message,
    });
  }
};

export const readDoneUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await doneModel.find();

    return res.status(200).json({
      message: "can see all doned tasks",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "not done",
      data: error.message,
    });
  }
};

export const readOneDoneUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const user = await doneModel.findById(id);

    return res.status(200).json({
      message: "can see one doned task",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "not done",
      data: error.message,
    });
  }
};

export const deleteProgrsesUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { progressId, progressStepId } = req.params;
    const progress: any = await progressModel.findById(progressId);
    const removeStep = await stepModel.findById(progressStepId);
    const user: any = await progress?.step?.pull(
      new mongoose.Types.ObjectId(removeStep!._id)
    );
    progress!.save();
    return res.status(200).json({
      message: "deleted successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "not done",
      data: error.message,
    });
  }
};
