const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Hello World",
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
