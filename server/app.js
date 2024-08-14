require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT_DEV, () => {
  console.log(`Server is running on port ${process.env.PORT_DEV}`);
});
