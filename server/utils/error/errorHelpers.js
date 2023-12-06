const mongoose = require("mongoose");
const CustomError = require("./CustomError.js");
//const logger = require("../../log/logger.js");

function devError(res, err) {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message || "Internal Server Error";
  //logger.error(`${message}, status - ${status}, statusCode - ${statusCode}`)
  res.status(statusCode).json({
    status,
    message,
    stackTrace: err.stack,
    error: err,
  });
}

function prodError(res, err) {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message || "Internal Server Error";
  //logger.error(`${message}, status - ${status}, statusCode - ${statusCode}`)
  err?.isOperational
    ? res.status(statusCode).json({
        status,
        message,
      })
    : res.status(500).json({
        status: "error",
        message: "Something went wrong, Please try again later",
      });
}

function handleMongooseError(error) {
  if (error instanceof mongoose.Error.ValidationError) {
    const validationErrors = Object.values(error.errors).map((err) => err.message);
    return new CustomError(`Invalid Data Input: ${validationErrors.join(', ')}`, 400);
  }

  if (error instanceof mongoose.Error.CastError) {
    return new CustomError(`Invalid value for field ${error.path}:${error.value}`, 400);
  }

  if (error instanceof mongoose.Error.DocumentNotFoundError) {
    return new CustomError('Document not found.', 404);
  }

  if (error.code === 11000 || error.code === 11001) {
    const field=Object.keys(error.keyPattern)[0]
    const value=error.keyValue[field]
    return new CustomError(`Record with ${field} equal to ${value} already exists`, 400);
  }
  return error;
}

const globalErrorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    devError(res, err);
  } else if (process.env.NODE_ENV === "production") {
    let e=handleMongooseError(err)
    prodError(res,e);
  }
};

const asyncErrorHandler = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports={globalErrorHandler,asyncErrorHandler};
