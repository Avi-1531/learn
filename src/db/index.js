import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectdb = async () => {
  try {
    const connectinstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `mongodb Database connected ${connectinstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongodb connection error", error);
    process.exit(1);
  }
};

export default connectdb;
