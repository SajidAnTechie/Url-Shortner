const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const ejs = require("ejs");
const { unknownEndpoints, errorHandler } = require("./middleware/error");
const routes = require("./routes/url");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

//Load the db
connectDB();

const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);
app.use(unknownEndpoints);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  console.log(
    `Server is running on ${process.env.NODE_ENV} mode at port ${PORT}`.yellow
      .bold
  )
);

//Handle unhandle promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  //close the server
  server.close(() => process.exit(1));
});
