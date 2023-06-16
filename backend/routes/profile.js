const express = require("express");
const profileController = require("../controllers/profile");

const router = express.Router();

router.get("/", profileController.getProfile);

module.exports = router;
