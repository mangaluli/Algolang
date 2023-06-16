const express = require("express");
const testUrlContoroller = require("../controllers/testUrl");

const router = express.Router();

router.head("/:slug", testUrlContoroller.testUrl);

module.exports = router;
