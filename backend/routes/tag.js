const express = require("express");
const tagController = require("../controllers/tag");

const router = express.Router();

router.get("/", tagController.getAllTags);
router.get("/:tag_id", tagController.getTag);
router.post("/", tagController.addTag);

module.exports = router;
