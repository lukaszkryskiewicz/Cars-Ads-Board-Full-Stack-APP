const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const authMiddleware = require('../utils/authMiddleware')

router.get('/auth/user', authMiddleware, userController.getCurrentUser);

module.exports = router;