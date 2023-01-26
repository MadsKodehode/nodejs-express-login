const bcrypt = require("bcrypt");
const User = require("../db/userModel");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const loginHandle = async (req, res) => {
  try {
    //IF no email or password
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password", success: false });
    }

    //Track if remember me is checked
    console.log(req.body.checked);

    //Check if email already exist
    const foundUser = await User.findOne({ email: req.body.email });

    //IF email doesnt exist
    if (!foundUser) {
      //THEN 404 not found
      return res
        .status(401)
        .json({ message: "Wrong email or password", success: false });
    }

    //Compare password to encrypted password
    const passwordCheck = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );

    //Check if passwords match
    if (!passwordCheck) {
      return res
        .status(401)
        .json({ message: "Wrong email or password", success: false });
    }

    //Creating token for user
    const token = jwt.sign(
      {
        userId: foundUser._id,
        userEmail: foundUser.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    //Create refresh token
    const refreshToken = jwt.sign(
      {
        userId: foundUser._id,
        userEmail: foundUser.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    //Successful login
    res.status(200).json({
      message: "Login successful",
      email: foundUser.email,
      token,
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

module.exports = loginHandle;
