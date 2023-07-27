import mongoose from "mongoose";

interface iAuth {
  userName: string;
  avatar?: string;
  password: string;
  confirmPassword: string;
  email: string;
}

interface iAuthData extends iAuth, mongoose.Document {}

const authModel = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      // unique:false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<iAuthData>("auth", authModel)
