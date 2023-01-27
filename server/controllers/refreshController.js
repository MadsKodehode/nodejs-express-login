const jwt = require("jsonwebtoken");
require("dotenv").config();
const handleRefresh = (req, res) => {
  //Get refresh token from httpOnly cookie
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  //Store refresh token
  const refreshToken = cookies.jwt;

  //Verify refresh token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) console.log(err);
  });
};

module.exports = handleRefresh;
