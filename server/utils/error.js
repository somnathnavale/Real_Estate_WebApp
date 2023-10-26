export class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const indexNameToFieldName = {
  username_1: "Username",
  email_1: "Email",
  // Add more mappings as needed
};

export const handleMongoError = (error) => {
  if (error.code === 11000) {
    let errorMessage = "Database Error";
    const indexName = error.message.match(/index: (.+?) dup key/)[1];
    const fieldName = indexNameToFieldName[indexName];
    errorMessage = `User With Given ${fieldName} already exists`;
    return new ErrorHandler(400, errorMessage);
  }
};

export const handleGlobalError = (error) => {
  return new ErrorHandler(500, "An error occurred in the server.");
};
