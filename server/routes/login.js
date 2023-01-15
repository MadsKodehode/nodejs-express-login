const express = require("express");
const router = express.Router();
const loginHandle = require("../controllers/loginController");

router.get("/", (req, res) => {
  console.log(req.url);
});

router.post("/", loginHandle);

module.exports = router;
