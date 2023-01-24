const express = require("express");
const router = express.Router();
const loginHandle = require("../controllers/loginController");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
router.get("/", (req, res) => {
  if (!req.cookies.jwt) {
    return res.json({ message: "Sign in!" });
  }
  //Get token from cookies
  const token = req.cookies.jwt;

  //Then verify token
  const userIsLoggedIn = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (userIsLoggedIn) res.redirect("/dashboard");
});

router.post("/", loginHandle);

module.exports = router;
