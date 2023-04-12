const express = require('express');
const commentController = require('../controllers/comment');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Autherization
router.use(authMiddleware.authorize);

router.post('/:comment_id/like', commentController.likeComment);
router.post('/:comment_id/reply', commentController.addReply);
router.delete('/:comment_id', commentController.deleteComment);

module.exports = router;