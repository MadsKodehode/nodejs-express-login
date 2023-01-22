//Import mongoose
const mongoose = require("mongoose");

//Import dotenv
require("dotenv").config();

//Connect to database
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
  } catch (error) {
    console.log("Unable to connect to MongoDB");
    console.error(error);
  }
};

module.exports = dbConnect;
