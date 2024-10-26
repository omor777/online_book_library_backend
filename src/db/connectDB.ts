import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(process.env.DB_CONNECTION_URL as string);
  console.log("Database connected");
};

export default connectDB;
