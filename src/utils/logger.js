const { createLogger, format, transports, Logger } = require("winston");

// {error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6}
const level = process.env.LOG_LEVEL || "debug";

function formatParams(info) {
  const { timestamp, level, message, ...args } = info;
  const ts = timestamp.slice(0, 19).replace("T", " ");

  return `${ts} ${level}: ${message} ${
    Object.keys(args).length ? JSON.stringify(args, "") : ""
  }`;
}

// dev format
const devFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(formatParams)
);

// prod format
const prodFormat = format.combine(
  format.timestamp(),
  format.align(),
  format.printf(formatParams)
);

let logger = null;

if (process.env.NODE_ENV === "production") {
  logger = createLogger({
    level,
    format: prodFormat,
    transports: [
      new transports.File({ filename: "logs/error.log", level: "error" }),
      new transports.File({ filename: "logs/combined" }),
    ],
  });
} else {
  logger = createLogger({
    level,
    format: devFormat,
    transports: [new transports.Console()],
  });
}

module.exports = logger;
