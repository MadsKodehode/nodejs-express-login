const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = async (req, res, next) => {
  try {
    //Get token from authorization header
    const token = await req.headers.authorization.split(" ")[1];

    //Check if token matches origin
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    //Retrieve user details for logged in user
    const user = await decodedToken;

    //Pass user to end point
    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ err: new Error("Invalid request!") });
  }
};
