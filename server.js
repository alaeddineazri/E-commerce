//node-express
const express = require("express");
//mongoose
const mongoose = require("mongoose"); 
const morgan = require("morgan"); 
const bodyParser = require("body-parser"); 
const cookieParser = require("cookie-parser"); //to read cookies
const expressValidator = require("express-validator"); //to validate data
//.env
require("dotenv").config();

//import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes")


const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
// we can use app.use(express.json()) this instead of bodyParser
app.use(cookieParser());
app.use(expressValidator())


//connect mongoose with mongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI, {
    autoIndex: true,
  })
  .then(() => {
    console.log("connected to mongoDB ");
  })
  .catch((err) => {
    console.log(err);
  });

//middleware for routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}!`));

