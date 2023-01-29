const User = require("../db/userModel");
const cookieOptions = require("../config/cookieConfig");
const handleLogout = async (req, res) => {
  //Get request cookies from header
  const cookies = req.cookies;
  console.log(cookies);
  //IF no cookies with refresh token

  //Store refreshtoken from cookies
  const refreshToken = cookies.jwt;
  const accessToken = cookies.accToken;

  //Find user to logout
  const foundUser = await User.findOne({ refreshToken }).exec();

  //If NO refreshtoken
  if (!foundUser) {
    //THEN clear refreshtoken cookie
    res.clearCookie("jwt", cookieOptions);
    return res.sendStatus(204);
  }

  //Remove refresh token from db
  foundUser.refreshToken = "";

  //Save user in db
  await foundUser.save();

  res.clearCookie("jwt", cookieOptions);
  return res.json({ message: "Logged out", shouldRedirect: true });
};

module.exports = handleLogout;
