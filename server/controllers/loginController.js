const bcrypt = require("bcrypt");
const User = require("../db/userModel");
const jwt = require("jsonwebtoken");

const loginHandle = async (req, res) => {
  try {
    //IF no email or password
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Please enter both fields" });
    }
    //Check if email already exist
    const user = await User.findOne({ email: req.body.email });

    //IF email doesnt exist
    if (!user) {
      //THEN 404 not found
      return res.status(404).json({ message: "Email not found" });
    }

    //Compare password to encrypted password
    const passwordCheck = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //Check if passwords match
    if (!passwordCheck) {
      return res.status(400).json({ message: "Passwords not matching" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email,
      },
      "RANDOM-TOKEN",
      { expiresIn: "24h" }
    );

    res
      .status(200)
      .json({ message: "Login successful", email: user.email, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

module.exports = loginHandle;
