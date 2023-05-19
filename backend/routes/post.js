const express = require("express");
const postController = require("../controllers/post");

const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/:post_id", postController.getPost);
router.post("/", postController.addPost);

module.exports = router;
