import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
import logger from "./log/logger.js";

dotenv.config();

process.on('unhandledRejection',(promise,reason)=>{
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
})

process.on('uncaughtException',error=>{
  logger.error('Uncaught Exception:', error);
  process.exit(1);
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

mongoose.connection.once("open",()=>{
  app.listen(5000, () => {
    console.log("server is running...");
  });
})
