const express = require("express");
const router = express.Router();

//Import logout controller
const handleLogout = require("../controllers/logoutController");

//Logout route
router.post("/", handleLogout);

module.exports = router;
