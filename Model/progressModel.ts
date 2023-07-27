import mongoose from "mongoose";

interface iProgress {
  task?: string;
  avatar?: string;
  name?: string;
  priority?: string;
  step?: {}[];
}

interface iProgressData extends iProgress, mongoose.Document {}
const progressModel = new mongoose.Schema(
  {
    task: {
      type: String,
      require: true,
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    priority: {
      type: String,
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

export default mongoose.model<iProgressData>("progress", progressModel);
