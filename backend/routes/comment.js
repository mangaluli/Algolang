const express = require("express");
const commentController = require("../controllers/comment");

const router = express.Router();

router.post("/:comment_id/reply", commentController.addReply);
router.delete("/:comment_id", commentController.deleteComment);
router.get("/:comment_id/like", commentController.likeComment);
router.get("/:parent_type/:parent_id/:page", commentController.getComments);
router.patch("/:comment_id", commentController.updateComment);
module.exports = router;
