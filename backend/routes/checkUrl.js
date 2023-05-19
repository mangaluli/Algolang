const express = require("express");
const checkUrlContoroller = require("../controllers/checkUrl");

const router = express.Router();

router.post("/", checkUrlContoroller.checkUrl);

module.exports = router;
