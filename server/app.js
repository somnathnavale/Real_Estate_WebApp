const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const userRouter = require("./routes/user.route.js");
const authRouter = require("./routes/auth.route.js");
const enumRouter = require("./routes/enum.route.js");
const listingRouter = require("./routes/listing.route.js");

const CustomError = require("./utils/error/CustomError.js");
const { globalErrorHandler } = require("./utils/error/errorHelpers.js");
const logger = require("./log/logger.js");

dotenv.config();

process.on('unhandledRejection',(promise,reason)=>{
  //logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
})
process.on('uncaughtException',error=>{
  //logger.error('Uncaught Exception:', error);
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

  app.use(express.static(path.resolve(__dirname, 'public')));
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'public', 'index.html'),function (err) {
          if(err) {
              res.status(500).send(err)
          }
      });
  })
}

app.use('*',(req,res,next)=>{
  const err=new CustomError(`Can't find ${req.originalUrl} on the server!`,404);
  //logger.error(`message-${err.message}, type-${err.name}`);
  next(err);
})

app.use(globalErrorHandler);

mongoose.connection.once("open",()=>{
  app.listen(process.env.PORT || 5000, () => {
    console.log(`server is running on port ${process.env.PORT}`);
  });
})
