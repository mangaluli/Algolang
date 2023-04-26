const express = require("express");
const postController = require("../controllers/post");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/:post_id", postController.getPost);

router.use(authMiddleware.authorize);

router.post("/", postController.createPost);
router.patch("/:post_id", postController.updatePost);
router.delete("/:post_id", postController.deletePost);

module.exports = router;
