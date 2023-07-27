import express, { Request, Response } from "express";
import authModel from "../Model/authModel";
import taskModel from "../Model/taskModel";
import stepModel from "../Model/stepModel";
import mongoose from "mongoose";

export const createStep = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { assignedName, assignedTask, assignedPriority } = req.body;

    const auth = await authModel.findOne({ userName: assignedName });
    const task: any = await taskModel.findById(id);

    if (auth) {
      const step = await stepModel.create({
        assignedName: auth?.userName,
        assignedTask,
        assignedPriority,
        assignedAvatar: auth?.avatar,
      });

        task!.step.push(new mongoose.Types.ObjectId(step?._id));

        task!.save();

      return res.status(201).json({
        message: "task steps successfully created",
        data: step,
      });
    } else {
      return res.status(404).json({
        message: "error assigning user",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "error assigning user",
      data: error.message,
    });
  }
};

export const readTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const tasked = await taskModel.find();
    return res.status(200).json({
      message: "task  successfully been read",
      data: tasked,
    });
  } catch (error) {
    return res.status(404).json({
      message: "error assigning user",
      data: error.message,
    });
  }
};

export const readSteps = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const tasked = await taskModel.findById(id).populate({
      path: "step",
      options: {
        sort: { createdAt: true },
      },
    });
    return res.status(200).json({
      message: "task steps successfully been read",
      data: tasked,
    });
  } catch (error) {
    return res.status(404).json({
      message: "error reading steps",
      data: error.message,
    });
  }
};

export const readOneStep = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const tasked = await stepModel.findById(id);
    return res.status(200).json({
      message: "task step successfully been read",
      data: tasked,
    });
  } catch (error) {
    return res.status(404).json({
      message: "error reading step",
      data: error.message,
    });
  }
};

export const updateOneStep = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { assignedTask } = req.body;
    const tasked = await stepModel.findByIdAndUpdate(
      id,
      { assignedTask },
      { new: true }
    );
    return res.status(200).json({
      message: "task step successfully been updated",
      data: tasked,
    });
  } catch (error) {
    return res.status(404).json({
      message: "error updating step",
      data: error.message,
    });
  }
};

export const deleteOneStep = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { stepId, taskId } = req.params;
    const tasked: any = await taskModel.findById(taskId);
    const stepped = await stepModel.findByIdAndDelete(stepId);
    tasked!.step.pull(new mongoose.Types.ObjectId(stepped?._id));
    tasked.save();
    return res.status(200).json({
      message: "task step successfully been deleted",
      data: tasked,
    });
  } catch (error) {
    return res.status(404).json({
      message: "error deleting step",
      data: error.message,
    });
  }
};
