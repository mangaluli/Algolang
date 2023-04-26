const express = require("express");
const {
  getComment,
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware.authorize);

router.get("/:comment_id", getComment);
router.post("/", addComment);
router.patch("/:comment_id", updateComment);
router.delete("/:comment_id", deleteComment);

module.exports = router;
