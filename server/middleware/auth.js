const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = async (req, res, next) => {
  try {
    //Get auth header
    const authHeader = req.headers.authorization || req.headers.Authorization;

    //IF auth header doesnt start with bearer
    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

    //Get token from authorization header
    const token = await authHeader.split(" ")[1];

    //Check if token matches origin
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        //If token expired
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ tokenExpired: true });
        } else if (err.name !== "TokenExpiredError") {
          //If some other error
          return res.sendStatus(403);
        }
      }
      //Pass verified user to req
      req.user = decoded.userEmail;
    });

    next();
  } catch (err) {
    res.status(500);
    console.log(err);
  }
};
