//node-express
const express = require("express");
//mongoose
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//.env
require("dotenv").config();

//import routes
const userRoutes = require("./routes/userRoutes");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use (cookieParser());

// app.use(express.json());

//connect mongoose with mongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to mongoDB ");
  })
  .catch((err) => {
    console.log(err);
  });

//middleware for routes
app.use("/api/user", userRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}!`));
