import { Request, Response } from "express";
import authModel from "../Model/authModel";
import taskModel from "../Model/taskModel";

export const createTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { task, priority } = req.body;
    const user = await authModel.findById(id);

    const tasked = await taskModel.create({
      name: user?.userName,
      task,
      priority,
      avatar: user?.avatar,
    });
    return res.status(201).json({
      message: "Task created successfully",
      data: tasked,
    });
  } catch (error) {
    return res.status(500).json({
      message: "not found",
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
      message: "Task read successfully",
      data: tasked,
    });
  } catch (error) {
    return res.status(500).json({
      message: "not found",
      data: error.message,
    });
  }
};

export const updateOneTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { stepToggle } = req.body;
    const tasked = await taskModel.findByIdAndUpdate(
      id,
      { stepToggle },
      { new: true }
    );

    return res.status(200).json({
      message: "Task updated successfully",
      data: tasked,
    });
  } catch (error) {
    return res.status(500).json({
      message: "not found",
      data: error.message,
    });
  }
};

export const updateStateTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { stateData } = req.body;
    const tasked = await taskModel.findByIdAndUpdate(
      id,
      { stateData },
      { new: true }
    );

    return res.status(200).json({
      message: "Task updated successfully",
      data: tasked,
    });
  } catch (error) {
    return res.status(500).json({
      message: "not found",
      data: error.message,
    });
  }
};

export const readOneTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const tasked = await taskModel.findById(id);

    return res.status(200).json({
      message: "read one successfully",
      data: tasked,
    });
  } catch (error) {
    return res.status(500).json({
      message: "not found",
      data: error.message,
    });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const tasked = await taskModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "deleted successfully",
      data: tasked,
    });
  } catch (error) {
    return res.status(500).json({
      message: "not found",
      data: error.message,
    });
  }
};
