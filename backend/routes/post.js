const express = require('express');
const postController = require('../controllers/post');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Routes for public access
router.get('/', postController.getAllPosts);
router.get('/:post_id', postController.getPost);

// Autherization
router.use(authMiddleware.authorize);

router.post('/', postController.createPost);
router.patch('/:post_id', postController.updatePost);
router.delete('/:post_id', postController.deletePost);
router.patch('/:post_id/like', postController.likePost);
router.post('/:post_id/comment', postController.addComment);

module.exports = router;