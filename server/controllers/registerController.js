//Import bcrypt
const bcrypt = require("bcrypt");
const User = require("../db/userModel");

//Register user middleware
const registerHandle = async (req, res) => {
  //IF all fields are not filled
  if (!req.body.username || !req.body.email || !req.body.password)
    //THEN return status 400 bad request and message
    return res
      .status(400)
      .json({ message: "Please enter all fields", success: false });

  //Find user with same username
  const foundUsername = await User.findOne({
    username: req.body.username,
  }).exec();

  //Find user with same email
  const foundEmail = await User.findOne({ email: req.body.email }).exec();

  //Check if username is found
  if (foundUsername)
    return res
      .status(409)
      .json({ message: "This username is in use", success: false });

  //Check if email is found
  if (foundEmail)
    return res
      .status(409)
      .json({ message: "Email is already in use", success: false });

  //Hash pwd before saving to database
  try {
    //AWAIT for encrypting the password 10 rounds of salt
    const hashedPwd = await bcrypt.hash(req.body.password, 10);

    //Create new instance of user
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPwd,
    });

    //Save user to db
    await user.save();

    //Set status 201 successfully created
    res
      .status(201)
      .json({ message: "Account created successfully", success: true });
  } catch (err) {
    //Catch err and set 500 generic
    res.status(500).json({ message: err.message });
  }
};

module.exports = registerHandle;
