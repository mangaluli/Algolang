const express = require("express");
const postController = require("../controllers/post");

const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/paginate", postController.getPaginated);
router.get("/:post_id", postController.getPost);
router.post("/", postController.addPost);
router.post("/comment", postController.addComment);
router.get("/:post_id/like", postController.likePost);
router.put("/update", postController.updatePost);
router.delete("/:post_id", postController.deletePost);
router.post("/:post_id/report", postController.reportPost);

module.exports = router;
