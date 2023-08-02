const express = require("express");
const reportController = require("../controllers/report");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/session", authController.session);

module.exports = router;
