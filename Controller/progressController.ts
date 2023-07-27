import express, { Request, Response } from "express";
import progressModel from "../Model/progressModel";

export const createProgress = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const tasked = await progressModel.create(req.body);
    return res.status(201).json({
      message: "success ",
      data: tasked,
    });
  } catch (error) {
    return res.status(500).json({
      message: "not done",
      data: error.message,
    });
  }
};

export const readProgress = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const tasked = await progressModel.find();
    return res.status(200).json({
      message: "can see all tasks",
      data: tasked,
    });
  } catch (error) {
    return res.status(500).json({
      message: "not done",
      data: error.message,
    });
  }
};

export const readProgressDetail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const tasked = await progressModel.findById(id).populate({
      path: "step",
      options: {
        sort: { createdAt: -1 },
      },
    });
    return res.status(200).json({
      message: "can view one task ",
      data: tasked,
    });
  } catch (error) {
    return res.status(500).json({
      message: "not done",
      data: error.message,
    });
  }
};

export const deleteProgress = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const tasked = await progressModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "tasked deleted successfully",
      data: tasked,
    });
  } catch (error) {
    return res.status(500).json({
      message: "not done",
      data: error.message,
    });
  }
};
