const express = require('express');
const userController = require('../controllers/user');
const { authorize } = require('../middleware/auth');
const { checkBanned } = require('../middleware/checkBanned');

const router = express.Router();

router.get('/:user_id', userController.getUser);

router.use(authorize);
router.use(checkBanned);

router.post('/:user_id/report', userController.reportUser);

module.exports = router;