const User = require("../db/userModel");
const cookieOptions = require("../config/cookieConfig");
const handleLogout = (req, res) => {
  //Get request cookies from header
  const cookies = req.cookies;

  //IF no cookies with refresh token
  if (!cookies?.jwt) {
    return res.status(204);
  }

  //Store refreshtoken from cookies
  const refreshToken = cookies.jwt;

  console.log(refreshToken);
  //If NO refreshtoken
  if (!refreshToken) {
    //THEN clear refreshtoken cookie
    res.clearCookie("jwt", cookieOptions);
    return res.sendStatus(204);
  }

  res.clearCookie("jwt", cookieOptions);

  return res.json({ message: "Successfully logged out" });
};

module.exports = handleLogout;
