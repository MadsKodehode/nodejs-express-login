const mongoose = require("mongoose");

//User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide a username"],
    unique: [true, "username already exists"],
  },
  email: {
    type: String,
    required: [true, "please provide an email"],
    unique: [true, "email already in use"],
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    unique: false,
  },
  refreshToken: String,
});

module.exports = mongoose.models.Users || mongoose.model("Users", UserSchema);
