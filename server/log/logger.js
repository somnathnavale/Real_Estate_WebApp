import winston from "winston";

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './log/error.log', level: 'error' }),
    new winston.transports.File({ filename: './log/combined.log' }),
    new winston.transports.File({ filename: './log/email-error.log', level: 'error', filter: isEmailError }),
  ],
});

function isEmailError(info) {
  return info.emailError === true;
}

export default logger;
