const express = require("express");
const router = express.Router();
const loginHandle = require("../controllers/loginController");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const { json } = require("express");
router.get("/", (req, res) => {
  if (!req.cookies.accToken) {
    return res.status(200).json({ message: "Please log in" });
  }
  //Get token from cookies
  const token = req.cookies.accToken;

  //Then verify token
  const userIsLoggedIn = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (userIsLoggedIn) {
    return res.json({
      message: `Already logged in with email: ${userIsLoggedIn.userEmail}`,
      shouldRedirect: true,
    });
  }
});

router.post("/", loginHandle);

module.exports = router;
