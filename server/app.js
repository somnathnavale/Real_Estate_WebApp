import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"
import {resolve, dirname} from "path";
import { fileURLToPath } from 'url';

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import enumRouter from "./routes/enum.route.js";
import listingRouter from "./routes/listing.route.js";

import CustomError from "./utils/error/CustomError.js";
import { globalErrorHandler } from "./utils/error/errorHelpers.js";
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

const app = express();

app.use(
  cors({
    origin: [process.env.ORIGIN,"/"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  //logger.info(`${req.method} ${req.url}`);
  next();
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/enums", enumRouter);
app.use("/api/listings", listingRouter);


if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  app.use(express.static(resolve(__dirname, 'public')));
  app.get("*", (req, res) => {
      res.sendFile(resolve(__dirname, 'public', 'index.html'),function (err) {
          if(err) {
              res.status(500).send(err)
          }
      });
  })
}

app.use('*',(req,res,next)=>{
  const err=new CustomError(`Can't find ${req.originalUrl} on the server!`,404);
  logger.error(`message-${err.message}, type-${err.name}`);
  next(err);
})

app.use(globalErrorHandler);

mongoose.connection.once("open",()=>{
  app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
  });
})
