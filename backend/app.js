const express = require("express");
const cors = require("cors");

// Import Routers
const userRouter = require("./routers/userRouter");
const friendshipRouter = require("./routers/friendshipRouter");
const messageRouter = require("./routers/messageRouter");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Use Base Routes for Routers
app.use("/users", userRouter);
app.use("/friendships", friendshipRouter);
app.use("/messages", messageRouter);

module.exports = app;
