const express = require("express");
const router = express.Router();
const auth = require("../auth");
router.get("/", auth, (req, res) => {
  res.json({ message: `Logged in with email: ${req.user}` });
});

module.exports = router;
