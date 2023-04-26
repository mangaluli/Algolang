const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Autherization
router.use(authMiddleware.authorize);

// router.use(privilegeMiddleware.hasPrivilege(['owner']));

// router.get('/posts', adminController.getPosts);
// router.get('/comments', adminController.getComments);
// router.put('/comments/:comment_id/delete, adminController.deleteComment);

// router.use(privilegeMiddleware.hasPrivilege(['admin', 'owner']));
// router.get('/users', adminController.getUsers);

// router.use(privilegeMiddleware.hasPrivilege(['mod', 'admin', 'owner']));
// router.put('/users/:user_id/status, adminController.setUserStatus);
// router.put('/posts/:post_id/status, adminController.setPostStatus);
// router.put('/users/:user_id/delete, adminController.deleteUser);
// router.put('/posts/:post_id/delete, adminController.deletePost);

module.exports = router;