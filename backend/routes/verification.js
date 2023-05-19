const express = require("express");
const verificationControlloer = require("../controllers/verification");

const router = express.Router();

router.get("/", verificationControlloer.sendVerificationEmail);
router.post("/", verificationControlloer.verifyUser);

module.exports = router;
