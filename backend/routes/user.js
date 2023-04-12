const express = require('express');
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/:user_id', userController.getUser);

router.use(authMiddleware.authorize);

router.get('/', userController.getCurrentUser);
router.patch('/:user_id', userController.updateUser);
router.delete('/:user_id', userController.deleteUser);
router.post('/:user_id/report', userController.reportUser);

module.exports = router;