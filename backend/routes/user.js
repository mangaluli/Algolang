const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/:user_id/newPosts", userController.getUsersNewPosts);
router.get("/:user_id", userController.getUser);

module.exports = router;
