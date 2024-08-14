require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const languageRouter = require("./routes/languageRouter");
const authorRouter = require("./routes/authorRouter");
const bookRouter = require("./routes/bookRouter");
const app = express();

connectDB();

app.use(bodyParser.json());
app.use("/api/v1/language", languageRouter);
app.use("/api/v1/author", authorRouter);
app.use("/api/v1/book", bookRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT_DEV, () => {
  console.log(`Server is running on port ${process.env.PORT_DEV}`);
});
