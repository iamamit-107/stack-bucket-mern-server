const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const rfs = require("rotating-file-stream");

module.exports = function (app) {
  // format
  const format = process.env.NODE_ENV === "production" ? "combined" : "dev";

  // create a write stream (in append mode)
  var accessLogStream200 = rfs.createStream("access200.log", {
    path: path.join(__dirname, "../../", "logs"),
    interval: "1d",
    size: "25M",
  });

  var accessLogStream400 = rfs.createStream("access400.log", {
    path: path.join(__dirname, "../../", "logs"),
    interval: "1d",
    size: "25M",
  });

  // status code 400 and 500
  app.use(
    morgan(format, {
      skip: (req, res) => res.statusCode < 400,
      stream:
        process.env.NODE_ENV === "production"
          ? accessLogStream400
          : process.stderr,
    })
  );

  // status code 200 and 300
  app.use(
    morgan(format, {
      skip: (req, res) => res.statusCode >= 400,
      stream:
        process.env.NODE_ENV === "production"
          ? accessLogStream200
          : process.stdout,
    })
  );
};
