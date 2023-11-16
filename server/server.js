import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

process.on('unhandledRejection',err=>{
  console.log('unhandledRejection  cause shutdown');
  process.exit(1);
})

process.on('uncaughtException',err=>{
  console.log('uncaughtException cause shutdown');
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
