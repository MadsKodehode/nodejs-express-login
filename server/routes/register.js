const express = require("express");
//Import Express Router
const router = express.Router();
//Import register controller
const registerHandle = require("../controllers/registerController");
//Get route
router.get("/", (req, res) => {
  res.send(req.url);
});

//CREATE ROUTE\\
router.post("/", registerHandle);

//Export router
module.exports = router;
