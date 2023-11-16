import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import enumRouter from "./routes/enum.route.js";
import listingRouter from "./routes/listing.route.js";

import CustomError from "./utils/error/CustomError.js";
import { globalErrorHandler } from "./utils/error/errorHelpers.js";

const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/enums", enumRouter);
app.use("/api/listings", listingRouter);


app.use('*',(req,res,next)=>{
  const err=new CustomError(`Can't find ${req.originalUrl} on the server!`,404);
  next(err);
})

app.use(globalErrorHandler);

export default app;