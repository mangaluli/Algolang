const express = require("express");
const verificationControlloer = require("../controllers/verification");

const router = express.Router();

router.get("/", verificationControlloer.verifyUser);
router.post("/", verificationControlloer.sendVerificationEmail);

module.exports = router;
