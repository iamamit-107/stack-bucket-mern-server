require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../", "public")));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database connection establish
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Hello World",
  });
});

app.use((req, res, next) => {
  const error = new Error("404 Page Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log(error);
  if (error.status === 404) {
    return res.status(404).json({
      msg: error.message,
      status: 404,
    });
  }

  return res.status(500).json({
    msg: "Internal Server Error",
    status: 500,
  });
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
