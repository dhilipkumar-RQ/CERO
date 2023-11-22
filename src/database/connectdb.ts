import mongoose from "mongoose";
import { DATABASE_URL } from "../config/index";

let client: mongoose.Mongoose;

const connectDB = async (): Promise<mongoose.Mongoose> => {
  try {
    client = await mongoose.connect(DATABASE_URL);
    console.log(`MongoDB connected - ${client.connection.host}`);
    return client;
  } catch (error) {
    console.error(`Error ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
