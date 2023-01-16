const express = require("express");
//Path
const path = require("path");

//Connection to db
const dbConnect = require("./db/dbConnect");
//Cors
const cors = require("cors");

//Port
const PORT = 3500;
const app = express();

//Database connect
dbConnect();

//////////////Middleware\\\\\\\\\\\\\
//Cors
app.use(cors());
//Body parser
app.use(express.json());
//Form data handler
app.use(express.urlencoded({ extended: false }));
//Register route
app.use("/register", require("./routes/register"));
//Login route
app.use("/login", require("./routes/login"));
app.use("/free-access", require("./routes/free-access"));

app.use("/auth-access", require("./routes/authorized-access"));

//Listen for activity on port
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
