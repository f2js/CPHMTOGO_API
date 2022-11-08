const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config({ path: "./config.env" });

const app = express();
app.enable("trust proxy");

app.use(cors());
app.use(helmet());
app.use(xss());
app.use(cookieParser());
app.use(bodyParser.json());

const userRouter = require("./Routes/userRouter");
const orderRouter = require("./Routes/orderRouter");
const menuRouter = require("./Routes/menuRouter");
const basketRouter = require("./Routes/basketRouter");
const cafeRouter = require("./Routes/cafeRouter");

app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use("/menu", menuRouter);
app.use("/basket", basketRouter);
app.use("/cafes", cafeRouter);

app.all("*", (req, res, next) => {
  console.log("Cannot find the specified route: " + req.originalUrl);
  next();
});

module.exports = app;
