const express = require("express");
const { getUser, reportUser, followUser } = require("../controllers/user");
const { authorize } = require("../middleware/auth");

const router = express.Router();

router.get("/:user_id", getUser);

router.use(authorize);

router.post("/:user_id/report", reportUser);
router.post("/:user_id/report", followUser);

module.exports = router;
