import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.mongodburi);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

export default connectdb;
