import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoose_string: string = process.env.APPLICATION_STRING!;

export const dbConnect = () => {
  mongoose.connect(mongoose_string).then(() => {
    console.log("database is connected");
  });
};
