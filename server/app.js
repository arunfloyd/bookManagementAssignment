require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const languageRouter = require("./routes/languageRouter");
const authorRouter = require("./routes/authorRouter");
const bookRouter = require("./routes/bookRouter");
const authenticatedRouter = require("./routes/authenticationRouter");
const otpRouter = require("./routes/otpRouter");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

connectDB();
app.use(cookieParser());
app.use(bodyParser.json());
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? process.env.ALLOWED_ORIGINS_PRODUCTION.split(",")
    : [...process.env.ALLOWED_ORIGINS_LOCAL.split(","), "http://localhost:3000"];

const corsOptions = {
  origin: allowedOrigins, // This should be an array of allowed origins
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/api/v1/language", languageRouter);
app.use("/api/v1/author", authorRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/login", authenticatedRouter);
app.use("/api/v1/resetPassword", otpRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT_DEV, () => {
  console.log(`Server is running on port ${process.env.PORT_DEV}`);
});
