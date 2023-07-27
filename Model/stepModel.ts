import mongoose from "mongoose";

interface iStep {
  assignedTask?: string;
  assignedName?: string;
  assignedAvatar?: string;
  assignedPriority?: string;
  task?: {};
}
interface iStepData extends iStep, mongoose.Document {}

const stepModel = new mongoose.Schema(
  {
    assignedTask: {
      type: String,
      require: true,
    },
    assignedName: {
      type: String,
    },
    assignedAvatar: {
      type: String,
    },
    assignedPriority: {
      type: String,
    },
    task: {
      type: mongoose.Types.ObjectId,
      ref: "task",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iStepData>("steps", stepModel);
