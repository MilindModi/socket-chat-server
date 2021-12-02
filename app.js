var mongoose = require("mongoose");

const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");

var mongoDB =
  "mongodb+srv://modi:123modi@cluster0.dtvba.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// var mongoDB =
// "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.once("open", () => {
  console.log("Database connected");
});

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("connection", (stream) => {
  console.log("someone connected!");
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log("server is running on ",port );
});

app.use("/user", userRoutes);

const io = require("socket.io")(server);

const socket = require("./socket/socket")(io);
