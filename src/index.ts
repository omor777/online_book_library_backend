import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app";
import connectDB from "./db";

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

const main = async () => {
  try {
    await connectDB()
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error, "db connection error");
    process.exit(1);
  }
};

main();
