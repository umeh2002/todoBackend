import mongoose from "mongoose";

interface iTask {
  name?: string;
  task?: string;
  avatar?: string;
  stepToggle?: boolean;
  stateData?: boolean;
  step?: {}[];
  priority?: string;
}
interface iTaskData extends iTask, mongoose.Document {}
const taskModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    task: {
      type: String,
      require: true,
    },
    stepToggle: {
      type: Boolean,
    },
    priority: {
      type: String,
    },
    avatar: {
      type: String,
    },
    stateData: {
      type: Boolean,
    },
    step: [
      {
        type: mongoose.Types.ObjectId,
        ref: "step",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iTaskData>("task",taskModel)
