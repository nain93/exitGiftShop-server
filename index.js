require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const https = require("https");
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const port = 4000;

// router
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const auctionRouter = require("./routes/auction");
const fileRouter = require("./routes/file");

// use
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

const MEGABYTE = 1024 * 1024;
app.use(fileUpload({
  limits: { fileSize: 50 * MEGABYTE }, 
}));


// router
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/auction", auctionRouter);
app.use("/file", fileRouter);

// https
const server = https
  .createServer(
    {
      // key: fs.readFileSync("/" + process.env.KEY_PATH, "utf-8"),
      // cert: fs.readFileSync("/" + process.env.CERT_PATH, "utf-8"),
      key: fs.readFileSync(__dirname + "/key.pem", "utf-8"),
      cert: fs.readFileSync(__dirname + "/cert.pem", "utf-8"),
    },
    app
  )
  // .listen(port, () => console.log("https://back.exitgift.shop:4000"));
.listen(port, () => console.log("https://localhost:4000"));

module.exports = server;
