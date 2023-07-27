import mongoose from "mongoose";

interface iDone {
  assignedTask?: string;
  assignedAvatar?: string;
  assignedName?: string;
  assignedPriority?: string;
  task?: {};
}

interface iDoneData extends iDone, mongoose.Document {}

const doneModel = new mongoose.Schema(
  {
    assignedName: {
      type: String,
    },
    assignedTask: {
      type: String,
    },
    assignedPriority: {
      type: String,
    },
    assignedAvatar: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<iDoneData>("done", doneModel);
