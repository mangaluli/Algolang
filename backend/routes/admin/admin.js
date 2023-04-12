const express = require('express');
const commentController = require('../../controllers/comment');
const authMiddleware = require('../../middleware/auth');

const router = express.Router();

// Autherization
router.use(authMiddleware.authorize);

// router.get('/users', adminController.getUsers);
// router.get('/users/:user_id', adminController.getUserById)
// router.get('/posts', adminController.getPosts);
// router.get('/posts/:post_id', adminController.getPostById);
// router.put('/users/:user_id/status, adminController.setUserStatus);
// router.put('/posts/:post_id/status, adminController.setPostStatus);
// router.put('/users/:user_id/delete, adminController.deleteUser);
// router.put('/posts/:post_id/delete, adminController.deletePost);
// router.put('/comments/:comment_id/delete, adminController.deleteComment);

module.exports = router;