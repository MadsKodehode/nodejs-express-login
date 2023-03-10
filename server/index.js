const express = require("express");
//Import mongoose
const mongoose = require("mongoose");
//Import db connect function
const dbConnect = require("./db/dbConnect");
//Import cors
const cors = require("cors");
//Import cookie parser
const cookieParser = require("cookie-parser");
//Import environment variables
require("dotenv").config();
//Create express app
const app = express();

//PORT
const PORT = process.env.PORT || 5000;

//Database connect
dbConnect();

//////////////Middleware\\\\\\\\\\\\\
//Cors
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//Body parser
app.use(express.json());
//Form data handler
app.use(express.urlencoded({ extended: false }));
//Cookie Parser
app.use(cookieParser());

/////////ROUTES\\\\\\\\\\
//Register route
app.use("/register", require("./routes/register"));
//Login route
app.use("/login", require("./routes/login"));
//Dashboard route
app.use("/dashboard", require("./routes/dashboard"));
//Free access
app.use("/free-access", require("./routes/free-access"));
//Auth access
app.use("/auth-access", require("./routes/authorized-access"));
//Refresh route
app.use("/refresh", require("./routes/refresh"));
//Logout route
app.use("/logout", require("./routes/logout"));
//Making sure we are connected to db before listening to port
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  //Listen for activity on port
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
